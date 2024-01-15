import cytoscape from "cytoscape";
import {extract} from "./properties-utils";
import {Style} from "./style";

export function initInteractivity(cy: cytoscape.Core) {
  // @ts-ignore
  cy.elements().ungrabify().panify();
  initHover(cy);
  initSelect(cy);
  initZoom(cy);
}

interface State {
  [k: string]: boolean
}

const state: State = {
  selecting: false,
  hovering: false,
  deHovering: false
}

const applyReaction = (action: (col: cytoscape.Collection) => void, stateKey: keyof State) => (reactionNode: cytoscape.NodeCollection) => {
  if (state[stateKey]) return;
  state[stateKey] = true;
  action(reactionNode.connectedEdges().add(reactionNode));
  state[stateKey] = false;
};

function initHover(cy: cytoscape.Core) {
  const hoverReaction = applyReaction(col => col.addClass('hover'), 'hovering')
  const deHoverReaction = applyReaction(col => col.removeClass('hover'), 'deHovering')

  cy.nodes()
    .on('mouseover', e => e.target.addClass('hover'))
    .on('mouseout', e => e.target.removeClass('hover'))
    .nodes('.reaction')
    .on('mouseover', e => hoverReaction(e.target))
    .on('mouseout', e => deHoverReaction(e.target))

  cy.nodes('.Modification')
    .on('mouseover', e => cy.nodes(`#${e.target.data('nodeId')}`).addClass('hover'))
    .on('mouseout', e => cy.nodes(`#${e.target.data('nodeId')}`).removeClass('hover'))

  cy.edges()
    .on('mouseover', e => hoverReaction(e.target.connectedNodes('.reaction')))
    .on('mouseout', e => deHoverReaction(e.target.connectedNodes('.reaction')))
}

function initSelect(cy: cytoscape.Core) {
  const selectReaction = applyReaction(col => col.select(), 'selecting')

  cy.edges()
    .on('select', event => selectReaction(event.target.connectedNodes('.reaction')))
    .on('unselect', event => selectReaction(
      cy.edges(':selected').connectedNodes('.reaction')
        .add(cy.nodes('.reaction:selected')))
    )
  cy.nodes('.reaction')
    .on('select', event => selectReaction(event.target))
  cy.nodes('.Modification')
    .on('select', e => cy.nodes(`#${e.target.data('nodeId')}`).select())
}

export let onZoom: (e?: cytoscape.EventObjectCore) => void;

function initZoom(cy: cytoscape.Core) {
  const shadows = cy.edges('[?pathway]');
  const shadowLabels = cy.nodes('.Shadow');
  cy.minZoom(Math.min(cy.zoom(), extract(Style.properties.shadow.labelOpacity)[0][0]));
  cy.maxZoom(15);

  onZoom = e => {
    const zoomLevel = cy.zoom();
    shadows.stop().animate({
      style: {
        'underlay-opacity': interpolate(zoomLevel, extract(Style.properties.shadow.opacity).map(v => p(...v)))
      }
    });
    shadowLabels.stop().animate({
      style: {
        'text-opacity': interpolate(zoomLevel, extract(Style.properties.shadow.labelOpacity).map(v => p(...v)))
      }
    });
  }

  cy.on('zoom', onZoom);
}

function p(x: number, y: number): P {
  return new P(x, y)
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

function interpolate(x: number, points: P[]): number {
  if (x < points.at(0)!.x) return points.at(0)!.y;
  if (x > points.at(-1)!.x) return points.at(-1)!.y;
  for (let i = 0; i + 1 < points.length; i++) {
    let y = lerp(x, points[i], points[i + 1])
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
function lerp(x: number, p0: P, p1: P): number | undefined {
  if (x < p0.x || x > p1.x) return undefined;
  return (p0.y * (p1.x - x) + p1.y * (x - p0.x)) / (p1.x - p0.x);
}

