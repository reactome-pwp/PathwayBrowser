import cytoscape from "cytoscape";
import {extract} from "./properties-utils";
import {Properties} from "./properties";
import {ReactomeEvent, ReactomeEventTypes} from "./model/reactome-event.model";


export class Interactivity {
  constructor(private cy: cytoscape.Core, private properties: Properties) {
    // @ts-ignore
    cy.elements().ungrabify().panify();
    this.initHover(cy);
    this.initSelect(cy);
    this.initZoom(cy);
  }

  expandReaction(reactionNode: cytoscape.NodeCollection) {
    return reactionNode.connectedEdges().add(reactionNode);
  }

  applyToReaction = (action: (col: cytoscape.Collection) => void, stateKey: keyof State) => (reactionNode: cytoscape.NodeCollection) => {
    if (state[stateKey]) return;
    state[stateKey] = true;
    action(this.expandReaction(reactionNode));
    state[stateKey] = false;
  };

  initHover(cy: cytoscape.Core, mapper = <X>(x: X) => x) {
    const hoverReaction = this.applyToReaction(col => col.addClass('hover'), 'hovering')
    const deHoverReaction = this.applyToReaction(col => col.removeClass('hover'), 'deHovering')


    const container = cy.container()!;
    cy
      .on('mouseover', 'node.PhysicalEntity', e => container.dispatchEvent(new ReactomeEvent(ReactomeEventTypes.hover, {
        element: e.target,
        type: "PhysicalEntity",
        reactomeId: e.target.data('reactomeId'),
        cy
      })))
      .on('mouseover', 'node.Pathway', e => container.dispatchEvent(new ReactomeEvent(ReactomeEventTypes.hover, {
        element: e.target,
        type: "Pathway",
        reactomeId: e.target.data('reactomeId'),
        cy
      })))
      .on('mouseover', 'node.reaction', e => container.dispatchEvent(new ReactomeEvent(ReactomeEventTypes.hover, {
        element: e.target,
        type: "reaction",
        reactomeId: e.target.data('reactomeId'),
        cy
      })))
      .on('mouseover', 'edge.reaction', e => container.dispatchEvent(new ReactomeEvent(ReactomeEventTypes.hover, {
        element: e.target.connectedNodes('.reaction'),
        type: "reaction",
        reactomeId: e.target.data('reactomeId'),
        cy
      })))

      .on('mouseout', 'node.PhysicalEntity', e => container.dispatchEvent(new ReactomeEvent(ReactomeEventTypes.leave, {
        element: e.target,
        type: "PhysicalEntity",
        reactomeId: e.target.data('reactomeId'),
        cy
      })))
      .on('mouseout', 'node.Pathway', e => container.dispatchEvent(new ReactomeEvent(ReactomeEventTypes.leave, {
        element: e.target,
        type: "Pathway",
        reactomeId: e.target.data('reactomeId'),
        cy
      })))
      .on('mouseout', 'node.reaction', e => container.dispatchEvent(new ReactomeEvent(ReactomeEventTypes.leave, {
        element: e.target,
        type: "reaction",
        reactomeId: e.target.data('reactomeId'),
        cy
      })))
      .on('mouseout', 'edge.reaction', e => container.dispatchEvent(new ReactomeEvent(ReactomeEventTypes.leave, {
        element: e.target.connectedNodes('.reaction'),
        type: "reaction",
        reactomeId: e.target.data('reactomeId'),
        cy
      })))

      .on('mouseover', 'node', e => mapper(e.target).addClass('hover'))
      .on('mouseout', 'node', e => mapper(e.target).removeClass('hover'))

      .on('mouseover', 'node.reaction', e => hoverReaction(mapper(e.target)))
      .on('mouseout', 'node.reaction', e => deHoverReaction(mapper(e.target)))

      .on('mouseover', 'edge', e => {
        const mapped = mapper(e.target);
        if (mapped !== e.target) console.log(mapped, mapped.connectedNodes('.reaction'))

        hoverReaction(mapped.connectedNodes('.reaction'))
      })
      .on('mouseout', 'edge', e => deHoverReaction(mapper(e.target).connectedNodes('.reaction')))

      .on('mouseover', 'node.Modification', e => mapper(cy.nodes(`#${e.target.data('nodeId')}`)).addClass('hover'))
      .on('mouseout', 'node.Modification', e => mapper(cy.nodes(`#${e.target.data('nodeId')}`)).removeClass('hover'))

      .on('mouseover', 'edge.Interactor', e => mapper(cy.edges(`#${e.target.data('id')}`)).addClass('hover'))
      .on('mouseout', 'edge.Interactor', e => mapper(cy.edges(`#${e.target.data('id')}`)).removeClass('hover'))
  }

