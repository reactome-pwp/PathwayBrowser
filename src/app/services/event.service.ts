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

  setCurrentEventAndObj(event: Event, obj: Event) {
    this.setCurrentEvent(event);
    this.setCurrentObj(obj);
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

  /** Adjust tree structure based on selection from diagram
   *
   *  Entity
   *  - No need to rebuild the tree, but requires to update the currentTreeEvent(diagram tree event) and currentObj (entity), selection and expandedTree status
   *
   *  Reaction
   *  - No need to rebuild the tree it is viable, if not we have to rebuild the tree to include it, update currentTreeEvent(Reaction) and currentObj (Reaction). selection and expandedTree status
   *
   *  Pathway
   *  - Subpathway, no need to build the tree, update currentTreeEvent(subpathway) and currentObj(subpathway)
   *  - Interacting pathway, rebuild the tree, clear previous selection, update currentTreeEvent(interacting pathway) and currentObj(interacting pathway), selection and expandedTree status
   *
   */
  adjustTreeFromDiagramSelection(event: Event, diagramId: string, selectedTreeEvent: Event, subpathwayColors: Map<number, string>, treeControl: NestedTreeControl<Event, string>, treeNodes: Event[]) {
    // All visible tree nodes
    const allVisibleTreeNodes = this.getAllVisibleTreeNodes(treeControl, treeNodes);
    if (this.isEntity(event)) {
      console.log('entity')
      this.handleEntitySelection(event, diagramId, allVisibleTreeNodes, treeControl);
    } else if (this.isReaction(event)) {
      console.log('reaction')
      this.handleReactionSelection(event, diagramId, allVisibleTreeNodes, treeControl, subpathwayColors);
    } else if (this.isPathwayWithDiagram(event)) {
      console.log('pathway')
      // treeControl.collapseAll(); //todo: should we collapse all?
      //this.handlePathwaySelection(event, diagramId, allVisibleTreeNodes, treeControl, subpathwayColors, treeNodes)
      // Interacting pathway, not visible in the tree view
      // if (!allVisibleTreeNodes.map(e => e.stId).includes(event.stId)) {
      //   this.setCurrentEventAndObj(event, event);
      //   this.clearAllSelectedEvents(treeNodes);
      //   this.buildTreeWithSelectedEvent(event, diagramId, treeControl, subpathwayColors);
      // } else {
      //   // Subpathway, already in the tree view
      //   this.setCurrentEventAndObj(event, event);
      //   this.handleExistingEventSelection(event, treeControl, allVisibleTreeNodes);
      // }
      this.handlePathwaySelection(event, diagramId, allVisibleTreeNodes, treeControl, subpathwayColors, allVisibleTreeNodes);
    }
  }

  private handleEntitySelection(event: Event, diagramId: string, allVisibleTreeNodes: Event[], treeControl: NestedTreeControl<Event, string>) {
    const diagramTreeEvent = allVisibleTreeNodes.find(node => node.stId === diagramId);
    if (diagramTreeEvent) {
      this.setCurrentEventAndObj(diagramTreeEvent, event);
      this.handleExistingEventSelection(diagramTreeEvent, treeControl, allVisibleTreeNodes);
      treeControl.collapseDescendants(diagramTreeEvent);
    }
  }

  private handleReactionSelection(event: Event, diagramId: string, allVisibleTreeNodes: Event[], treeControl: NestedTreeControl<Event, string>, subpathwayColors: Map<number, string>) {
    this.setCurrentEventAndObj(event, event);
    if (!this.isEventVisible(event, allVisibleTreeNodes)) {
      this.buildTreeWithSelectedEvent(event, diagramId, treeControl, subpathwayColors);
    } else {
      this.handleExistingEventSelection(event, treeControl, allVisibleTreeNodes);
    }
  }

  private handlePathwaySelection(event: Event, diagramId: string, allVisibleTreeNodes: Event[], treeControl: NestedTreeControl<Event, string>, subpathwayColors: Map<number, string>, treeNodes: Event[]) {
    // Interacting pathway, not visible in the tree view
    if (!this.isEventVisible(event, allVisibleTreeNodes)) {
      console.log('interacting pathway, ', event)
      this.setCurrentEventAndObj(event, event);
      this.clearAllSelectedEvents(treeNodes);
      this.buildTreeWithSelectedEvent(event, diagramId, treeControl, subpathwayColors);
    } else {
      // Subpathway, already in the tree view
      this.setCurrentEventAndObj(event, event);
      this.handleExistingEventSelection(event, treeControl, allVisibleTreeNodes);
    }
  }

  private isEventVisible(event: Event, allVisibleTreeNodes: Event[]): boolean {
    return allVisibleTreeNodes.map(e => e.stId).includes(event.stId);
  }

  private isPathwayWithDiagram(event: Event): boolean {
    return this.eventHasChild(event) && event.hasDiagram;
  }

  clearAllSelectedEvents(events: Event[]) {
    events.forEach(event => {
      event.isSelected = false;
      if (event.hasEvent) {
        this.clearAllSelectedEvents(event.hasEvent);
      }
    });
  }

  buildTree(event: Event, diagramId: string, treeControl: NestedTreeControl<Event, string>, subpathwayColors: Map<number, string>) {
    if (this.isEntity(event)) {
      this.buildTreeWithSelectedEntity(event, diagramId, treeControl, subpathwayColors);
    } else {
      this.buildTreeWithSelectedEvent(event, diagramId, treeControl, subpathwayColors);
    }
  }

  // Build tree with diagram event ancestors
  private buildTreeWithSelectedEntity(event: Event, diagramId: string, treeControl: NestedTreeControl<Event, string>, subpathwayColors: Map<number, string>) {
    this.setCurrentObj(event);
    this.fetchEnhancedEventData(diagramId).pipe(
      switchMap(() => this.fetchEventAncestors(diagramId)),
      tap(ancestors => this.processAncestors(ancestors, treeControl)),
      switchMap(ancestors => this.buildTreeFromAncestors(ancestors, diagramId, event.stId, subpathwayColors))
    ).subscribe(([colors, tree]) => {
      this.setTreeData(tree);
    });
  }

  // Build tree with event ancestors
  private buildTreeWithSelectedEvent(event: Event, diagramId: string, treeControl: NestedTreeControl<Event, string>, subpathwayColors: Map<number, string>) {
    // When selected event is a subpathway or interacting pathway
    const idToBuild = this.isPathwayWithDiagram(event) ? diagramId : event.stId;
    this.setCurrentObj(event);
    this.fetchEventAncestors(idToBuild).pipe(
      tap(ancestors => this.processAncestors(ancestors, treeControl)),
      switchMap(ancestors => this.buildTreeFromAncestors(ancestors, diagramId, event.stId, subpathwayColors))
    ).subscribe(([colors, tree]) => {
      this.setTreeData(tree);
    });
  }

  private handleExistingEventSelection(event: Event, treeControl: NestedTreeControl<Event, string>, flatTreeNodes: Event[]) {
    this.fetchEventAncestors(event.stId).pipe(
      tap(ancestors => this.processAncestors(ancestors, treeControl)),
    ).subscribe(([ancestors]) => {
      // Create a Set to store the stIds from ancestors for quick lookup
      const ancestorStIds = new Set(ancestors.map(ancestor => ancestor.stId));
      // Loop through the treeNodes and check if the stId exists in the Set
      flatTreeNodes.forEach(treeNode => {
        treeNode.isSelected = ancestorStIds.has(treeNode.stId);
      });
      this.setTreeData(this.treeData$.value);
      this.setBreadcrumbs(ancestors);
    });
  }

  private collapseSiblingEvent(event: Event, treeControl: NestedTreeControl<Event, string>) {
    if (event.ancestors) {
      // Get 1st parent
      let eventParent = event.parent;
      // Loop through the parent's children to collapse any expanded siblings
      eventParent.hasEvent?.forEach(childEvent => {
        if (childEvent !== event && treeControl.isExpanded(childEvent)) {
          treeControl.collapse(childEvent);
          treeControl.collapseDescendants(childEvent);
          childEvent.isSelected = false;
        }
      })
    }
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
                      this.setBreadcrumbs([...(child!.ancestors), child]);
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

  // A collection of all expanded tree node and its children
  getExpandedTreeWithChildrenNodes(treeControl: NestedTreeControl<Event, string>, treeNodes: Event[]) {
    const expandedTreeNodes: Event[] = [];
    const tlpStId = treeControl.expansionModel.selected[0];
    const addVisibleNodes = (node: Event) => {
      expandedTreeNodes.push(node);
      if (treeControl.isExpanded(node) && node.hasEvent) {
        node.hasEvent.forEach(child => addVisibleNodes(child));
      }
    };
    const rootTree = treeNodes.find(node => node.stId === tlpStId);
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
