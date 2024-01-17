import {Injectable} from '@angular/core';
import {forkJoin, map, Observable, of, tap} from "rxjs";
import {HttpClient, HttpHeaders} from "@angular/common/http";
import {Diagram, Edge, Node, NodeConnector, Position} from "../model/diagram.model";
import {Graph, Node as GraphNode} from "../model/graph.model";
import {Interaction} from "../model/interaction.moel";
import Reactome from "reactome-cytoscape-style";
import cytoscape from "cytoscape";
import legend from "../../assets/json/legend.json"
import {array} from "vectorious";

import {addRoundness} from "./roundness";
import NodeDefinition = Reactome.Types.NodeDefinition;
import ReactionDefinition = Reactome.Types.ReactionDefinition;
import EdgeTypeDefinition = Reactome.Types.EdgeTypeDefinition;


type RelativePosition = { distances: number[], weights: number[] };

const posToStr = (edge: Edge, pos: Position) => `${edge.id}-${pos.x},${pos.y}`

const scale = <T extends Position | number>(pos: T, scale = 2): T => {
  if (typeof pos === 'number') return pos * scale as T
  return {
    x: pos.x * scale,
    y: pos.y * scale
  } as T
}

const avg = (positions: Position[]): Position => {
  const sum = {x: 0, y: 0};
  positions.forEach(pos => {
    sum.x += pos.x;
    sum.y += pos.y;
  });
  sum.x /= positions.length;
  sum.y /= positions.length;
  return sum;
}
const squaredDist = (pos1: Position, pos2: Position) => {
  return Math.pow(pos2.x - pos1.x, 2) + Math.pow(pos2.y - pos1.y, 2)
}

const closestToAverage = (positions: Position[]): Position => {
  const average = avg(positions);
  let closest = positions[0];
  let min = squaredDist(closest, average);
  for (let i = 1; i < positions.length; i++) {
    const pos = positions[i];
    const dist = squaredDist(pos, average);
    if (dist < min) {
      min = dist;
      closest = pos
    }
  }
  return closest;
}

@Injectable({
  providedIn: 'root'
})
export class DiagramService {

  extraLine: Map<string, Position> = new Map<string, Position>();
  reverseExtraLine: Map<string, Position> = new Map<string, Position>();

  constructor(private http: HttpClient) {
  }


  nodeTypeMap = new Map<string, NodeDefinition>([
      ['Gene', ['Gene', 'PhysicalEntity']],
      ['RNA', ['RNA', 'PhysicalEntity']],
      ['Protein', ['Protein', 'PhysicalEntity']],
      ['Entity', ['GenomeEncodedEntity', 'PhysicalEntity']],
      ['Complex', ['Complex', 'PhysicalEntity']],
      ['EntitySet', ['EntitySet', 'PhysicalEntity']],
      ['Chemical', ['Molecule', 'PhysicalEntity']],
      ['Cell', ['Cell', 'PhysicalEntity']],

      ['ProteinDrug', ['Protein', 'PhysicalEntity', 'drug']],
      ['ComplexDrug', ['Complex', 'PhysicalEntity', 'drug']],
      ['ChemicalDrug', ['Molecule', 'PhysicalEntity', 'drug']],
      ['EntitySetDrug', ['EntitySet', 'PhysicalEntity', 'drug']],

      ['ProcessNode', ['SUB', 'Pathway']],
      ['EncapsulatedNode', ['Interacting', 'Pathway']]
    ]
  )

  reactionTypeMap = new Map<string | undefined, ReactionDefinition>([
      [undefined, ['transition', 'reaction']],
      ['transition', ['transition', 'reaction']],
      ['binding', ['association', 'reaction']],
      ['dissociation', ['dissociation', 'reaction']],
      ['omitted', ['omitted', 'reaction']],
      ['uncertain', ['uncertain', 'reaction']],
    ]
  )

