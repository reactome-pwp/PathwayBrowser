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
        const compartments = new Map<number, number>(
          data.compartments.flatMap(compartment =>
            compartment.componentIds.map(childId => [childId, compartment.id])
          )
        );

        //compartment nodes
        const scaleFactor = 2;
        const compartmentNodes: cytoscape.NodeDefinition[] = data?.compartments.map(item => ({
          data: {
            id: item.id + '',
            parent: compartments.get(item.id)?.toString() || undefined,
            displayName: item.displayName,
            width: item.prop.width * scaleFactor,
            height: item.prop.height * scaleFactor,
            class: this.nodeTypeMap.get(item.renderableClass) || item.renderableClass.toLowerCase(),
          },
          classes: ['Compartment'],
          position: {
            x: item.position.x * scaleFactor,
            y: item.position.y * scaleFactor
          },
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
            stateVariables: [],
            renderableClass: item.renderableClass,
            unitsOfInformation: []
          },
          classes: this.reactionTypeMap.get(item.reactionType),
          pannable: true,
          grabbable: false,
          position: {
            x: item.reactionShape.centre.x * scaleFactor,
            y: item.reactionShape.centre.y * scaleFactor,
          }
        }));


        //entity nodes
        const entityNodes: cytoscape.NodeDefinition[] = data?.nodes.map(item => ({
            data: {
              id: item.id + '',
              parent: compartments.get(item.id)?.toString() || undefined,
              displayName: item.displayName.replace(/([,:;])/g, "$1\u200b"),
              height: item.prop.height * scaleFactor,
              width: item.prop.width * scaleFactor,
            },
            classes: this.nodeTypeMap.get(item.renderableClass) || [item.renderableClass.toLowerCase()],
            pannable: true,
            grabbable: false,
            position: {
              x: (item.position.x + 0.5) * scaleFactor,
              y: (item.position.y + 0.5) * scaleFactor
            }
          }
        ));

        const edges: cytoscape.EdgeDefinition[] =
          data.nodes.flatMap(node =>
            node.connectors.map(connector => {
              const [source, target] = connector.type !== 'OUTPUT' ?
                [node, idToEdges.get(connector.edgeId)!] :
                [idToEdges.get(connector.edgeId)!, node];

              const relatives = this.absoluteToRelative(
                this.scale(source.position, scaleFactor), this.scale(target.position, scaleFactor),
                connector.segments.flatMap(segment => [segment.from, segment.to]).map(pos => this.scale(pos, scaleFactor))
              );

              const edge: cytoscape.EdgeDefinition = {
                data: {
                  source: source.id + '',
                  target: target.id + '',
                  stoichiometry: connector.stoichiometry.value,
                  portSource: node.id,
                  portTarget: connector.edgeId,
                  weights: relatives.weights.join(" "),
                  distances: relatives.distances.join(" ")
                },
                classes: this.edgeTypeMap.get(connector.type),
                pannable: true,
                grabbable: false,
              };
              return edge
            })
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

  private absoluteToRelative(source: Position, target: Position, toConvert: Position[]): RelativePosition {
    const relatives: RelativePosition = {distances: [], weights: []};
    if (toConvert.length === 0) return relatives;
    console.log(source, target, toConvert);
    const mainVector = array([target.x - source.x, target.y - source.y]);
    const orthoVector = array([-mainVector.y, mainVector.x]).normalize();
    let transform = array([
      [mainVector.x, mainVector.y],
      [orthoVector.x, orthoVector.y],
    ]);
    try {
      transform = transform.inv();
      for (let coord of toConvert) {
        const absolute = array([[coord.x - source.x, coord.y - source.y]]);
        // console.log(absolute.toString(), absolute.shape)
        const relative = absolute.multiply(transform);
        console.log(absolute.toString(), " ==> ", relative.toString())
        relatives.weights.push(relative.get(0, 0))
        relatives.distances.push(relative.get(0, 1))
      }
    } catch (e) {
      console.error(transform.toString(), transform.shape, e)
    }
    return relatives;
  }

  private scale(pos: Position, scale: number): Position {
    return {
      x: pos.x * scale,
      y: pos.y * scale
    }
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
