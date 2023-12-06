import {Injectable} from '@angular/core';
import {map, Observable, of, tap} from "rxjs";
import {HttpClient} from "@angular/common/http";
import {Diagram} from "../model/diagram.model";
import {Reactome} from "reactome-cytoscape-style";
import cytoscape from "cytoscape";
import PhysicalEntityDefinition = Reactome.PhysicalEntityDefinition;
import ReactionDefinition = Reactome.ReactionDefinition;
import EdgeTypeDefinition = Reactome.EdgeTypeDefinition;

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

      ['ProteinDrug', ['Protein', 'PhysicalEntity', 'disease']],
      ['ComplexDrug', ['Complex', 'PhysicalEntity', 'disease']],
      ['ChemicalDrug', ['Molecule', 'PhysicalEntity', 'disease']],
      ['EntitySetDrug', ['EntitySet', 'PhysicalEntity', 'disease']],
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
    ['EntitySetAndEntitySet', ['set-to-member', 'incoming']],
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
            parent: Object.entries(compartments).find(([key, value]) => value.includes(item.id))?.[0],
            displayName: item.displayName,
            width: item.prop.width * scaleFactor,
            height: item.prop.height * scaleFactor,
            class: this.nodeTypeMap.get(item.renderableClass) || item.renderableClass.toLowerCase(),
            clonemarker: false,
            stateVariables: [],
            unitsOfInformation: []
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

          //  grabbable: false
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
              x: (item.position.x + 0.5 * (item.prop.width)) * scaleFactor,
              y: (item.position.y + 0.5 * (item.prop.height)) * scaleFactor
            }
            // position: item.position,
            // grabbable: false
          }
        ));

        //all in one?
        const edges = data.nodes.flatMap(node => {
          const inputs: any[] = [];
          const outputs: any[] = [];
          node.connectors.forEach(connector => {
            if (connector.type !== 'OUTPUT') {
              inputs.push({
                data: {
                  source: node.id,
                  target: connector.edgeId,
                  type: 'input',
                  cardinality: connector.stoichiometry,
                  portSource: node.id,
                  portTarget: connector.edgeId,
                },
                classes: this.edgeTypeMap.get(connector.type),
                pannable: true,
                grabbable: false,
              });
            }
            if (connector.type === 'OUTPUT') {
              outputs.push({
                data: {
                  source: connector.edgeId,
                  target: node.id,
                  type: 'output',
                  portSource: connector.edgeId,
                  portTarget: node.id,
                },
                classes: this.edgeTypeMap.get(connector.type),
                pannable: true,
                grabbable: false,
              });
            }
          });

          return [...inputs, ...outputs]
        });


        const linkEdges = data.links?.map(link => ({
              data: {
                id: link.id,
                source: link.inputs[0].id,
                target: link.outputs[0].id,
                portSource: link.inputs[0].id,
                portTarget: link.outputs[0].id
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
        classes: [clazz, "PhysicalEntity", this.pick(["disease", "", ""])]
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