  edgeTypeMap = new Map<string, EdgeTypeDefinition>([
      ['INPUT', ['consumption', 'incoming']],
      ['ACTIVATOR', ['positive-regulation', 'incoming']],
      ['REQUIRED', ['positive-regulation', 'incoming']],
      ['INHIBITOR', ['negative-regulation', 'incoming']],
      ['CATALYST', ['catalysis', 'incoming']],
      ['OUTPUT', ['production', 'outgoing']],
    ]
  )

  edgeTypeToStr = new Map<string, string>([
      ['INPUT', '-'],
      ['ACTIVATOR', '+'],
      ['REQUIRED', '+>'],
      ['INHIBITOR', '|'],
      ['CATALYST', 'o'],
      ['OUTPUT', '>'],
    ]
  )


  linkClassMap = new Map<string, EdgeTypeDefinition>([
    ['EntitySetAndMemberLink', ['set-to-member', 'incoming']],
    ['EntitySetAndEntitySetLink', ['set-to-member', 'incoming']],
    ['Interaction', ['production', 'outgoing']]
  ])


  random(min: number, max: number) {
    return Math.floor((Math.random()) * (max - min + 1)) + min;
  }

  pick<T>(values: T[]): T {
    return values[this.random(0, values.length - 1)];
  }

  private readonly COMPARTMENT_SHIFT = 35;

  public getLegend(): Observable<cytoscape.ElementsDefinition> {
    return of(legend)
  }

