import cytoscape from "cytoscape";
import {imageBuilder, clearDrawersCache, OMMITED_ICON} from "./drawer/image-builder";
import {propertyExtractor, propertyMapper} from "./properties-utils";

import {Properties, setDefaults, UserProperties} from "./properties";
import {initInteractivity} from "./interactivity";


export class Style {
  public static css: CSSStyleDeclaration;
  public static properties: Properties;
  private p = propertyExtractor;
  private pm = propertyMapper;

  constructor(container: HTMLElement, properties: UserProperties = {}) {
    Style.css = getComputedStyle(container);
    Style.properties = setDefaults(properties, Style.css)
  }

  bindToCytoscape(cy: cytoscape.Core) {
    initInteractivity(cy);
  }


  getStyleSheet(): cytoscape.Stylesheet[] {
    return [
      {
        selector: "*",
        style: {
          "font-family": "Helvetica",
          "font-weight": 600,
          "z-index": 1
        }
      },
      {
        selector: 'node.Compartment',
        style: {
          "shape": "round-rectangle",
          "width": 'data(width)',
          "height": 'data(height)',

          "border-style": 'double',

          "z-index": 0,
          "z-compound-depth": "bottom",
          "overlay-opacity": 0,

          "color": this.p('compartment', 'fill'),
          "border-color": this.p('compartment', 'fill'),
          "background-color": this.p('compartment', 'fill'),
          "background-opacity": this.p('compartment', 'opacity'),
          "border-width": this.pm('global', 'thickness', t => 3 * t)
        }
      },
      {
        selector: 'node.Compartment.inner, node.Compartment.outer',
        style: {
          "border-style": 'solid',
          "border-width": this.p('global', 'thickness')
        }
      },
      {
        selector: 'node.Compartment.inner',
        style: {
          'label': 'data(displayName)',
          "text-opacity": 1,
          "text-valign": "bottom",
          "text-halign": "right",
          // @ts-ignore
          "text-margin-x": "data(textX)",
          // @ts-ignore
          "text-margin-y": "data(textY)",
        }
      },
      {
        selector: 'node.Shadow',
        style: {
          'label': 'data(displayName)',
          "font-size": 100,
          "background-opacity": 0,
          "color": 'data(color)',
          "text-outline-color": this.p('global', 'surface'),
          "text-outline-width": 10
        }
      },
      {
        selector: 'node.drug',
        style: {
          "text-max-width": (node: cytoscape.NodeSingular) => (node.width() - 44) + 'px'
        }
      }, {
        selector: 'node.PhysicalEntity, node.Pathway',
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
          "background-image": node => imageBuilder(node)["background-image"],
          // @ts-ignore
          "background-position-y": node => imageBuilder(node)["background-position-y"] || 0,
          // @ts-ignore
          "background-position-x": node => imageBuilder(node)["background-position-x"] || 0,
          // @ts-ignore
          "background-height": node => imageBuilder(node)["background-height"] || '100%',
          // @ts-ignore
          "background-width": node => imageBuilder(node)["background-width"] || '100%',
          // @ts-ignore
          "background-clip": node => imageBuilder(node)["background-clip"] || 'clipped',
          // @ts-ignore
          "background-image-containment": node => imageBuilder(node)["background-image-containment"] || 'inside',
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
        selector: 'node.Protein.drug',
        style: {
          "background-color": this.p('protein', 'drug')
        }
      }, {
        selector: 'node.GenomeEncodedEntity',
        style: {
          "shape": "round-rectangle",
          "background-color": this.p('genomeEncodedEntity', 'fill'),
        }
      }, {
        selector: 'node.GenomeEncodedEntity.drug',
        style: {
          "background-color": this.p('genomeEncodedEntity', 'drug'),
        }
      }, {
        selector: 'node.RNA',
        style: {
          "shape": "bottom-round-rectangle",
          "background-color": this.p('rna', 'fill'),
        }
      }, {
        selector: 'node.RNA.drug',
        style: {
          "background-color": this.p('rna', 'drug'),
        }
      }, {
        selector: 'node.Gene',
        style: {
          "shape": "bottom-round-rectangle",
          "background-opacity": 0,
          "background-color": this.p('gene', 'fill'),
          "bounds-expansion": this.p('gene', 'decorationExtraWidth'),
          "text-margin-y": this.pm('gene', 'decorationHeight', h => h / 2)
        }
      }, {
        selector: 'node.Molecule',
        style: {
          "background-opacity": 0,
          "shape": 'round-rectangle',
          "color": this.p("molecule", 'stroke'),
        }
      }, {
        selector: 'node.Molecule.drug',
        style: {
          "color": this.p("molecule", 'drug'),
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
        selector: 'node.EntitySet.drug',
        style: {
          "text-max-width": (node: cytoscape.NodeSingular) =>
            this.pm('global', 'thickness', t =>
              this.pm('entitySet', 'radius', r => `${node.width() - 2 * r - 6 * t - 44}px`
              )
            )
        }
      }, {
        selector: 'node.Complex',
        style: {
          "background-opacity": 0,
          "shape": "cut-rectangle",
          "text-max-width": (node: cytoscape.NodeSingular) => this.pm('global', 'thickness', t => (node.width() - t * 3) + 'px')
        }
      },
      {
        selector: 'node.Pathway',
        style: {
          "background-color": this.p('pathway', 'fill'),
          "text-max-width": (node: cytoscape.NodeSingular) =>
            this.pm('global', 'thickness', t => `${node.width() - 8 * t - 96}px`
            )
        }
      },
      {
        selector: 'node.Interacting.Pathway',
        style: {
          "shape": "rectangle",
          "border-color": this.p('pathway', 'stroke'),
          "border-width": this.pm('global', 'thickness', t => 3 * t)
        }
      },
      {
        selector: 'node.SUB.Pathway',
        style: {
          "background-opacity": 0,
          "shape": 'round-rectangle'
        }
      },


      {
        selector: 'node.reaction',
        style: {
          "width": this.pm('global', 'thickness', t => t * 6),
          "height": this.pm('global', 'thickness', t => t * 6),
          "shape": "round-rectangle",
          "text-halign": "center",
          "text-valign": "center",
          "border-width": this.p('global', 'thickness'),
          "border-color": this.p('global', 'onSurface'),
          "color": this.p('global', 'onSurface'),
          "background-color": this.p('global', 'surface'),
        }
      },
      {
        selector: 'node.reaction:selected',
        style: {
          "border-width": this.pm('global', 'thickness', t => t * 1),
          "border-color": this.p('global', 'select'),
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
          // @ts-ignore
          'source-arrow-width': '100%',
          // @ts-ignore
          'target-arrow-width': '100%',
        }
      }, {
        selector: "edge:selected",
        style: {
          "line-color": this.p('global', 'select'),
          "width": this.pm('global', 'thickness', t => t * 2),
          "arrow-scale": 1,
          "source-arrow-color": this.p('global', 'select'),
          "target-arrow-color": this.p('global', 'select'),
          // @ts-ignore
          'source-arrow-width': '50%',
          // @ts-ignore
          'target-arrow-width': '50%',
          "z-index": 2
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
          "text-background-color": this.p('global', 'surface'),
          "text-background-opacity": 1,
          "text-border-width": this.pm('global', 'thickness', t => t / 2),
          "text-border-opacity": 1,
          "text-border-color": this.p('global', 'onSurface'),
          "text-background-shape": 'roundrectangle',
          "text-background-padding": this.pm('global', 'thickness', t => t + 'px'),
        }
      }, {
        selector: 'edge[stoichiometry > 1].incoming',
        style: {
          "source-label": "data(stoichiometry)",
          "source-text-offset": 30,
        }
      }, {
        selector: 'edge[stoichiometry > 1].outgoing',
        style: {
          "target-label": "data(stoichiometry)",
          "target-text-offset": 35,
        }
      }, {
        selector: "edge[?shadow]",
        style: {
          // @ts-ignore
          "underlay-color": "data(shadow)",
          "underlay-padding": 20,
          "underlay-opacity": 0.2,
        }
      }, {
        selector: "edge[?weights]",
        style: {
          "curve-style": "unbundled-bezier",
          "control-point-distances": "data(distances)",
          "control-point-weights": "data(weights)",
          // @ts-ignore
          "edge-distances": "endpoints",
          // "edge-distances": "node-position"
        }
      }, {
        selector: "edge[?sourceEndpoint]",
        style: {
          // @ts-ignore
          "source-endpoint": "data(sourceEndpoint)",
        }
      }, {
        selector: "edge[?targetEndpoint]",
        style: {
          // @ts-ignore
          "target-endpoint": "data(targetEndpoint)",
        }
      }, {
        selector: "node.debug",
        style: {
          label: "data(id)",
          "text-outline-width": 4,
          "text-outline-color": 'black',
          "text-outline-opacity": 1,
          color: 'white'
        }
      }
    ]
  }

  update(cy: cytoscape.Core) {
    clearDrawersCache();
    cy.style(this.getStyleSheet());
  }
}





