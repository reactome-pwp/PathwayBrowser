import {Injectable} from '@angular/core';
import {environment} from "../../environments/environment";
import {HttpClient, HttpHeaders} from "@angular/common/http";
import {Event, OrthologousMap} from "../model/event.model";
import {
  BehaviorSubject,
  combineLatest,
  EMPTY,
  forkJoin,
  map,
  mergeMap,
  Observable,
  of,
  Subject,
  switchMap,
  tap
} from "rxjs";
import {JSOGDeserializer} from "../utils/JSOGDeserializer";
import {Species} from "../model/species.model";
import {DiagramStateService} from "./diagram-state.service";
import {NestedTreeControl} from "@angular/cdk/tree";


@Injectable({
  providedIn: 'root'
})
export class EventService {

  private readonly _TOP_LEVEL_PATHWAYS = `${environment.host}/ContentService/data/pathways/top/`;
  private readonly _ENHANCED_QUERY = `${environment.host}/ContentService/data/query/enhanced/`
  private readonly _DATA_QUERY = `${environment.host}/ContentService/data/query/`
  private readonly _ANCESTORS = `${environment.host}/ContentService/data/event/`

  treeData$: BehaviorSubject<Event[]> = new BehaviorSubject<Event[]>([]);

  private _selectedEvent: Subject<Event> = new Subject<Event>();
  public selectedEvent$ = this._selectedEvent.asObservable();

  private _selectedObj: Subject<Event> = new Subject<Event>();
  public selectedObj$ = this._selectedObj.asObservable();

  private _breadcrumbsSubject = new Subject<Event[]>();
  breadcrumbs$ = this._breadcrumbsSubject.asObservable();


  private _subpathwaysColors = new BehaviorSubject<Map<number, string>>(new Map<number, string>());
  subpathwaysColors$ = this._subpathwaysColors.asObservable();



  constructor(private http: HttpClient) {
  }

  setTreeData(events: Event[]) {
    this.treeData$.next(events);
  }

  setCurrentEvent(event: Event) {
    this._selectedEvent.next(event);
  }

  setCurrentObj(event: Event) {
    this._selectedObj.next(event);
  }

  setBreadcrumbs(events: Event[]) {
    this._breadcrumbsSubject.next(events);
  }

  setSubpathwaysColors(colorMap: Map<number, string>) {
    this._subpathwaysColors.next(colorMap);
  }


  fetchTlpBySpecies(taxId: string): Observable<Event[]> {
    let url = `${this._TOP_LEVEL_PATHWAYS}${taxId}`;
    return this.http.get<Event[]>(url);
  }


  fetchEventAncestors(stId: string): Observable<Event[][]> {
    let url = `${this._ANCESTORS}${stId}/ancestors`;
    return this.http.get<Event[][]>(url)
  }


  fetchEnhancedEventData(stId: string): Observable<Event> {
    let url = `${this._ENHANCED_QUERY}${stId}?includeRef=true`;
    return this.http.get<Event>(url).pipe(
      map((response: Event) => {
        const deserializer = new JSOGDeserializer();
        const resolvedResponse = deserializer.deserialize(response);
        return resolvedResponse as unknown as Event;
      })
    )
  }

  fetchEventData(stId: string): Observable<Event> {
    let url = `${this._DATA_QUERY}${stId}`;
    return this.http.get<Event>(url).pipe(
      map((response: Event) => {
        const deserializer = new JSOGDeserializer();
        const resolvedResponse = deserializer.deserialize(response);
        return resolvedResponse as unknown as Event;
      })
    )
  }

  fetchChildrenEvents(event: Event, treeNodes: Event[]) {
    return this.fetchEnhancedEventData(event.stId).pipe(
      switchMap(children => {
        if (children.hasEvent) {
          event.hasEvent = children.hasEvent.map(child => {
            child.ancestors = [...(event.ancestors || []), event];
            child.parent = event;
            return child;
          });
          this.setTreeData(treeNodes);
          return this.subpathwaysColors$.pipe(
            map(colors => colors || new Map<number, string>())
          );
        }
        return EMPTY;
      }),
      tap(colors => {
        this.setSubpathwayColors(event, colors);
      })
    );
  }