  public getDiagram(id: number | string): Observable<cytoscape.ElementsDefinition> {
    return forkJoin({
      diagram: this.http.get<Diagram>(`https://dev.reactome.org/download/current/diagram/${id}.json`),
      graph: this.http.get<Graph>(`https://dev.reactome.org/download/current/diagram/${id}.graph.json`)
    }).pipe(
      tap((mergedResponse) => console.log('All responses:', mergedResponse)),
      map((response) => {

        const data = response.diagram
        const graph = response.graph

        console.log("edge.reactionType", new Set(data.edges.flatMap(edge => edge.reactionType)))
        console.log("node.connectors.types", new Set(data.nodes.flatMap(node => node.connectors.flatMap(con => con.type))))
        console.log("node.renderableClass", new Set(data.nodes.flatMap(node => node.renderableClass)))
        console.log("links.renderableClass", new Set(data.links.flatMap(link => link.renderableClass)))
        console.log("shadow.renderableClass", new Set(data.shadows.flatMap(shadow => shadow.renderableClass)))

        const idToEdges = new Map<number, Edge>(data.edges.map(edge => [edge.id, edge]));
        const idToNodes = new Map<number, Node>(data.nodes.map(node => [node.id, node]));
        const reactomeIdToEdge = new Map<number, Edge>(
          [
            // ...data.nodes.map(node => [node.reactomeId, node]),
            ...data.edges.map(edge => [edge.reactomeId, edge])
          ] as [number, Edge][]
        );

        const edgeIds = new Map<string, number>();
        const forwardArray = data.edges.flatMap(edge => edge.segments.map(segment => [posToStr(edge, scale(segment.from)), scale(segment.to)])) as [string, Position][];
        this.extraLine = new Map<string, Position>(forwardArray);
        console.assert(forwardArray.length === this.extraLine.size, "Some edge data have been lost because 2 segments are starting from the same point")

        const backwardArray = data.edges.flatMap(edge => edge.segments.map(segment => [posToStr(edge, scale(segment.to)), scale(segment.from)])) as [string, Position][];
        this.reverseExtraLine = new Map<string, Position>(backwardArray);
        console.assert(backwardArray.length == this.reverseExtraLine.size, "Some edge data have been lost because 2 segments are ending at the same point")


        const subpathwayIds = new Set<number>(data.shadows.map((shadow) => shadow.reactomeId))

        const eventIdToSubPathwayId = new Map<number, number>(graph.subpathways?.flatMap(subpathway => subpathway.events
          .map(event => [event, subpathway.dbId])
          .filter(entry => subpathwayIds.has(entry[1]))) as [number, number][] || [])

        // create a node id - graph node mapping
        const dbIdToGraphNode = new Map<number, GraphNode>(graph.nodes.map(node => ([node.dbId, node]) || []))
        const mappingList: [number, GraphNode][] = graph.nodes.flatMap(node => {
          if (node.children && node.children.length === 1) {
            return node.diagramIds?.map(id => [id, dbIdToGraphNode.get(node.children[0])]).filter(entry => entry[1] !== undefined) as [number, GraphNode][]
          } else return node.diagramIds?.map(id => [id, node]) as [number, GraphNode][]
        }).filter(entry => entry !== undefined);

        const idToGraphNodes = new Map([...mappingList])

        //compartment nodes
        const compartmentNodes: cytoscape.NodeDefinition[] = data?.compartments.flatMap(item => {
          const layers: cytoscape.NodeDefinition[] = [
            {
              data: {
                id: item.id + '-outer',
                displayName: item.displayName,
                textX: scale(item.textPosition.x - (item.prop.x + item.prop.width)) + this.COMPARTMENT_SHIFT,
                textY: scale(item.textPosition.y - (item.prop.y + item.prop.height)) + this.COMPARTMENT_SHIFT,
                width: scale(item.prop.width),
                height: scale(item.prop.height),
              },
              classes: ['Compartment', 'outer'],
              position: scale(item.position),
              selectable: false,
            }
          ];

          if (item.insets) {
            layers.push({
              data: {
                id: item.id + '-inner',
                width: scale(item.insets.width),
                height: scale(item.insets.height),
              },
              classes: ['Compartment', 'inner'],
              position: scale({x: item.insets.x + item.insets.width / 2, y: item.insets.y + item.insets.height / 2}),
              selectable: false,
            })
          }
          return layers;
        });

        //reaction nodes
        const reactionNodes: cytoscape.NodeDefinition[] = data?.edges.map(item => ({
          data: {
            id: item.id + '',
            // displayName: item.displayName,
            inputs: item.inputs,
            output: item.outputs,
          },
          classes: this.reactionTypeMap.get(item.reactionType),
          position: scale(item.position)
        }));


        //entity nodes
        const entityNodes: cytoscape.NodeDefinition[] = data?.nodes.flatMap(item => {
          const classes = [...this.nodeTypeMap.get(item.renderableClass)!] || [item.renderableClass.toLowerCase()];
          if (item.isDisease) classes.push('disease')
          const nodes: cytoscape.NodeDefinition[] = [
            {
              data: {
                id: item.id + '',
                displayName: item.displayName.replace(/([/,:;-])/g, "$1\u200b"),
                height: scale(item.prop.height),
                width: scale(item.prop.width),
                graph: idToGraphNodes.get(item.id),
                acc: idToGraphNodes.get(item.id)?.identifier
              },
              classes: classes,
              position: scale(item.position)
            }
          ];
          if (item.nodeAttachments) {
            nodes.push(...item.nodeAttachments.map(ptm => ({
              data: {
                id: item.id + '-' + ptm.reactomeId,
                reactomeId: ptm.reactomeId,
                nodeId: item.id,
                nodeReactomeId: item.reactomeId,
                displayName: ptm.label,
                height: scale(ptm.shape.b.y - ptm.shape.a.y),
                width: scale(ptm.shape.b.x - ptm.shape.a.x),
              },
              classes: "Modification",
              position: scale(ptm.shape.centre)
            })))
          }
          return nodes
        });

        //sub pathways
        const shadowNodes: cytoscape.NodeDefinition[] = data?.shadows.map(item => {
          return {
            data: {
              id: item.id + '',
              displayName: item.displayName,
              height: scale(item.prop.height),
              width: scale(item.prop.width),
              class: this.nodeTypeMap.get(item.renderableClass) || item.renderableClass.toLowerCase(),
              reactomeId: item.reactomeId,
            },
            classes: ['Shadow'],
            position: scale({
              x: item.prop.x + item.prop.width / 2,
              y: item.prop.y + item.prop.height / 2,
            }),
            // position: closestToAverage(subpathwayIdToEventId.get(item.reactomeId)!.map(reactionId => reactomeIdToEdge.get(reactionId)!).map(edge => scale(edge!.position))),
            pannable: true,
            grabbable: false,
          }
        });

        /**
         * iterate nodes connectors to get all edges information based on the connector type.
         *
         */
        const edges: cytoscape.EdgeDefinition[] =
          data.nodes.flatMap(node => {
              return node.connectors.map(connector => {
                const reaction = idToEdges.get(connector.edgeId)!;
                const [source, target] = connector.type !== 'OUTPUT' ?
                  [node, reaction] :
                  [reaction, node];

                const sourceP = scale(source.position);
                const targetP = scale(target.position);

                let points = connector.segments
                  .flatMap((segment, i) => i === 0 ? [segment.from, segment.to] : [segment.to])
                  .map(pos => scale(pos));
                if (connector.type === 'OUTPUT') points.reverse();
                if (points.length === 0) points.push(scale(reaction.position));

                this.addEdgeInfo(reaction, points, 'backward', sourceP);
                this.addEdgeInfo(reaction, points, 'forward', targetP);

                let [from, to] = [points.shift()!, points.pop()!]
                from = from ?? scale(node.position); // Quick fix to avoid problem with reaction without visible outputs like R-HSA-2424252 in R-HSA-1474244
                to = to ?? scale(reaction.position); // Quick fix to avoid problem with reaction without visible outputs like R-HSA-2424252 in R-HSA-1474244
                if (connector.type === 'CATALYST') {
                  to = scale(connector.endShape.centre);
                }

                points = addRoundness(from, to, points);
                const relatives = this.absoluteToRelative(from, to, points);

                const classes = [...this.edgeTypeMap.get(connector.type)!];
                if (reaction.isDisease) classes.push('disease');
                const edge: cytoscape.EdgeDefinition = {
                  data: {
                    id: this.getEdgeId(source, connector, target, edgeIds),
                    source: source.id + '',
                    target: target.id + '',
                    stoichiometry: connector.stoichiometry.value,
                    weights: relatives.weights.join(" "),
                    distances: relatives.distances.join(" "),
                    sourceEndpoint: this.endpoint(sourceP, from),
                    targetEndpoint: this.endpoint(targetP, to),
                    pathway: eventIdToSubPathwayId.get(reaction.reactomeId),
                  },
                  classes: classes,
                };
                return edge
              });
            }
          );

        const linkEdges: cytoscape.EdgeDefinition[] = data.links?.map(link => {
            const source = idToNodes.get(link.inputs[0].id)!;
            const target = idToNodes.get(link.outputs[0].id)!;

            const sourceP = scale(source.position);
            const targetP = scale(target.position);

            let points = link.segments
              .flatMap((segment, i) => i === 0 ? [segment.from, segment.to] : [segment.to])
              .map(pos => scale(pos));

            let [from, to] = [points.shift()!, points.pop()!]
            from = from ?? sourceP; // Quick fix to avoid problem with reaction without visible outputs like R-HSA-2424252 in R-HSA-1474244
            to = to ?? targetP; // Quick fix to avoid problem with reaction without visible outputs like R-HSA-2424252 in R-HSA-1474244

            points = addRoundness(from, to, points);
            const relatives = this.absoluteToRelative(from, to, points);

            return {
              data: {
                id: link.id + '',
                source: link.inputs[0].id + '',
                target: link.outputs[0].id + '',
                weights: relatives.weights.join(" "),
                distances: relatives.distances.join(" "),
                sourceEndpoint: this.endpoint(sourceP, from),
                targetEndpoint: this.endpoint(targetP, to)
              },
              classes: this.linkClassMap.get(link.renderableClass),
              selectable: false
            }
          }
        )

        return {
          nodes: [...compartmentNodes, ...reactionNodes, ...entityNodes, ...shadowNodes,
            // ...InteractorOccurrenceNode
          ],
          edges: [...edges, ...linkEdges]
        };
      }))
  }

