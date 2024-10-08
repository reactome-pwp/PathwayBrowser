import {Injectable} from '@angular/core';
import {environment} from "../../environments/environment";
import {HttpClient} from "@angular/common/http";
import {Event} from "../model/event.model";
import {BehaviorSubject, combineLatest, forkJoin, map, mergeMap, Observable, of, Subject, switchMap} from "rxjs";
import {JSOGDeserializer} from "../utils/JSOGDeserializer";
import {DiagramStateService} from "./diagram-state.service";
import {NestedTreeControl} from "@angular/cdk/tree";


@Injectable({
  providedIn: 'root'
})
export class EventService {

  private readonly _TOP_LEVEL_PATHWAYS = `${environment.host}/ContentService/data/pathways/top/`;
  private readonly _ENHANCED_QUERY = `${environment.host}/ContentService/data/query/enhanced/`;
  private readonly _DATA_QUERY = `${environment.host}/ContentService/data/query/`;
  private readonly _ANCESTORS = `${environment.host}/ContentService/data/event/`;

  treeData$: BehaviorSubject<Event[]> = new BehaviorSubject<Event[]>([]);

  private _selectedTreeEvent: Subject<Event> = new Subject<Event>();
  public selectedTreeEvent$ = this._selectedTreeEvent.asObservable();

  private _selectedObj: Subject<Event> = new Subject<Event>();
  public selectedObj$ = this._selectedObj.asObservable();

  private _breadcrumbsSubject = new Subject<Event[]>();
  breadcrumbs$ = this._breadcrumbsSubject.asObservable();


  private _subpathwaysColors = new BehaviorSubject<Map<number, string>>(new Map<number, string>());
  subpathwaysColors$ = this._subpathwaysColors.asObservable();

  private _loadTreeEvent = new Subject<Event>();
  loadTreeEvent$ = this._loadTreeEvent.asObservable();

  constructor(private http: HttpClient, private state: DiagramStateService) {
  }

  setTreeData(events: Event[]) {
    this.treeData$.next(events);
  }

  setCurrentTreeEvent(event: Event) {
    this._selectedTreeEvent.next(event);
  }

  setCurrentObj(event: Event) {
    this._selectedObj.next(event);
  }

  setCurrentEventAndObj(event: Event, obj: Event) {
    this.setCurrentTreeEvent(event);
    this.setCurrentObj(obj);
  }

  setBreadcrumbs(events: Event[]) {
    this._breadcrumbsSubject.next(events);
  }

  setSubpathwaysColors(colorMap: Map<number, string>) {
    this._subpathwaysColors.next(colorMap);
  }

