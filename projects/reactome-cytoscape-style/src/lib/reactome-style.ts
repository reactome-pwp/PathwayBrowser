import cytoscape from "cytoscape";
import {entitySetsShape} from "./shape/entity-sets-shape";
import {complexShape} from "./shape/complex-shape";
import {geneShape} from "./shape/gene-shape";
import {moleculeShape} from "./shape/small-molecule-shape";
import {svgStr} from "./svg-utils";
import {defaultable, extract, PropertiesType, Property, propertyExtractor, propertyMapper} from "./type-utils";

export namespace Reactome {

  export interface Properties extends PropertiesType {
    global: {
      thickness: Property<number>
      surface: Property<string>
      onSurface: Property<string>
      primary: Property<string>
      onPrimary: Property<string>
      positive: Property<string>
      negative: Property<string>
    },
    compartment: {
      fill: Property<string>
      opacity: Property<number>
    }
    protein: {
      fill: Property<string>
    }
    genomeEncodedEntity: {
      fill: Property<string>
      stroke: Property<string>
    }
    rna: {
      fill: Property<string>
    }
    gene: {
      fill: Property<string>
      decorationHeight: Property<number>
      arrowHeadSize: Property<number>
      radius: Property<number>
    }
    molecule: {
      fill: Property<string>
      stroke: Property<string>
    }
    entitySet: {
      fill: Property<string>
      stroke: Property<string>
      radius: Property<number>
    }
    complex: {
      fill: Property<string>
      stroke: Property<string>
      cut: Property<number>
    }
  }

  export type UserProperties = Partial<{
    [k in keyof Properties]: Partial<Properties[k]>
  }>

  export class Style {
    public static css: CSSStyleDeclaration;
    public static properties: Properties;
    private p = propertyExtractor
    private pm = propertyMapper

    constructor(container: HTMLElement, properties: UserProperties = {}) {
      Style.css = getComputedStyle(container);

      const global: Properties['global'] = defaultable(properties.global || {})
        .setDefault('thickness', 4)
        .setDefault('surface', () => Style.css.getPropertyValue('--surface') || '#F6FEFF')
        .setDefault('onSurface', () => Style.css.getPropertyValue('--on-surface') || '#001F24')
        .setDefault('primary', () => Style.css.getPropertyValue('--primary') || '#006782')
        .setDefault('onPrimary', () => Style.css.getPropertyValue('--on-primary') || '#FFFFFF')
        .setDefault('positive', () => Style.css.getPropertyValue('--positive') || '#0C9509')
        .setDefault('negative', () => Style.css.getPropertyValue('--negative') || '#BA1A1A')

      const compartment: Properties['compartment'] = defaultable(properties.compartment || {})
        .setDefault('opacity', 0.12)
        .setDefault('fill', () => Style.css.getPropertyValue('--compartment') || '#E5834A')

      const protein: Properties['protein'] = defaultable(properties.protein || {})
        .setDefault('fill', () => Style.css.getPropertyValue('--primary-contrast-1') || '#001F29')

      const genomeEncodedEntity: Properties['genomeEncodedEntity'] = defaultable(properties.genomeEncodedEntity || {})
        .setDefault('fill', () => extract(protein.fill))
        .setDefault('stroke', () => extract(global.primary))

      const rna: Properties['rna'] = defaultable(properties.rna || {})
        .setDefault('fill', () => Style.css.getPropertyValue('--primary-contrast-2') || '#003545')

      const gene: Properties['gene'] = defaultable(properties.gene || {})
        .setDefault('decorationHeight', 20)
        .setDefault("arrowHeadSize", 10)
        .setDefault("radius", 8)
        .setDefault("fill", () => Style.css.getPropertyValue('--primary-contrast-3') || '#004D62');

      const molecule: Properties['molecule'] = defaultable(properties.molecule || {})
        .setDefault("fill", () => extract(global.surface))
        .setDefault("stroke", () => extract(global.onSurface));

      const complex: Properties['complex'] = defaultable(properties.complex || {})
        .setDefault("cut", 15)
        .setDefault("fill", () => Style.css.getPropertyValue('--tertiary-contrast-1') || '#00315C')
        .setDefault("stroke", () => Style.css.getPropertyValue('--on-tertiary') || '#FFFFFF');

      const entitySet: Properties['entitySet'] = defaultable(properties.entitySet || {})
        .setDefault("radius", 10)
        .setDefault("fill", () => Style.css.getPropertyValue('--tertiary-contrast-2') || '#1660A5')
        .setDefault("stroke", () => Style.css.getPropertyValue('--on-tertiary') || '#FFFFFF')


      Style.properties = {
        global,
        compartment,
        protein,
        genomeEncodedEntity,
        rna,
        gene,
        molecule,
        complex,
        entitySet
      }
    }

