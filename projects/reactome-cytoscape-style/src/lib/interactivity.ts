import cytoscape from "cytoscape";

export function initInteractivity(cy: cytoscape.Core) {
  initHover(cy);
  initSelect(cy);
  initZoom(cy);
}

function initHover(cy: cytoscape.Core) {
  cy.on('mouseover', e => {
    if (e.target.addClass) e.target.addClass('hover')
  });
  cy.on('mouseout', e => {
    if (e.target.removeClass) e.target?.removeClass('hover')
  });
}

function initSelect(cy: cytoscape.Core) {
  let selecting = false
  const selectReaction = (reactionNode: cytoscape.NodeCollection) => {
    if (selecting) return;
    selecting = true;
    const toSelect = reactionNode.connectedEdges().add(reactionNode);
    toSelect.select();
    selecting = false;
  };

  cy.edges()
    .on('select', event => selectReaction(event.target.connectedNodes('.reaction')))
    .on('unselect', event => selectReaction(
      cy.edges(':selected').connectedNodes('.reaction')
        .add(cy.nodes('.reaction:selected')))
    )
  cy.nodes('.reaction')
    .on('select', event => selectReaction(event.target))
}

function initZoom(cy: cytoscape.Core) {
  const shadows = cy.edges('[?shadow]');
  const shadowLabels = cy.nodes('.Shadow');

  cy.on('zoom', e => {
    const zoomLevel = cy.zoom();
    shadows.stop().animate({
      style: {
        'underlay-opacity': interpolate(zoomLevel, [
          p(0.2, 1),
          p(0.4, 0)
        ])
      }
    });
    shadowLabels.stop().animate({
      style: {
        'text-opacity': interpolate(zoomLevel, [
          p(0.2, 1),
          p(0.4, 0)
        ])
      }
    });
  });
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