  initSelect(cy: cytoscape.Core, mapper = <X>(x: X) => x) {
    const selectReaction = this.applyToReaction(col => col.select(), 'selecting')
    const container = cy.container()!;

    cy
      .on('select', 'node.PhysicalEntity', e => container.dispatchEvent(new ReactomeEvent(ReactomeEventTypes.select, {
        element: e.target,
        type: "PhysicalEntity",
        reactomeId: e.target.data('reactomeId'),
        cy
      })))
      .on('select', 'node.Pathway', e => container.dispatchEvent(new ReactomeEvent(ReactomeEventTypes.select, {
        element: e.target,
        type: "Pathway",
        reactomeId: e.target.data('reactomeId'),
        cy
      })))
      .on('select', 'node.reaction', e => container.dispatchEvent(new ReactomeEvent(ReactomeEventTypes.select, {
        element: e.target,
        type: "reaction",
        reactomeId: e.target.data('reactomeId'),
        cy
      })))
      .on('select', 'edge.reaction', e => container.dispatchEvent(new ReactomeEvent(ReactomeEventTypes.select, {
        element: e.target.connectedNodes('.reaction'),
        type: "reaction",
        reactomeId: e.target.data('reactomeId'),
        cy
      })))

      .on('click', 'node.InteractorOccurrences', e => {
        const openClass = 'opened';
        e.target.toggleClass(openClass);
        let eventType = !e.target.hasClass(openClass) ? ReactomeEventTypes.open : ReactomeEventTypes.close;
        container.dispatchEvent(new ReactomeEvent(eventType, {
          element: e.target,
          type: "Interactor",
          reactomeId: e.target.data('reactomeId'),
          cy
        }))
      })

      .on('unselect', 'node.PhysicalEntity', e => container.dispatchEvent(new ReactomeEvent(ReactomeEventTypes.unselect, {
        element: e.target,
        type: "PhysicalEntity",
        reactomeId: e.target.data('reactomeId'),
        cy
      })))
      .on('unselect', 'node.Pathway', e => container.dispatchEvent(new ReactomeEvent(ReactomeEventTypes.unselect, {
        element: e.target,
        type: "Pathway",
        reactomeId: e.target.data('reactomeId'),
        cy
      })))
      .on('unselect', 'node.reaction', e => container.dispatchEvent(new ReactomeEvent(ReactomeEventTypes.unselect, {
        element: e.target,
        type: "reaction",
        reactomeId: e.target.data('reactomeId'),
        cy
      })))
      .on('unselect', 'edge.reaction', e => container.dispatchEvent(new ReactomeEvent(ReactomeEventTypes.unselect, {
        element: e.target.connectedNodes('.reaction'),
        type: "reaction",
        reactomeId: e.target.data('reactomeId'),
        cy
      })))

      .on('select', 'edge', e => selectReaction(mapper(e.target).connectedNodes('.reaction')))
      .on('unselect', 'edge', e => selectReaction(
        mapper(cy.edges(':selected').connectedNodes('.reaction')
          .add(cy.nodes('.reaction:selected')))
      )) // Avoid single element selection when double-clicking

      .on('select', 'node.reaction', event => selectReaction(mapper(event.target)))
      .on('select', 'node.Modification', e => mapper(cy.nodes(`#${e.target.data('nodeId')}`)).select())

      .on('click', '.Interactor', e => {
        const prop = e.target.isNode() ? 'accURL' : 'evidenceURLs';
        const url = e.target.data(prop);
        if (url) window.open(url);
      });

  }

  onZoom!: (e?: cytoscape.EventObjectCore) => void;

  initZoom(cy: cytoscape.Core) {
    const shadows = cy.edges('[?pathway]');
    const shadowLabels = cy.nodes('.Shadow');
    const trivial = cy.elements('.trivial');
    cy.minZoom(Math.min(cy.zoom(), extract(this.properties.shadow.labelOpacity)[0][0] / 100));
    cy.maxZoom(15);

    this.onZoom = e => {
      const zoomLevel = cy.zoom();
      const shadowLabelOpacity = this.interpolate(zoomLevel * 100, extract(this.properties.shadow.labelOpacity).map(v => this.p(...v))) / 100;
      const trivialOpacity = this.interpolate(zoomLevel * 100, extract(this.properties.trivial.opacity).map(v => this.p(...v))) / 100;
      const shadowOpacity = this.interpolate(zoomLevel * 100, extract(this.properties.shadow.opacity).map(v => this.p(...v))) / 100;

      shadows.style({
        'underlay-opacity': shadowOpacity
      });
      shadowLabels.style({
        'text-opacity': shadowLabelOpacity
      });
      trivial.style({
        'opacity': trivialOpacity,
        'underlay-opacity': Math.min(shadowOpacity, trivialOpacity)
      });
    }

    cy.on('zoom', this.onZoom);
  }

  p(x: number, y: number): P {
    return new P(x, y)
  }

  interpolate(x: number, points: P[]): number {
    if (x < points.at(0)!.x) return points.at(0)!.y;
    if (x > points.at(-1)!.x) return points.at(-1)!.y;
    for (let i = 0; i + 1 < points.length; i++) {
      let y = this.lerp(x, points[i], points[i + 1])
      if (y) return y;
    }
    console.assert(false, "Should not arrive here")
    return 0;
  }

  /**
   * Linear interpolation as described in https://en.wikipedia.org/wiki/Linear_interpolation
   * @param x : number number to determine corresponding value
   * @param p0 : P lower bound point for the linear interpolation
   * @param p1 : P upper bound point for the linear interpolation
   */
  lerp(x: number, p0: P, p1: P): number | undefined {
    if (x < p0.x || x > p1.x) return undefined;
    return (p0.y * (p1.x - x) + p1.y * (x - p0.x)) / (p1.x - p0.x);
  }
}

interface State {
  [k: string]: boolean
}

const state: State = {
  selecting: false,
  hovering: false,
  deHovering: false
}

class P extends Array<number> {
  constructor(x: number, y: number) {
    super(x, y);
  }

  get x() {
    return this[0]
  }

  get y() {
    return this[1]
  }
}