  private getEdgeId(source: Edge | Node, connector: NodeConnector, target: Edge | Node, edgeIds: Map<string, number>) {
    let edgeId = `${source.id} --${this.edgeTypeToStr.get(connector.type)} ${target.id}`;

    if (edgeIds.has(edgeId)) {
      let count = edgeIds.get(edgeId)!;
      edgeIds.set(edgeId, count++);
      edgeId += ` (${count})`;
      console.warn('Conflicting edge id: ', edgeId)
    } else {
      edgeIds.set(edgeId, 0)
    }
    return edgeId;
  }

  private addEdgeInfo(edge: Edge, points: Position[], direction: 'forward' | 'backward', stop: Position) {
    const stopPos = posToStr(edge, stop);
    if (direction === 'forward') {
      const map = this.extraLine;
      let pos = posToStr(edge, points.at(-1)!)
      while (map.has(pos) && pos !== stopPos) {
        points.push(map.get(pos)!)
        pos = posToStr(edge, points.at(-1)!)
      }
    } else {
      const map = this.reverseExtraLine;
      let pos = posToStr(edge, points.at(0)!)
      while (map.has(pos) && pos !== stopPos) {
        points.unshift(map.get(pos)!)
        pos = posToStr(edge, points.at(0)!)
      }
    }
  }