  adjustTreeFromDiagramSelection(event: Event, diagramId: string, selectedTreeEvent: Event, subpathwayColors: Map<number, string>, treeControl: NestedTreeControl<Event, string>, treeNodes: Event[]) {
    // Rebuild the tree if we couldn't find it in all visible tree nodes
    const allTreeNodes = this.getExpandedTreeWithChildrenNodes(treeControl, treeNodes);
    console.log('allTreeNodes', allTreeNodes);
    if (!allTreeNodes.map(e => e.stId).includes(event.stId)) {
      console.log("build tree with new event ", event.stId)
      this.buildTree(event, diagramId, treeControl, subpathwayColors);
    } else {
      // If find it in the tree, then set currentObj as this event
      console.log('fount but set obj and reselect to it', event)
      this.setCurrentObj(event);
      const siblingEvents = selectedTreeEvent.parent?.hasEvent;
      if (siblingEvents) {
        siblingEvents.forEach(siblingEvent => {
          // SiblingEvent's stId matches the target event's stId, select it, otherwise, deselect it
          siblingEvent.isSelected = siblingEvent.stId === event.stId;
        });
      }
    }
  }

  buildTree(event: Event, diagramId: string, treeControl: NestedTreeControl<Event, string>, subpathwayColors: Map<number, string>) {
    if (this.isEntity(event)) {
      this.handleEntitySelection(event, diagramId, treeControl, subpathwayColors);
    } else {
      this.handleEventSelection(event, diagramId, treeControl, subpathwayColors);
    }
  }

  private handleEntitySelection(event: Event, diagramId: string, treeControl: NestedTreeControl<Event, string>, subpathwayColors: Map<number, string>) {
    this.setCurrentObj(event);
    this.fetchEnhancedEventData(diagramId).pipe(
      switchMap(() => this.fetchEventAncestors(diagramId)),
      tap(ancestors => this.processAncestors(ancestors, treeControl)),
      switchMap(ancestors => this.buildTreeFromAncestors(ancestors, diagramId, event.stId, subpathwayColors))
    ).subscribe(([colors, tree]) => {
      this.setTreeData(tree);
      this.getExpandedTreeWithChildrenNodes(treeControl, this.treeData$.value);
    });
  }

  private handleEventSelection(event: Event, diagramId: string, treeControl: NestedTreeControl<Event, string>, subpathwayColors: Map<number, string>) {
    this.fetchEventAncestors(event.stId).pipe(
      tap(ancestors => this.processAncestors(ancestors, treeControl)),
      tap(() => {
        this.setCurrentObj(event);
      }),
      switchMap(ancestors => this.buildTreeFromAncestors(ancestors, diagramId, event.stId, subpathwayColors))
    ).subscribe(([colors, tree]) => {
      this.setTreeData(tree);
      this.getExpandedTreeWithChildrenNodes(treeControl, this.treeData$.value);
    });
  }


  private buildTreeFromAncestors(ancestors: Event[][], diagramId: string, selectedIdFromUrl: string, subpathwayColors: Map<number, string>) {
    return combineLatest([
      this.subpathwaysColors$,
      this.buildNestedTree(this.treeData$.value, ancestors, diagramId, selectedIdFromUrl, subpathwayColors)
    ]);
  }

