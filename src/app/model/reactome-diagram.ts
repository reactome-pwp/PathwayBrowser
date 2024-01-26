import cytoscape from "cytoscape";
import { Graph, Node as GraphNode } from "../model/graph.model";

export class ReactomeDiagram {
  public idToGraphNode: Map<number, GraphNode>;

  constructor(public elements: cytoscape.ElementsDefinition, public graph: Graph) {
    this.idToGraphNode = this.getIdToGraphNode(graph);
  }

  private getIdToGraphNode(graph: Graph) {
    const idToGraphNode = new Map<number, GraphNode>(
      graph.nodes.flatMap(node => (node.diagramIds?.map(id => [id, node]) || []))
    );

    const dbIdToGraphNode = new Map<number, GraphNode>(
      graph.nodes.map(node => [node.dbId, node])
    );

    const idToGraphNodeFromParent = new Map<number, GraphNode>();




    graph.nodes.forEach(node => {
      if (node.parents) {
        node.parents.forEach(parentId => {
          const parentGraphNode = dbIdToGraphNode.get(parentId);

          if (parentGraphNode && parentGraphNode.diagramIds) {
            parentGraphNode.diagramIds.forEach(diagramId => {
              idToGraphNodeFromParent.set(parentId, node);
            });
          }
        });
      }
    });

    // Merge the two maps into a new map
    return new Map([...idToGraphNode, ...idToGraphNodeFromParent]);
  }
}
