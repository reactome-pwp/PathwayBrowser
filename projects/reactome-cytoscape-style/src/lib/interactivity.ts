import cytoscape, {NodeSingular} from "cytoscape";
import {extract} from "./properties-utils";
import {Style} from "./style";
import {Interactor} from "./model/interactor.model";
import InteractorsLayout from "./interactors-layout";


export function initInteractivity(cy: cytoscape.Core) {
  // @ts-ignore
  cy.elements().ungrabify().panify();
  initHover(cy);
  initSelect(cy);
  initZoom(cy);
  showInteractors(cy)
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

  cy.on('mouseover mouseout', '.InteractorOccurrences', event => {
    event.target.toggleClass('hover', event.type === 'mouseover')
  });

  cy.on('mouseover mouseout', '.Interactor', event => {
    event.target.toggleClass('hover', event.type === 'mouseover')
  })

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

  cy.on('select unselect', '.InteractorOccurrences', event =>{
    event.target.toggleClass('select', event.type === 'select')
  })

  cy.on('select', '.Interactor', event => {
    const prop = event.target.isNode() ? 'accURL' : 'evidenceURLs';
    const url = event.target.data(prop);
    if (url) {
      window.open(url);
      event.target.unselect();
    }
  });

}

export let onZoom: (e?: cytoscape.EventObjectCore) => void;

function initZoom(cy: cytoscape.Core) {
  const shadows = cy.edges('[?pathway]');
  const shadowLabels = cy.nodes('.Shadow');
  cy.minZoom(Math.min(cy.zoom(), extract(Style.properties.shadow.labelOpacity)[0][0] / 100));
  cy.maxZoom(15);

  onZoom = e => {
    const zoomLevel = cy.zoom();
    shadows.stop().animate({
      style: {
        'underlay-opacity': interpolate(zoomLevel * 100, extract(Style.properties.shadow.opacity).map(v => p(...v))) / 100
      }
    });
    shadowLabels.stop().animate({
      style: {
        'text-opacity': interpolate(zoomLevel * 100, extract(Style.properties.shadow.labelOpacity).map(v => p(...v))) / 100
      }
    });
  }

  cy.on('zoom', onZoom);
}

function showInteractors(cy: cytoscape.Core) {
  const clickedNodes: { [key: string]: number } = {};
  cy.on('click', '.InteractorOccurrences', event => {
    const targetNode = event.target;
    const interactorsData = targetNode.data('interactors');

    const numberToAdd = InteractorsLayout.getNumberOfInteractorsToDraw(interactorsData)
    const [dynamicInteractors, existingInteractors] = getInteractors(interactorsData, cy, numberToAdd);
    const allNodes: Interactor[] = [...dynamicInteractors, ...existingInteractors];

    addInteractorNodes(dynamicInteractors, targetNode, cy, numberToAdd);
    addInteractorEdges(allNodes, targetNode, cy);

    const interactorsToDisplay = cy.nodes(`[source = '${targetNode.id()}']`);
    const layoutOptions = {
      name: 'preset',
      fit: false
    }

    if (clickedNodes[targetNode.id()]) {
      // this node has been clicked before
      interactorsToDisplay.remove();
      removeInteractorEdges(targetNode, cy)
      clickedNodes[targetNode.id()] = 0;
    } else {
      // first click on this node
      interactorsToDisplay.layout(layoutOptions).run();
      clickedNodes[targetNode.id()] = 1;
    }
  });
}

const DEFAULT_INTERACTOR_WIDTH = 100;
const INTERACTOR_PADDING = 20;
const CHAR_WIDTH = 10;
const CHAR_HEIGHT = 12;

function addInteractorNodes(interactorsData: Interactor[], targetNode: NodeSingular, cy: cytoscape.Core, numberToAdd: number) {
  const interactorNodes: cytoscape.NodeDefinition[] = [];
  const interactorLayout = new InteractorsLayout();

  interactorsData.forEach((interactor: Interactor, index: number) => {
    const position = interactorLayout.getPosition(targetNode, index, numberToAdd)
    const displayName = interactor.alias ? interactor.alias : interactor.acc;
    interactorNodes.push({
      data: {
        id: interactor.acc + '-' + targetNode.data('entity').id(),
        displayName: displayName,
        width: DEFAULT_INTERACTOR_WIDTH,
        // width: Math.max(displayName.length * CHAR_WIDTH + 2 * INTERACTOR_PADDING, DEFAULT_INTERACTOR_WIDTH),
        height: CHAR_HEIGHT + 2 * INTERACTOR_PADDING,
        source: targetNode.id(),
        accURL: interactor.accURL,
        score: interactor.score,
        evidences: interactor.evidences,
        evidenceURLs: interactor.evidencesURL,
      },
      //todo: provide shape base on interactor type: Gene, RNA, Protein, Molecule
      classes: ['Complex', 'PhysicalEntity', 'Interactor'],
      position: position
    })
  })
  cy?.add(interactorNodes)
}

function addInteractorEdges(interactorsData: Interactor[], targetNode: NodeSingular, cy: cytoscape.Core | undefined) {
  const interactorEdges: cytoscape.EdgeDefinition[] = [];
  interactorsData.forEach((interactor: Interactor) => {
    const diagramNodes = cy?.nodes(`[acc = '${interactor.acc}']`);
    const accToEntityNode = new Map<string, NodeSingular>(diagramNodes?.map(node => [node.data('acc'), node]));
    const targetNodeId = accToEntityNode.get(interactor.acc) ? accToEntityNode.get(interactor.acc)?.data('id') : interactor.acc + '-' + targetNode.data('entity').id();
    interactorEdges.push({
      data: {
        id: interactor.acc + '---' + targetNode.data('entity').id(),
        source: targetNode.data('entity').id(),
        target: targetNodeId,
        edgeToTarget: targetNode.id(),
        evidenceURLs: interactor.evidencesURL
      },
      classes: ['Interactor']
    })
  })
  cy?.add(interactorEdges)
}


function getInteractors(interactorsData: Interactor[], cy: cytoscape.Core, numberToAdd: number) {
  const dynamicInteractors = [];
  const existingInteractors = [];
  let currentSize = 0;
  // get interactors to draw with a provided a number, collect existing interactors for creating edge
  for (const interactor of interactorsData) {
    const diagramNodes = cy?.nodes(`[acc = '${interactor.acc}']`);
    const accToEntityNode = new Map(diagramNodes?.map(node => [node.data('acc'), node]));

    if (interactor.acc !== accToEntityNode.get(interactor.acc)?.data('graph').identifier) {
      dynamicInteractors.push(interactor);
      currentSize++;
      if (currentSize === numberToAdd) break;
    } else {
      existingInteractors.push(interactor);
    }
  }
  return [dynamicInteractors, existingInteractors];
}


function removeInteractorEdges(targetNode: cytoscape.NodeSingular, cy: cytoscape.Core) {
  const edgesToRemove = cy.edges(`[edgeToTarget = '${targetNode.id()}']`);
  edgesToRemove.remove();
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