  /**
   * This method is building a nested tree dynamically by giving the roots and ancestors,
   * the currentLevel will always be the TLPs at very beginning,and we find the matched event in ancestors,
   * build the hierarchy structure from parent to child. At the same time, it sends another API call to get children for each item in
   * ancestors.
   * @param roots  TLPs
   * @param ancestors A list of lists of Events, it only contains one list, so we take [0].
   *                  The ancestors is a list of events from child to parent in the API calls,
   *                  But here is from parent to child,no need to use reverse() with ancestors[0]
   * @param diagramId The diagramId which is used for adding subpathway colors
   * @param selectedIdFromUrl The selected event id
   * @param subpathwayColors colors maps, dbId as key, colors as value, `{69481 => "#cc0000"}`
   *
   */
  buildNestedTree(roots: Event[], ancestors: Event[][], diagramId: string, selectedIdFromUrl: string, subpathwayColors: Map<number, string>) {
    console.log('BuildNestedTree with data ', roots, 'and ancestors ');
    const tree = [...roots];
    const nestedTree = ancestors[0].reduce((acc, event, index, array) => {
      const isLast = index === array.length - 1;
      return acc.pipe(
        mergeMap(currentLevel => {
          const existingEvent = currentLevel.find(e => e.dbId === event.dbId);
          if (existingEvent) {
            return this.fetchEnhancedEventData(event.stId).pipe(
              map(children => {
                existingEvent.hasEvent = children.hasEvent?.map(child => {
                  child.ancestors = [...(existingEvent.ancestors || []), existingEvent];
                  child.parent = existingEvent;
                  this.setBreadcrumbs([...child.ancestors])
                  return child;
                });
                // Highlight selected event
                if (selectedIdFromUrl) {
                  existingEvent.hasEvent?.forEach(child => {
                    if (selectedIdFromUrl === child.stId) {
                      child.isSelected = true;
                      this.setBreadcrumbs([...(child!.ancestors), child]) //todo: when not loading from URL
                    }
                  })
                }
                // Highlight selected event's parent when loading from URL
                existingEvent.isSelected = true;

                if (existingEvent.stId === diagramId) {
                  this.setSubpathwayColors(existingEvent, subpathwayColors);
                }

                if (isLast) {
                  this.setCurrentEvent(existingEvent);
                }

                return existingEvent.hasEvent!;
              })
            );
          } else {
            return of([]);
          }
        })
      );
    }, of(tree))

    return forkJoin([nestedTree]).pipe(
      map(() => {
        return tree;
      })
    );
  }


  setSubpathwayColors(event: Event, colors: Map<number, string>) {
    if (colors && event.hasEvent) {
      event.hasEvent.forEach(e => {
        if (e.schemaClass === 'Pathway' && !e.hasDiagram) {
          e.color = colors.get(e.dbId);
        }
      });
    }
  }


  private processAncestors(ancestors: Event[][], treeControl: NestedTreeControl<Event, string>) {
    //this.ancestors = ancestors[0];
    this.expandAllAncestors(ancestors, treeControl);
  }

  expandAllAncestors(ancestors: Event[][], treeControl: NestedTreeControl<Event, string>) {
    ancestors[0].reverse().forEach(ancestor => treeControl.expand(ancestor))
  }

  // Flatten tree and return all visible tree nodes
  getAllVisibleTreeNodes(treeControl: NestedTreeControl<Event, string>, treeNodes: Event[]): Event[] {
    const visibleTreeNodes: Event[] = [];
    const addVisibleNodes = (node: Event) => {
      // Add the current node to the visible nodes
      visibleTreeNodes.push(node);
      // If the node is expanded, recursively check its children
      if (treeControl.isExpanded(node) && node.hasEvent) {
        node.hasEvent.forEach(child => addVisibleNodes(child));
      }
    };
    // Start from the root nodes
    treeNodes.forEach(rootNode => addVisibleNodes(rootNode));

    return visibleTreeNodes;
  }

  getExpandedTreeWithChildrenNodes(treeControl: NestedTreeControl<Event, string>, treeNodes: Event[]) {
    const expandedTreeNodes: Event[] = [];
    const tlpstId = treeControl.expansionModel.selected[0];
    const addVisibleNodes = (node: Event) => {
      expandedTreeNodes.push(node);
      if (treeControl.isExpanded(node) && node.hasEvent) {
        node.hasEvent.forEach(child => addVisibleNodes(child));
      }
    };
    const rootTree = treeNodes.find(node => node.stId === tlpstId);
    if (rootTree) {
      addVisibleNodes(rootTree);
    }
    return expandedTreeNodes;
  }