    toCytoscape(): cytoscape.Stylesheet[] {
      return [
        {
          selector: "*",
          style: {
            "font-family": "Helvetica",
            "font-weight": 600,
          }
        },
        {
          selector: 'node.Compartment',
          style: {
            "shape": "round-rectangle",
            "width": '1',
            "height": '1',

            "border-style": 'double',
            "text-opacity": 0.8,

            "text-halign": "center",
            "text-valign": "top",

            "text-margin-y": 25,
            "overlay-opacity": 0,

            "color": this.p('compartment', 'fill'),
            "border-color": this.p('compartment', 'fill'),
            "background-color": this.p('compartment', 'fill'),
            "background-opacity": this.p('compartment', 'opacity'),
            "border-width": this.pm('global', 'thickness', t => 3 * t)
          }
        },
        {
          selector: 'node.PhysicalEntity',
          style: {
            'label': 'data(displayName)',
            'width': 'data(width)',
            'height': 'data(height)',
            "background-fit": "cover",
            "background-height": "100%",
            "background-width": "100%",
            "text-halign": 'center',
            "text-valign": 'center',
            "text-wrap": 'wrap',

            'color': this.p('global', 'onPrimary'),
          }
        }, {
          selector: 'node.Protein',
          style: {
            "shape": "round-rectangle",
            "background-color": this.p('protein', 'fill')
          }
        }, {
          selector: 'node.GenomeEncodedEntity',
          style: {
            "shape": "round-rectangle",
            "border-style": "dashed",
            "background-color": this.p('genomeEncodedEntity', 'fill'),
            "border-width": this.p('global', 'thickness'),
            "border-color": this.p('genomeEncodedEntity', 'stroke')
          }
        }, {
          selector: 'node.RNA',
          style: {
            "shape": "bottom-round-rectangle",
            "background-color": this.p('rna', 'fill')
          }
        }, {
          selector: 'node.Gene',
          style: {
            "background-image": node => svgStr(geneShape(node.data('width'), node.data('height')), node.data('width'), node.data('height')),
            "background-clip": "none",
            "background-image-containment": "over",
            "shape": "bottom-round-rectangle",

            "background-color": this.p('gene', 'fill'),
            "background-position-y": this.pm('gene', 'decorationHeight', h => -h),
            "bounds-expansion": this.p('gene', 'decorationHeight'),
          }
        }, {
          selector: 'node.Molecule',
          style: {
            "background-image": node => svgStr(moleculeShape(node.data('width'), node.data('height')), node.data('width'), node.data('height')),
            "background-opacity": 0,
            "shape": 'round-rectangle',
            "color": this.p("molecule", 'stroke'),
          }
        }, {
          selector: 'node.EntitySet',
          style: {
            "background-image": node => svgStr(entitySetsShape(node.data('width'), node.data('height')), node.data('width'), node.data('height')),
            "background-opacity": 0,
            "shape": "round-rectangle"
          }
        }, {
          selector: ' node.Complex',
          style: {
            "background-image": node => svgStr(complexShape(node.data('width'), node.data('height')), node.data('width'), node.data('height')),
            "background-opacity": 0,
            "shape": "cut-rectangle"
          }
        },


        {
          selector: 'node.reaction',
          style: {
            "width": 24,
            "height": 24,
            "shape": "round-rectangle",
            "text-halign": "center",
            "text-valign": "center",
            "border-width": this.p('global', 'thickness'),
            "border-color": this.p('global', 'onSurface'),
            "color": this.p('global', 'onSurface'),
            "background-color": this.p('global', 'surface'),
          }
        }, {
          selector: 'node.association',
          style: {
            "shape": "ellipse",
            "background-color": this.p('global', 'onSurface'),
          }
        }, {
          selector: ' node.dissociation',
          style: {
            "shape": "ellipse",
            "border-style": "double",
            "border-width": this.pm('global', 'thickness', t => 3 * t)
          }
        }, {
          selector: ' node.uncertain',
          style: {
            "label": "?",
            "font-weight": 600
          }
        }, {
          selector: 'node.omitted',
          style: {
            "background-image": OMMITED_ICON,
            "background-fit": "cover",
            "background-height": "100%",
            "background-width": "100%",
          }
        },


        {
          selector: 'edge',
          style: {
            "curve-style": "bezier",
            "line-cap": "round",
            "source-endpoint": "outside-to-node",
            "arrow-scale": 1.5,

            'width': this.p('global', 'thickness'),
            'color': this.p('global', 'onSurface'),
            'line-color': this.p('global', 'onSurface'),
            'target-arrow-color': this.p('global', 'onSurface'),
            'mid-source-arrow-color': this.p('global', 'onSurface'),
            'mid-target-arrow-color': this.p('global', 'onSurface'),
            'source-arrow-color': this.p('global', 'onSurface'),
          }
        }, {
          selector: 'edge.consumption',
          style: {"target-endpoint": "inside-to-node", "source-endpoint": "inside-to-node"}
        }, {
          selector: 'edge.production',
          style: {'target-arrow-shape': 'triangle'}
        }, {
          selector: 'edge.catalysis',
          style: {
            'target-arrow-shape': 'circle',
            // "target-arrow-fill": "hollow",
            "target-arrow-color": this.p('global', 'positive')
          }
        }, {
          selector: 'edge.positive-regulation',
          style: {
            'target-arrow-shape': 'triangle',
            // "target-arrow-fill": "hollow",
            "target-arrow-color": this.p('global', 'positive')
          }
        }, {
          selector: 'edge.negative-regulation',
          style: {
            'target-arrow-shape': 'tee',
            "line-cap": "butt",
            "source-endpoint": "inside-to-node",
            "target-arrow-color": this.p('global', 'negative')
          }
        }, {
          selector: 'edge.set-to-member',
          style: {'target-arrow-shape': 'circle', "line-style": "dashed", "line-dash-pattern": [6, 10]}
        }, {
          selector: 'edge[stoichiometry > 1]',
          style: {
            "label": "data(stoichiometry)",
            "text-background-color": this.p('global', 'surface'),
            "text-background-opacity": 1,
            "text-border-width": this.pm('global', 'thickness', t => {
              console.log(t)
              return t / 2
            }),
            "text-border-opacity": 1,
            "text-border-color": this.p('global', 'onSurface'),
            "text-background-shape": 'roundrectangle',
            "text-background-padding": this.pm('global', 'thickness', t => t + 'px'),
          }
        }
      ]

    }

    update(cy: cytoscape.Core) {
      complexShape.cache.clear!()
      entitySetsShape.cache.clear!()
      moleculeShape.cache.clear!()
      geneShape.cache.clear!()
      cy.style(this.toCytoscape())
    }
  }

  const OMMITED_ICON = svgStr('<line x1="2.5" y1="3" x2="4.5" y2="7" stroke-width="1.5" stroke-linecap="round" stroke="#001F24"/><line x1="5.5" y1="3" x2="7.5" y2="7" stroke-width="1.5" stroke-linecap="round" stroke="#001F24"/>', 10, 10)
}