  loadTreeEvent(event: Event) {
    this._loadTreeEvent.next(event);
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

  fetchChildrenEvents(event: Event): Observable<[Event, Event, Map<number, string>]> {
    return this.fetchEnhancedEventData(event.stId).pipe(
      switchMap(result => {
        if (result.hasEvent) {
          event.hasEvent = result.hasEvent.map(child => {
            child.ancestors = [...(event.ancestors || []), event];
            child.parent = event;
            return child;
          });
          return this.subpathwaysColors$.pipe(
            map(colors => [event, result, colors || new Map<number, string>()] as [Event, Event, Map<number, string>])
          );
        } else {
          return of([event, result, new Map<number, string>()] as [Event, Event, Map<number, string>]);
        }
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
  adjustTreeFromDiagramSelection(enhancedEvent: Event, diagramId: string, subpathwayColors: Map<number, string>, treeControl: NestedTreeControl<Event, string>, treeNodes: Event[]): Observable<Event[]> {
    // All visible tree nodes
    const allVisibleTreeNodes = this.getAllVisibleTreeNodes(treeControl, treeNodes);
    if (this.isEntity(enhancedEvent)) {
      return this.handleEntitySelectionFromDiagram(enhancedEvent, diagramId, allVisibleTreeNodes, treeControl);
    } else if (this.isReaction(enhancedEvent)) {
      return this.handleReactionSelectionFromDiagram(enhancedEvent, diagramId, allVisibleTreeNodes, treeControl, subpathwayColors);
    } else if (this.isPathwayWithDiagram(enhancedEvent)) {
      // treeControl.collapseAll(); //todo: should we collapse all?
      return this.handlePathwaySelectionFromDiagram(enhancedEvent, diagramId, allVisibleTreeNodes, treeControl, subpathwayColors, allVisibleTreeNodes);
    } else {
      return of(this.treeData$.value)
    }
  }


  private handleEntitySelectionFromDiagram(event: Event, diagramId: string, allVisibleTreeNodes: Event[], treeControl: NestedTreeControl<Event, string>): Observable<Event[]> {
    const diagramTreeEvent = allVisibleTreeNodes.find(node => node.stId === diagramId);
    if (diagramTreeEvent) {
      return this.handleExistingEventSelection(diagramTreeEvent, treeControl, allVisibleTreeNodes).pipe(
        map(([treeData, treeEvent]) => {
          this.setCurrentEventAndObj(diagramTreeEvent, event);
          return treeData;
        })
      );
    } else {
      return of(this.treeData$.value);
    }
  }

  private handleReactionSelectionFromDiagram(event: Event, diagramId: string, allVisibleTreeNodes: Event[], treeControl: NestedTreeControl<Event, string>, subpathwayColors: Map<number, string>): Observable<Event[]> {
    if (!this.isEventVisible(event, allVisibleTreeNodes)) {
      return this.buildTreeWithSelectedEvent(event, diagramId, true, treeControl, subpathwayColors).pipe(
        map((treeData) => {
          this.setCurrentEventAndObj(event, event);
          return treeData;
        })
      );
    } else {
      return this.handleExistingEventSelection(event, treeControl, allVisibleTreeNodes).pipe(
        map(([treeData, event]) => {
          this.setCurrentEventAndObj(event, event);  //todo: this.setCurrentEventAndObj(treeEvent, event)?
          return treeData;
        })
      );
    }
  }


  // Subpathway and interacting pathway
  private handlePathwaySelectionFromDiagram(event: Event, diagramId: string, allVisibleTreeNodes: Event[], treeControl: NestedTreeControl<Event, string>, subpathwayColors: Map<number, string>, treeNodes: Event[]): Observable<Event[]> {
    // Interacting pathway, not visible in the tree view
    if (!this.isEventVisible(event, allVisibleTreeNodes)) {
      this.clearAllSelectedEvents(treeNodes);
      return this.buildTreeWithSelectedEvent(event, diagramId, true, treeControl, subpathwayColors).pipe(
        map(treeData => {
          return treeData;
        })
      );
    } else {
      // Subpathway, already in the tree view
      return this.handleExistingEventSelection(event, treeControl, allVisibleTreeNodes).pipe(
        map(([treeData, event]) => {
          this.setCurrentEventAndObj(event, event); //todo: this.setCurrentEventAndObj(treeEvent, event)?
          return treeData;
        })
      );
    }
  }

  private isEventVisible(event: Event, allVisibleTreeNodes: Event[]): boolean {
    return allVisibleTreeNodes.map(e => e.stId).includes(event.stId);
  }

  isPathwayWithDiagram(event: Event): boolean {
    return this.eventHasChild(event) && event.hasDiagram && event.schemaClass === 'Pathway';
  }

  clearAllSelectedEvents(events: Event[]) {
    events.forEach(event => {
      event.isSelected = false;
      if (event.hasEvent) {
        this.clearAllSelectedEvents(event.hasEvent);
      }
    });
  }

  buildTree(event: Event, diagramId: string, treeControl: NestedTreeControl<Event, string>, subpathwayColors: Map<number, string>): Observable<Event[]> {
    if (this.isEntity(event)) {
      return this.buildTreeWithSelectedEntity(event, diagramId, treeControl, subpathwayColors);
    } else {
      return this.buildTreeWithSelectedEvent(event, diagramId, false, treeControl, subpathwayColors);
    }
  }

  // Build tree with diagram event ancestors
  private buildTreeWithSelectedEntity(event: Event, diagramId: string, treeControl: NestedTreeControl<Event, string>, subpathwayColors: Map<number, string>): Observable<Event[]> {
    this.setCurrentObj(event);
    return  this.fetchEnhancedEventData(diagramId).pipe(
      switchMap(() => this.fetchEventAncestors(diagramId)),
      map(ancestors => this.getAndExpandAncestors(ancestors, treeControl)),
      switchMap(ancestors => this.buildTreeWithAncestors(ancestors, diagramId, event.stId, subpathwayColors)),
      map(([colors, tree]) => {
        this.setTreeData(tree);
        return tree
      })
    )
  }


  /**?
   * Build tree with event ancestors
   * @param event
   * @param diagramId
   * @param isFromDiagram  Behaves differently based on the calling method, avoid the check for isPathwayWithDiagram(event) when calling it from handlePathwaySelectionFromDiagram,
   *                       we want to open the ancestors in the tree view when select an interacting pathway in diagram, but not when first load for an interacting pathway from URL.
   */
  private buildTreeWithSelectedEvent(event: Event, diagramId: string, isFromDiagram: boolean, treeControl: NestedTreeControl<Event, string>, subpathwayColors: Map<number, string>): Observable<Event[]> {
    // When selected event is a subpathway or interacting pathway
    const idToBuild = isFromDiagram ? event.stId : (this.isPathwayWithDiagram(event) ? diagramId : event.stId);
    this.setCurrentObj(event);
    return this.fetchEventAncestors(idToBuild).pipe(
      map(ancestors => this.getAndExpandAncestors(ancestors, treeControl)),
      switchMap(ancestors => this.buildTreeWithAncestors(ancestors, diagramId, event.stId, subpathwayColors)),
      map(([colors, tree]) => {
        this.setTreeData(tree);
        return tree
      })
    );
  }

  // Select any reaction, subpathway and interacting pathway from diagram
  private handleExistingEventSelection(event: Event, treeControl: NestedTreeControl<Event, string>, flatTreeNodes: Event[]): Observable<[Event[], Event]> {
    return this.fetchEventAncestors(event.stId).pipe(
      map(ancestors => {
        console.log('ancestors in handleExisting Event selection', ancestors);
        const finalAncestor = this.getAndExpandAncestors(ancestors, treeControl);
        // Create a Set to store the stIds from ancestors for quick lookup
        const ancestorStIds = new Set(finalAncestor.map(ancestor => ancestor.stId));
        console.log('ancestorStIds ', ancestorStIds);
        // Loop through the treeNodes and check if the stId exists in the Set
        flatTreeNodes.forEach(treeNode => {
          treeNode.isSelected = ancestorStIds.has(treeNode.stId);
        });
        event.ancestors = finalAncestor;
        event.parent = finalAncestor[finalAncestor.length - 2];
        this.setTreeData(this.treeData$.value);
        this.setBreadcrumbs(finalAncestor);

        return [this.treeData$.value, event];
      })
    )
  }

  private buildTreeWithAncestors(ancestors: Event[], diagramId: string, selectedIdFromUrl: string, subpathwayColors: Map<number, string>) {
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
  buildNestedTree(roots: Event[], ancestors: Event[], diagramId: string, selectedIdFromUrl: string, subpathwayColors: Map<number, string>) {
    console.log('BuildNestedTree with data ', roots, 'and ancestors ', ancestors);
    const tree = [...roots];
    const nestedTree = ancestors.reduce((acc, event, index, array) => {
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
                  this.setCurrentTreeEvent(existingEvent);
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


  setSubpathwayColors(event: Event, colors: Map<number, string> | null) {
    if (colors && event.hasEvent) {
      event.hasEvent.forEach(e => {
        if (e.schemaClass === 'Pathway' && !e.hasDiagram) {
          e.color = colors.get(e.dbId);
        }
      });
    }
  }

  getAndExpandAncestors(ancestors: Event[][], treeControl: NestedTreeControl<Event, string>) {
    const pathIds = this.state.get('path');
    let finalAncestor: Event[];
    // When path is given through URL, this link is from Location in PWB on detail page
    if (pathIds && ancestors.length > 1) {
      finalAncestor = this.findMatchingAncestor(ancestors, pathIds)
      if (finalAncestor) {
        this.expandAllAncestors(finalAncestor, treeControl);
      }
    } else {
      // take the first ancestor if no path is given
      finalAncestor = ancestors[0];
      this.expandAllAncestors(ancestors[0], treeControl);
    }
    return finalAncestor;
  }


  findMatchingAncestor(ancestors: Event[][], pathIds: string[]): Event[] {
    for (const ancestorArray of ancestors) {
      const allIdsFromAncestor = ancestorArray.map(event => event.stId);
      // Check if pathIds are in the current ancestor array
      const containsAll = pathIds.every(id => allIdsFromAncestor.includes(id));
      if (containsAll) {
        return ancestorArray;
      }
    }
    // Use first ancestor if returns null
    return ancestors[0];
  }


  expandAllAncestors(ancestors: Event[], treeControl: NestedTreeControl<Event, string>) {
    ancestors.reverse().forEach(ancestor => treeControl.expand(ancestor));
  }


  getPathIds(diagramId: string, ancestors: Event[]) {
    const stIds: string[] = [];
    for (const a of ancestors) {
      if (a.stId === diagramId) {
        break; // Stop before adding the target event to the result
      }
      stIds.push(a.stId);
    }
    return stIds;
  }

  setPath(diagramId: string, ancestors: Event[]) {
    const ids = this.getPathIds(diagramId, ancestors);
    this.state.set('path', ids);
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

  getPathwayWithDiagram(event: Event): Event | undefined {
    const parents = [...event.ancestors].reverse();
    return parents.find(p => p.hasDiagram);
  }


}