  private flattenTree(data: Event[]): Event[] {
    const flatTreeData: Event[] = [];
    const flatten = (nodes: Event[]) => {
      nodes.forEach(node => {
        flatTreeData.push(node);
        if (node.hasEvent) {
          flatten(node.hasEvent);
        }
      });
    };
    flatten(data);
    return flatTreeData;
  }

  findEvent(stId: string, events: Event[]): Event | undefined {
    const flatData = this.flattenTree(events);
    return flatData.find(node => node.stId === stId);
  }

  hasChild = (_: number, event: Event) => !!event.hasEvent && event.hasEvent.length > 0 || ['TopLevelPathway', 'Pathway', 'CellLineagePath'].includes(event.schemaClass);

  //todo : rename it
  eventHasChild(event: Event): boolean {
    return this.hasChild(0, event);
  }


  isEntity(event: Event) {
    return (!this.eventHasChild(event) && !this.isReaction(event));
  }

  isReaction(event: Event) {
    return (['Reaction', 'BlackBoxEvent', 'CellDevelopmentStep'].includes(event.schemaClass));
  }

  getOrthologousMap(identifiers: number[], speciesDbId: number): Observable<OrthologousMap> {
    const url = `${this._ORTHOLOGIES}${speciesDbId}`;
    return this.http.post<OrthologousMap>(url, identifiers, {headers: new HttpHeaders({'Content-Type': 'text/plain'})});
  }


  private hasValidAncestors(ancestors: Event[]): boolean {
    return !!(ancestors && ancestors.length);
  }

  getOrthologyEventStId(taxId: string, id: string, selectedIdFromUrl: string, diagramId: string, ancestors: Event[], allSpecies: Species[]): Observable<string> {
    if (!this.hasValidAncestors(ancestors)) {
      return of(id);
    }

    const ancestorIds = ancestors.map(a => a.dbId);
    const speciesDbId = allSpecies.find(s => s.taxId === taxId)?.dbId;

    if (!speciesDbId || !ancestorIds.length) {
      return of(id);
    }

    return this.getOrthologousMap(ancestorIds, speciesDbId).pipe(
      tap(response => {
        this.orthologousMap = response;
        if (this.orthologousMap[id]) {
          console.log("Found orthologous map");
          console.log(this.orthologousMap[selectedIdFromUrl]);
          id = selectedIdFromUrl;
          this.state.set('select', selectedIdFromUrl);
        } else {
          console.log("Not found in orthologous map");
          console.log('this.diagramId', diagramId);
          id = diagramId;
          this.state.set('select', '');
        }
      }),
      map(() => id)
    );
  }



  // todo: add comments here to explain why
  // fetchData(stId: string): Observable<Event> {
  //   const data = this.http.get<Event>(this._DATA_QUERY + stId);
  //   const enhancedData = this.http.get<Event>(this._ENHANCED_QUERY + stId);
  //   return forkJoin({
  //     data: data,
  //     enhancedData: enhancedData
  //   }).pipe(
  //       map((results) => {
  //         const result = results.data;
  //         const enhancedResult = results.enhancedData;
  //         const mergedEvent = {...result};
  //         for (const key in enhancedResult) {
  //           if (enhancedData.hasOwnProperty(key) && !data.hasOwnProperty(key)) {
  //             mergedEvent[key] = enhancedResult[key];
  //           }
  //         }
  //         return mergedEvent;
  //       })
  //     )
  // }


  getEventsHierarchy(taxId: string): Observable<Event[]> {
    let url = `${environment.host}/ContentService/data/eventsHierarchy/` + taxId + `?pathwaysOnly=false&resource=TOTAL&interactors=false`;
    return this.http.get<Event[]>(url)
  }


}
