import {Injectable} from '@angular/core';
import {map, Observable, of, tap} from "rxjs";
import {HttpClient} from "@angular/common/http";
import {Diagram, Edges, Position} from "../model/diagram.model";
import {Reactome} from "reactome-cytoscape-style";
import cytoscape from "cytoscape";
import {array} from "vectorious";
import PhysicalEntityDefinition = Reactome.PhysicalEntityDefinition;
import ReactionDefinition = Reactome.ReactionDefinition;
import EdgeTypeDefinition = Reactome.EdgeTypeDefinition;

type RelativePosition = { distances: number[], weights: number[] };

const posToStr = (pos: Position) => `${pos.x},${pos.y}`

const scale = <T extends Position | number>(pos: T, scale = 2): T => {
  if (typeof pos === 'number') return pos * scale as T
  return {
    x: pos.x * scale,
    y: pos.y * scale
  } as T
}

@Injectable({
  providedIn: 'root'
})
export class DiagramService {

  constructor(private http: HttpClient) {
  }


  nodeTypeMap = new Map<string, PhysicalEntityDefinition>([
      ['Protein', ['Protein', 'PhysicalEntity']],
      ['EntitySet', ['EntitySet', 'PhysicalEntity']],
      ['Complex', ['Complex', 'PhysicalEntity']],
      ['Entity', ['GenomeEncodedEntity', 'PhysicalEntity']],
      ['Gene', ['Gene', 'PhysicalEntity']],
      ['Chemical', ['Molecule', 'PhysicalEntity']],

      ['ProteinDrug', ['Protein', 'PhysicalEntity', 'drug']],
      ['ComplexDrug', ['Complex', 'PhysicalEntity', 'drug']],
      ['ChemicalDrug', ['Molecule', 'PhysicalEntity', 'drug']],
      ['EntitySetDrug', ['EntitySet', 'PhysicalEntity', 'drug']],
    ]
  )

  reactionTypeMap = new Map<string | undefined, ReactionDefinition>([
      [undefined, ['transition', 'reaction']],
      ['Association', ['association', 'reaction']],
      ['Dissociation', ['dissociation', 'reaction']],
      ['Omitted Process', ['omitted', 'reaction']],
      ['Uncertain Process', ['uncertain', 'reaction']],
    ]
  )

  edgeTypeMap = new Map<string, EdgeTypeDefinition>([
      ['INPUT', ['consumption', 'incoming']],
      ['ACTIVATOR', ['positive-regulation', 'incoming']],
      ['INHIBITOR', ['negative-regulation', 'incoming']],
      ['CATALYST', ['catalysis', 'incoming']],
      ['OUTPUT', ['production', 'outgoing']],
    ]
  )

  linkClassMap = new Map<string, EdgeTypeDefinition>([
    ['EntitySetAndMemberLink', ['set-to-member', 'incoming']],
    ['EntitySetAndEntitySetLink', ['set-to-member', 'incoming']],
    ['Interaction', ['consumption', 'incoming']]
  ])


  random(min: number, max: number) {
    return Math.floor((Math.random()) * (max - min + 1)) + min;
  }

  pick<T>(values: T[]): T {
    return values[this.random(0, values.length - 1)];
  }

