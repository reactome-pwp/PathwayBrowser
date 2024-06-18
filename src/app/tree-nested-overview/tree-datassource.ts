import {NestedTreeControl} from "@angular/cdk/tree";
import {MatTreeNestedDataSource} from "@angular/material/tree";
import {EventObject} from "../model/event.model";
import {BehaviorSubject} from "rxjs";


export class TreeDataSource extends MatTreeNestedDataSource<EventObject> {

  dataChange = new BehaviorSubject<EventObject[]>([]);

  constructor(private treeControl: NestedTreeControl<EventObject>, initialData: EventObject[]) {
    super();
    this.dataChange.next(initialData);
  }

  override get data(): EventObject[] {
    return this.dataChange.value;
  }

  override set data(value: EventObject[]) {
    this.treeControl.dataNodes = value;
    this.dataChange.next(value);
  }

  /** Add node as child of parent */
  public add(node: EventObject[], parent: EventObject) {
    // add dummy root so we only have to deal with `FoodNode`s
    const newTreeData = {stId: 'Dummy', displayName: "Dummy Root", hasEvent: this.data, schemaClass: 'Dummy root'};
    this._add(node, parent, newTreeData);
    this.data = newTreeData.hasEvent;
  }

  /*
   * For immutable update patterns, have a look at:
   * https://redux.js.org/recipes/structuring-reducers/immutable-update-patterns/
   */

  // @ts-ignore
  protected _add(newNodes: EventObject[], parent: EventObject, tree: EventObject) {
    if (tree === parent) {
      console.log('tree is ', tree.displayName, 'parent is ', parent.displayName)
      console.log(
        `replacing hasEvent array of '${parent.displayName}', adding ${newNodes.map(n => n.displayName).join(', ')}`
      );
      // @ts-ignore
      tree.hasEvent = newNodes;
      this.treeControl.expand(tree);
      console.log("tree.hasEvent ", tree.hasEvent)
      return true;
    }
    if (!tree.hasEvent) {
      console.log(`reached leaf node '${tree.displayName}', backing out`);
      return false;
    }
    return this.update(tree, this._add.bind(this, newNodes, parent));
  }

  protected update(tree: EventObject, predicate: (n: EventObject) => boolean) {
    let updatedTree: EventObject, updatedIndex: number;

    tree.hasEvent!.find((node, i) => {
      if (predicate(node)) {
        console.log(`creating new node for '${node.displayName}'`);
        updatedTree = {...node};
        updatedIndex = i;
        this.moveExpansionState(node, updatedTree);
        return true;
      }
      return false;
    });

    if (updatedTree!) {
      console.log(`replacing node '${tree.hasEvent![updatedIndex!].displayName}'`);
      tree.hasEvent![updatedIndex!] = updatedTree!;
      return true;
    }
    return false;
  }

  moveExpansionState(from: EventObject, to: EventObject) {
    if (this.treeControl.isExpanded(from)) {
      console.log(`'${from.displayName}' was expanded, setting expanded on new node`);
      this.treeControl.collapse(from);
      this.treeControl.expand(to);
    }
  }
}