  private endpoint(source: Position, point: Position): string {
    return `${point.x - source.x} ${point.y - source.y}`
  }


  public getInteractorsOccurrences(cy: cytoscape.Core | undefined): Observable<Interaction> {

    const graphNodes = cy?.nodes(`[graph]`);
    const idToIdentifier = new Map<number, string>(graphNodes?.map(node => [node.data('dbId'), node.data('acc')]));
    const result: string[] = [];

    graphNodes?.forEach(entity => {
      const schemaClass = entity.data("graph").schemaClass;
      if (schemaClass === "EntityWithAccessionedSequence") {
        result.push(entity.data("acc"));
      }

      if (schemaClass === "Complex" && entity.data("graph").children.length === 1) {
        const identifiers: string[] = entity.data("graph").children.map((id: number) => idToIdentifier.get(id) || '');
        result.push(...identifiers);
      }
    });

    const uniqueResults = [...new Set(result)];

    // Concatenate elements from the set values into a single string
    const postContent = uniqueResults.join(',');

    return this.http.post<Interaction>('https://dev.reactome.org/ContentService/interactors/static/molecules/details', postContent, {
      headers: new HttpHeaders({ 'Content-Type': 'text/plain' })
    });
  }

  public addInteractorsOccurrences(interactors: Interaction, cy: cytoscape.Core | undefined): cytoscape.NodeDefinition[] {
    const nodes: cytoscape.NodeDefinition[] = [];
    interactors.entities
      .filter(entity => entity.count > 0)
      .flatMap(item => {
        let entities = cy?.nodes(`[acc = '${item.acc}']`);

        entities?.forEach(entity => {
          const pos = {...entity.position()};
          pos.x += entity.width() / 2;
          pos.y -= entity.height() / 2;
          nodes.push({
            data: {
              id: entity.id() + '-occ',
              displayName: item.count,
            },
            classes: ['Interactor'],
            pannable: true,
            grabbable: false,
            position: pos,
          });
        });
      });
    return nodes
  }


