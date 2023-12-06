import cytoscape from "cytoscape";
import {backgroundData, classToDrawers, svgStr} from "./svg-utils";
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
      select: Property<string>
      hover: Property<string>
    },
    compartment: {
      fill: Property<string>
      opacity: Property<number>
    }
    protein: {
      fill: Property<string>
      disease: Property<string>
      radius: Property<number>
    }
    genomeEncodedEntity: {
      fill: Property<string>
      stroke: Property<string>
      disease: Property<string>
      radius: Property<number>
    }
    rna: {
      fill: Property<string>
      disease: Property<string>
      radius: Property<number>
    }
    gene: {
      fill: Property<string>
      decorationHeight: Property<number>
      arrowHeadSize: Property<number>
      borderRadius: Property<number>
      arrowRadius: Property<number>
    }
    molecule: {
      fill: Property<string>
      stroke: Property<string>
      disease: Property<string>
    }
    entitySet: {
      fill: Property<string>
      stroke: Property<string>
      disease: Property<string>
      radius: Property<number>
    }
    complex: {
      fill: Property<string>
      stroke: Property<string>
      disease: Property<string>
      cut: Property<number>
    }
  }

  export type UserProperties = Partial<{
    [k in keyof Properties]: Partial<Properties[k]>
  }>

  export type SimpleEntity = 'Protein' | 'GenomeEncodedEntity' | 'RNA' | 'Gene' | 'Molecule';
  export type ComposedEntity = 'EntitySet' | 'Complex' | 'Cell';
  export type PhysicalEntity = SimpleEntity | ComposedEntity;
  export type PhysicalEntityDefinition = [PhysicalEntity, 'PhysicalEntity', ...string[]];


  export type Reaction = 'association' | 'dissociation' | 'transition' | 'uncertain' | 'omitted';
  export type ReactionDefinition = [Reaction, 'Reaction', ...string[]];


  export type IncomingEdge =
    'consumption'
    | 'catalysis'
    | 'positive-regulation'
    | 'negative-regulation'
    | 'set-to-member';
  export type OutgoingEdge = 'production';
  export type EdgeType = IncomingEdge | OutgoingEdge;
  export type IncomingEdgeDefinition = [IncomingEdge, 'incoming', ...string[]];
  export type OutgoingEdgeDefinition = [OutgoingEdge, 'outgoing', ...string[]];
  export type EdgeTypeDefinition = IncomingEdgeDefinition | OutgoingEdgeDefinition;


  export class Style {
    public static css: CSSStyleDeclaration;
    public static properties: Properties;
    private p = propertyExtractor;
    private pm = propertyMapper;

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
        .setDefault('select', () => Style.css.getPropertyValue('--select') || '#6EB3E4')
        .setDefault('hover', () => Style.css.getPropertyValue('--hover') || '#78E076')

      const compartment: Properties['compartment'] = defaultable(properties.compartment || {})
        .setDefault('opacity', 0.12)
        .setDefault('fill', () => Style.css.getPropertyValue('--compartment') || '#E5834A')

      const protein: Properties['protein'] = defaultable(properties.protein || {})
        .setDefault('fill', () => Style.css.getPropertyValue('--primary-contrast-1') || '#001F29')
        .setDefault('disease', () => Style.css.getPropertyValue('--disease-contrast-1') || '#3E001D')
        .setDefault('radius', 8)

      const genomeEncodedEntity: Properties['genomeEncodedEntity'] = defaultable(properties.genomeEncodedEntity || {})
        .setDefault('fill', () => extract(protein.fill))
        .setDefault('stroke', () => extract(global.primary))
        .setDefault('disease', () => extract(protein.disease))
        .setDefault('radius', 8)

      const rna: Properties['rna'] = defaultable(properties.rna || {})
        .setDefault('fill', () => Style.css.getPropertyValue('--primary-contrast-2') || '#003545')
        .setDefault('disease', () => Style.css.getPropertyValue('--disease-contrast-2') || '#610B33')
        .setDefault('radius', 8)

      const gene: Properties['gene'] = defaultable(properties.gene || {})
        .setDefault('decorationHeight', 20)
        .setDefault("arrowHeadSize", 10)
        .setDefault("borderRadius", 8)
        .setDefault("arrowRadius", 8)
        .setDefault("fill", () => Style.css.getPropertyValue('--primary-contrast-3') || '#004D62')

      const molecule: Properties['molecule'] = defaultable(properties.molecule || {})
        .setDefault("fill", () => extract(global.surface))
        .setDefault("stroke", () => extract(global.onSurface))
        .setDefault('disease', () => Style.css.getPropertyValue('--disease-contrast-4') || '#9C3D61')
      ;

      const complex: Properties['complex'] = defaultable(properties.complex || {})
        .setDefault("cut", 15)
        .setDefault("fill", () => Style.css.getPropertyValue('--tertiary-contrast-1') || '#00315C')
        .setDefault("stroke", () => Style.css.getPropertyValue('--on-tertiary') || '#FFFFFF')
        .setDefault('disease', () => Style.css.getPropertyValue('--disease-contrast-4') || '#7E2549')

      const entitySet: Properties['entitySet'] = defaultable(properties.entitySet || {})
        .setDefault("radius", 10)
        .setDefault("fill", () => Style.css.getPropertyValue('--tertiary-contrast-2') || '#1660A5')
        .setDefault("stroke", () => Style.css.getPropertyValue('--on-tertiary') || '#FFFFFF')
        .setDefault('disease', () => Style.css.getPropertyValue('--disease-contrast-5') || '#BB557A')


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

    bindToCytoscape(cy: cytoscape.Core) {
      cy.on('mouseover', e => {
        if (e.target.addClass) e.target.addClass('hover')
      });
      cy.on('mouseout', e => {
        if (e.target.removeClass) e.target?.removeClass('hover')
      });
    }


    getStyleSheet(): cytoscape.Stylesheet[] {
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
            "background-fit": "none",
            "text-halign": 'center',
            "text-valign": 'center',
            "text-wrap": 'wrap',
            "text-max-width": "data(width)",
            "background-image-smoothing": "no",

            // @ts-ignore
            "background-image": node => backgroundData(node)["background-image"],
            // @ts-ignore
            "background-position-y": node => backgroundData(node)["background-position-y"] || 0,
            // @ts-ignore
            "background-position-x": node => backgroundData(node)["background-position-x"] || 0,
            // @ts-ignore
            "background-height": node => backgroundData(node)["background-height"] || '100%',
            // @ts-ignore
            "background-width": node => backgroundData(node)["background-width"] || '100%',
            // @ts-ignore
            "background-clip": node => backgroundData(node)["background-clip"] || 'clipped',
            // @ts-ignore
            "background-image-containment": node => backgroundData(node)["background-image-containment"] || 'inside',
            "bounds-expansion": this.p('global', 'thickness'),
            'color': this.p('global', 'onPrimary'),
          }
        }, {
          selector: 'node.Protein',
          style: {
            "shape": "round-rectangle",
            "background-color": this.p('protein', 'fill')
          }
        }, {
          selector: 'node.Protein.disease',
          style: {
            "background-color": this.p('protein', 'disease')
          }
        }, {
          selector: 'node.GenomeEncodedEntity',
          style: {
            "shape": "round-rectangle",
            "background-color": this.p('genomeEncodedEntity', 'fill'),
          }
        }, {
          selector: 'node.GenomeEncodedEntity.disease',
          style: {
            "background-color": this.p('genomeEncodedEntity', 'disease'),
          }
        }, {
          selector: 'node.RNA',
          style: {
            "shape": "bottom-round-rectangle",
            "background-color": this.p('rna', 'fill'),
          }
        }, {
          selector: 'node.RNA.disease',
          style: {
            "background-color": this.p('rna', 'disease'),
          }
        }, {
          selector: 'node.Gene',
          style: {
            "shape": "bottom-round-rectangle",
            "background-color": this.p('gene', 'fill'),
            "bounds-expansion": this.p('gene', 'decorationHeight'),
          }
        }, {
          selector: 'node.Molecule',
          style: {
            "background-opacity": 0,
            "shape": 'round-rectangle',
            "color": this.p("molecule", 'stroke'),
          }
        }, {
          selector: 'node.Molecule.disease',
          style: {
            "color": this.p("molecule", 'disease'),
          }
        }, {
          selector: 'node.EntitySet',
          style: {
            "background-opacity": 0,
            "shape": "round-rectangle",
            "text-max-width": (node: cytoscape.NodeSingular) =>
              this.pm('global', 'thickness', t =>
                this.pm('entitySet', 'radius', r => `${node.width() - 2 * r - 6 * t}px`
                )
              )
          }
        }, {
          selector: 'node.Complex',
          style: {
            "background-opacity": 0,
            "shape": "cut-rectangle"
          }
        },

        {
          selector: 'node.disease',
          style: {
            "text-max-width": (node: cytoscape.NodeSingular) => (node.width() - 26) + 'px'
          }
        },
        {
          selector: 'node.Pathway',
          style: {
            "text-max-width": (node: cytoscape.NodeSingular) => (node.width() - 26) + 'px'
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
          style: {"target-endpoint": "inside-to-node", "source-endpoint": "outside-to-node"}
        }, {
          selector: 'edge.production',
          style: {'target-arrow-shape': 'triangle'}
        }, {
          selector: 'edge.catalysis',
          style: {
            'target-arrow-shape': 'circle',
            "target-arrow-fill": "hollow",
            "target-arrow-color": this.p('global', 'positive')
          }
        }, {
          selector: 'edge.positive-regulation',
          style: {
            'target-arrow-shape': 'triangle',
            "target-arrow-fill": "hollow",
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
            "text-border-width": this.pm('global', 'thickness', t => t / 2),
            "text-border-opacity": 1,
            "text-border-color": this.p('global', 'onSurface'),
            "text-background-shape": 'roundrectangle',
            "text-background-padding": this.pm('global', 'thickness', t => t + 'px'),
          }
        }
      ]

    }

    update(cy: cytoscape.Core) {
      for (let value of classToDrawers.values()) {
        value.cache.clear!()
      }
      cy.style(this.getStyleSheet())
    }
  }

  const OMMITED_ICON = svgStr('<line x1="2.5" y1="3" x2="4.5" y2="7" stroke-width="1.5" stroke-linecap="round" stroke="#001F24"/><line x1="5.5" y1="3" x2="7.5" y2="7" stroke-width="1.5" stroke-linecap="round" stroke="#001F24"/>', 10, 10)
}




