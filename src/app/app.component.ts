import {AfterViewInit, Component, ElementRef, ViewChild} from '@angular/core';
import cytoscape from 'cytoscape';
import {Reactome} from "reactome-cytoscape-style";

@Component({
  selector: 'cr-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.scss']
})
export class AppComponent implements AfterViewInit {
  title = 'pathway-browser';
  @ViewChild('cytoscape') cytoscapeContainer?: ElementRef<HTMLDivElement>;


  constructor() {

  }


  cy?: cytoscape.Core;

  redraw() {
    this.cy?.elements().data({0: 0})
  }

  random(min: number, max: number) {
    return Math.floor((Math.random()) * (max - min + 1)) + min;
  }

  pick<T>(values: T[]): T {
    return values[this.random(0, values.length - 1)];
  }

  ngAfterViewInit(): void {
    // if (!this.cytoscapeContainer) return;

    const amount = 100;
    const peTypes = ['Protein', 'EntitySet', 'GenomeEncodedEntity', 'RNA', 'Gene', 'Complex', 'Molecule'];
    // const peTypes = ['Gene'];
    const reactionTypes = ['association', 'dissociation', 'transition', 'uncertain', 'omitted'];

    const physicalEntities: cytoscape.NodeDefinition[] = Array.from({length: amount}, (x, i) => ({
      group: 'nodes',
      data: {
        id: i.toString(),
        width: this.random(150, 300),
        height: this.random(50, 150),
        displayName: `I am something`,
        parent: 'Compartment'
      },
      classes: [this.pick(peTypes), "PhysicalEntity", this.pick(["disease", ""])]
    }));

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


    const edges: cytoscape.EdgeDefinition[] = [...inOut, ...additionalIn]


    const container = this.cytoscapeContainer!.nativeElement;
    const properties: Reactome.UserProperties = {global: {thickness: 8}};
    const reactomeStyle = new Reactome.Style(container, {});
    this.cy = cytoscape({
      container: container,
      elements: [ // list of graph elements to start with
        {
          data: {id: 'Compartment'},
          classes: ['Compartment'],
          pannable: true,
          grabbable: false,
          selectable: false
        },
        ...nodes,
        ...edges
      ],
      style: reactomeStyle.getStyleSheet(),
      layout: {
        name: 'grid',
      }
    });
    // setTimeout(() => {
    //   properties.global!.thickness = 4;
    //   reactomeStyle.update(this.cy!)
    //   this.redraw()
    // }, 5000)

    reactomeStyle.bindToCytoscape(this.cy);


    this.cy.on("layoutstop", () => this.cy?.minZoom(this.cy?.zoom()))

    // this.cy.on('zoom', (e, extraParams) => {
    //   console.log(this.cy!.zoom())
    // })

  }
}