  public getDiagram(id: number | string): Observable<cytoscape.ElementsDefinition> {
    return this.http.get<Diagram>(`https://dev.reactome.org/download/current/diagram/${id}.json`).pipe(
      tap((data) => console.log(data)),
      map((data) => {
        //compartments map  compartment id as key, a list of nodes as value

        console.log("edge.reactionType", new Set(data.edges.flatMap(edge => edge.reactionType)))
        console.log("node.connectors.types", new Set(data.nodes.flatMap(node => node.connectors.flatMap(con => con.type))))
        console.log("node.renderableClass", new Set(data.nodes.flatMap(node => node.renderableClass)))
        console.log("links.renderableClass", new Set(data.links.flatMap(link => link.renderableClass)))


        // const idToNode = new Map<number, Nodes>(data.nodes.map(node => [node.id, node]));
        const idToEdges = new Map<number, Edges>(data.edges.map(edge => [edge.id, edge]));
        const extraLine = new Map<string, Position>(data.edges.flatMap(edge => edge.segments.map(segment => [posToStr(scale(segment.from)), scale(segment.to)])));
        const reverseExtraLine = new Map<string, Position>(data.edges.flatMap(edge => edge.segments.map(segment => [posToStr(scale(segment.to)), scale(segment.from)])));
        console.log(extraLine)
        const compartments = new Map<number, number>(
          data.compartments.flatMap(compartment =>
            compartment.componentIds.map(childId => [childId, compartment.id])
          )
        );

        //compartment nodes
        const compartmentNodes: cytoscape.NodeDefinition[] = data?.compartments.map(item => ({
          data: {
            id: item.id + '',
            parent: compartments.get(item.id)?.toString() || undefined,
            displayName: item.displayName,
            width: scale(item.prop.width),
            height: scale(item.prop.height),
            class: this.nodeTypeMap.get(item.renderableClass) || item.renderableClass.toLowerCase(),
          },
          classes: ['Compartment'],
          position: scale(item.position),
          pannable: true,
          grabbable: false,
          selectable: false,
        }));

        //reaction nodes
        const reactionNodes: cytoscape.NodeDefinition[] = data?.edges.map(item => ({
          data: {
            id: item.id + '',
            displayName: item.displayName,
            inputs: item.inputs,
            output: item.outputs,
          },
          classes: this.reactionTypeMap.get(item.reactionType),
          pannable: true,
          grabbable: false,
          position: scale(item.position)
        }));


        //entity nodes
        const entityNodes: cytoscape.NodeDefinition[] = data?.nodes.map(item => ({
            data: {
              id: item.id + '',
              parent: compartments.get(item.id)?.toString() || undefined,
              displayName: item.displayName.replace(/([,:;])/g, "$1\u200b"),
              height: scale(item.prop.height),
              width: scale(item.prop.width),
            },
            classes: this.nodeTypeMap.get(item.renderableClass) || [item.renderableClass.toLowerCase()],
            pannable: true,
            grabbable: false,
            position: scale(item.position)
          }
        ));

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
                if (points.length === 0) points.push(scale(reaction.position))


                const sourceKey = posToStr(sourceP);
                const targetKey = posToStr(targetP);
                let key: string;

                let firstPosition = points.at(0)!;
                key = posToStr(firstPosition)
                while (reverseExtraLine.has(key) && key !== sourceKey) {
                  points.unshift(reverseExtraLine.get(key)!)
                  firstPosition = points.at(0)!;
                  key = posToStr(firstPosition)
                }

                let lastPosition = points.at(-1)!;
                key = posToStr(lastPosition)
                while (extraLine.has(key) && key !== targetKey) {
                  points.push(extraLine.get(key)!)
                  lastPosition = points.at(-1)!;
                  key = posToStr(lastPosition)
                }

                let [from, to] = [sourceP, targetP];

                let positions = {} as any;

                if (node.renderableClass === 'Gene' && points.length !== 0) {
                  // const geneStart = scale({
                  //   x: node.position.x + node.prop.width / 2,
                  //   y: node.position.y - node.prop.height / 2 - 7
                  // }, scaleFactor);
                  // if (node === source) {
                  //   from = geneStart;
                  //   points.shift();
                  // } else {
                  //   to = geneStart;
                  //   points.pop();
                  // }
                  // else {
                  //   to = points.shift()! ;
                  //   genePositions.targetEndpoint = this.endpoint(targetP, to)
                  // }
                  // console.log(genePositions, node.prop.width * 2)
                }

                if (points.length >= 2) {
                  from = points.shift()!;
                  to = points.pop()!;
                  positions.sourceEndpoint = this.endpoint(sourceP, from)
                  positions.targetEndpoint = this.endpoint(targetP, to)
                }

                const relatives = this.absoluteToRelative(
                  from, to,
                  points
                );

                const edge: cytoscape.EdgeDefinition = {
                  data: {
                    id: source.id + '-->' + target.id,
                    source: source.id + '',
                    target: target.id + '',
                    stoichiometry: connector.stoichiometry.value,
                    weights: relatives.weights.join(" "),
                    distances: relatives.distances.join(" "),
                    ...positions
                  },
                  classes: this.edgeTypeMap.get(connector.type),
                  pannable: true,
                  grabbable: false,
                };

                // console.log(edge.data.id, relatives)
                return edge
              });
            }
          );


        const linkEdges: cytoscape.EdgeDefinition[] = data.links?.map(link => ({
              data: {
                id: link.id + '',
                source: link.inputs[0].id + '',
                target: link.outputs[0].id + '',
              },
              classes: this.linkClassMap.get(link.renderableClass),
              pannable: true,
              grabbable: false,
            }
          )
        )

        return {
          nodes: [...reactionNodes, ...entityNodes, ...compartmentNodes],
          edges: [...edges, ...linkEdges]
        };
      }))
  }

  private endpoint(source: Position, point: Position): string {
    return `${point.x - source.x} ${point.y - source.y}`
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