  /**
   * Use Matrix power to convert points from an absolute coordinate system to an edge relative system
   *
   * Visually explained by https://youtu.be/kYB8IZa5AuE?si=vJKi-MUv2dCRQ5oA<br>
   * Short version ==> https://math.stackexchange.com/q/1855051/683621
   * @param source Position position of the edge source:  {x:number, y:number}
   * @param target Position position of the edge target:  {x:number, y:number}
   * @param toConvert Array of Position to convert to the edge-relative system
   * @return The points converted to relative coordinates {distances: number[], weights: number[]}
   */
  private absoluteToRelative(source: Position, target: Position, toConvert: Position[]): RelativePosition {
    const relatives: RelativePosition = {distances: [], weights: []};
    if (toConvert.length === 0) return relatives;

    const mainVector = array([target.x - source.x, target.y - source.y]); // Edge vector
    const orthoVector = array([-mainVector.y, mainVector.x]) // Perpendicular vector
      .normalize(); //Normalized to have the distance expressed in pixels https://math.stackexchange.com/a/413235/683621
    let transform = array([
      [mainVector.x, mainVector.y],
      [orthoVector.x, orthoVector.y],
    ]).inv(); // Should always be invertible if the ortho vector is indeed perpendicular

    for (let coord of toConvert) {
      const absolute = array([[coord.x - source.x, coord.y - source.y]]);
      const relative = absolute.multiply(transform);
      relatives.weights.push(relative.get(0, 0))
      relatives.distances.push(relative.get(0, 1))
    }
    return relatives;
  }

  public randomNetwork(): Observable<cytoscape.ElementsDefinition> {
    const amount = 100;
    const peTypes = ['Protein', 'EntitySet', 'GenomeEncodedEntity', 'RNA', 'Gene', 'Complex', 'Molecule'];
    // const peTypes = ['Gene'];
    const reactionTypes = ['association', 'dissociation', 'transition', 'uncertain', 'omitted'];

    const physicalEntities: cytoscape.NodeDefinition[] = Array.from({length: amount}, (x, i) => {
      const clazz = this.pick(peTypes);
      return {
        group: 'nodes',
        data: {
          id: i.toString(),
          width: this.random(150, 300),
          height: this.random(50, 150),
          displayName: clazz,
          parent: 'Compartment'
        },
        classes: [clazz, "PhysicalEntity", this.pick(["drug", "", ""])]
      };
    });

    const reactions: cytoscape.NodeDefinition[] = physicalEntities.map((node, i) =>
      ({
        group: 'nodes',
        data: {
          id: `${i}-react`,
          parent: 'Compartment'
        },
        classes: [this.pick(reactionTypes), 'reaction']
      })
    );

    const nodes: cytoscape.NodeDefinition[] = physicalEntities.flatMap((node, i) =>
      [node, reactions[i]]
    );


    const inOut: cytoscape.EdgeDefinition[] = physicalEntities.flatMap((node, i) => [
      {
        group: 'edges',
        data: {
          source: `${i}`,
          target: `${i}-react`,
          stoichiometry: this.pick([undefined, -1, 0, 1, 2])
        },
        classes: ['consumption']
      },
      {
        group: 'edges',
        data: {
          source: `${i}-react`,
          target: `${(i + 1) % amount}`,
          stoichiometry: this.pick([undefined, -1, 0, 1, 2])
        },

        classes: ['production']
      },
    ])

    const additionalIn: cytoscape.EdgeDefinition[] = Array.from({length: amount / 4}).map(() => ({
      group: 'edges',
      data: {
        source: this.pick(physicalEntities).data.id!,
        target: this.pick(reactions).data.id!,
      },
      classes: this.pick(['catalysis', 'positive-regulation', 'negative-regulation', 'set-to-member'])
    }));


    const edges: cytoscape.EdgeDefinition[] = [...inOut, ...additionalIn];

    return of({ // list of graph elements to start with
      nodes: [
        {
          data: {id: 'Compartment'},
          classes: ['Compartment'],
          pannable: true,
          grabbable: false,
          selectable: false
        },
        ...nodes
      ]
      , edges
    })
  }
}
