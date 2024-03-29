import cytoscape, {NodeCollection, NodeSingular} from "cytoscape";
import {extract} from "./properties-utils";
import {Interactor} from "./model/interactor.model";
import InteractorsLayout from "./interactors-layout";
import {Properties} from "./properties";
import {ReactomeEvent, ReactomeEventTypes} from "./model/reactome-event.model";


export class Interactivity {
  constructor(private cy: cytoscape.Core, private properties: Properties) {
    // @ts-ignore
    cy.elements().ungrabify().panify();
    this.initHover(cy);
    this.initSelect(cy);
    this.initZoom(cy);
    this.addInteractors(cy)
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
      .on('mouseover', 'node.PhysicalEntity', e => container.dispatchEvent(new ReactomeEvent(ReactomeEventTypes.hover, {element: e.target, type: "PhysicalEntity", reactomeId: e.target.data('reactomeId'), cy})))
      .on('mouseover', 'node.Pathway', e => container.dispatchEvent(new ReactomeEvent(ReactomeEventTypes.hover, {element: e.target, type: "Pathway", reactomeId: e.target.data('reactomeId'), cy})))
      .on('mouseover', 'node.reaction', e => container.dispatchEvent(new ReactomeEvent(ReactomeEventTypes.hover, {element: this.expandReaction(e.target), type: "reaction", reactomeId: e.target.data('reactomeId'), cy})))
      .on('mouseover', 'edge.reaction', e => container.dispatchEvent(new ReactomeEvent(ReactomeEventTypes.hover, {element: this.expandReaction(e.target.connectedNodes('.reaction')), type: "reaction", reactomeId: e.target.data('reactomeId'), cy})))

      .on('mouseout', 'node.PhysicalEntity', e => container.dispatchEvent(new ReactomeEvent(ReactomeEventTypes.leave, {element: e.target, type: "PhysicalEntity", reactomeId: e.target.data('reactomeId'), cy})))
      .on('mouseout', 'node.Pathway', e => container.dispatchEvent(new ReactomeEvent(ReactomeEventTypes.leave, {element: e.target, type: "Pathway", reactomeId: e.target.data('reactomeId'), cy})))
      .on('mouseout', 'node.reaction', e => container.dispatchEvent(new ReactomeEvent(ReactomeEventTypes.leave, {element: this.expandReaction(e.target), type: "reaction", reactomeId: e.target.data('reactomeId'), cy})))
      .on('mouseout', 'edge.reaction', e => container.dispatchEvent(new ReactomeEvent(ReactomeEventTypes.leave, {element: this.expandReaction(e.target.connectedNodes('.reaction')), type: "reaction", reactomeId: e.target.data('reactomeId'), cy})))

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

  }

  initSelect(cy: cytoscape.Core, mapper = <X >(x: X) => x) {
    const selectReaction = this.applyToReaction(col => col.select(), 'selecting')

    const container = cy.container()!;

    cy
      .on('select', 'node.PhysicalEntity', e => container.dispatchEvent(new ReactomeEvent(ReactomeEventTypes.select, {element: e.target, type: "PhysicalEntity", reactomeId: e.target.data('reactomeId'), cy})))
      .on('select', 'node.Pathway', e => container.dispatchEvent(new ReactomeEvent(ReactomeEventTypes.select, {element: e.target, type: "Pathway", reactomeId: e.target.data('reactomeId'), cy})))
      .on('select', 'node.reaction', e => container.dispatchEvent(new ReactomeEvent(ReactomeEventTypes.select, {element: this.expandReaction(e.target), type: "reaction", reactomeId: e.target.data('reactomeId'), cy})))
      .on('select', 'edge.reaction', e => container.dispatchEvent(new ReactomeEvent(ReactomeEventTypes.select, {element: this.expandReaction(e.target.connectedNodes('.reaction')), type: "reaction", reactomeId: e.target.data('reactomeId'), cy})))

      .on('unselect', 'node.PhysicalEntity', e => container.dispatchEvent(new ReactomeEvent(ReactomeEventTypes.unselect, {element: e.target, type: "PhysicalEntity", reactomeId: e.target.data('reactomeId'), cy})))
      .on('unselect', 'node.Pathway', e => container.dispatchEvent(new ReactomeEvent(ReactomeEventTypes.unselect, {element: e.target, type: "Pathway", reactomeId: e.target.data('reactomeId'), cy})))
      .on('unselect', 'node.reaction', e => container.dispatchEvent(new ReactomeEvent(ReactomeEventTypes.unselect, {element: this.expandReaction(e.target), type: "reaction", reactomeId: e.target.data('reactomeId'), cy})))
      .on('unselect', 'edge.reaction', e => container.dispatchEvent(new ReactomeEvent(ReactomeEventTypes.unselect, {element: this.expandReaction(e.target.connectedNodes('.reaction')), type: "reaction", reactomeId: e.target.data('reactomeId'), cy})))

      .on('select', 'edge', e => selectReaction(mapper(e.target).connectedNodes('.reaction')))
      .on('unselect', 'edge', e => selectReaction(
        mapper(cy.edges(':selected').connectedNodes('.reaction')
          .add(cy.nodes('.reaction:selected')))
      )) // Avoid single element selection when double-clicking

      .on('select', 'node.reaction', event => selectReaction(mapper(event.target)))
      .on('select', 'node.Modification', e => mapper(cy.nodes(`#${e.target.data('nodeId')}`)).select())

      .on('select', '.Interactor', e => {
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

  addInteractors(cy: cytoscape.Core) {
    const clickedNodes: { [key: string]: { resource: string, count: number } } = {};

    cy.on('click', '.InteractorOccurrences', event => {
      const targetNode = event.target;
      const interactorsData = targetNode.data('interactors');
      const resource = targetNode.data('resource')
      const numberToAdd = InteractorsLayout.getNumberOfInteractorsToDraw(interactorsData)
      const [dynamicInteractors, existingInteractors] = this.getInteractors(interactorsData, cy, numberToAdd);
      const allNodes: Interactor[] = [...dynamicInteractors, ...existingInteractors];

      this.addInteractorNodes(dynamicInteractors, targetNode, cy, numberToAdd, resource);
      this.addInteractorEdges(allNodes, targetNode, cy, resource);

      const interactorsToDisplay = cy.nodes(`[source = '${targetNode.id()}']`);
      this.displayInteractors(interactorsToDisplay, targetNode, cy, clickedNodes)
    });
  }

  displayInteractors(interactorsToDisplay: NodeCollection, targetNode: NodeSingular, cy: cytoscape.Core, clickedNodes: {
    [key: string]: { resource: string, count: number }
  }) {

    const layoutOptions = {
      name: 'preset',
      fit: false
    }

    // todo: better way to handle this
    /**
     *  A toggle behavior for displaying and removing interactor nodes associated with interactor occurrence node
     *  base on whether a node has been clicked before, tracking click counts and node resources in the process.
     */
    if (clickedNodes[targetNode.id()]) {
      //check if the node has been clicked before
      const nodeData = clickedNodes[targetNode.id()];
      //same resource
      if (nodeData.resource === targetNode.data('resource')) {
        const evenClick = nodeData.count % 2 === 0;
        //even click count, display data, odd click count, remove data
        evenClick ? interactorsToDisplay.layout(layoutOptions).run() : (interactorsToDisplay.remove(), this.removeInteractorEdges(targetNode, cy));
        nodeData.count++;
      } else {
        //different resource, treat it as a first click
        interactorsToDisplay.layout(layoutOptions).run();
        clickedNodes[targetNode.id()] = {resource: targetNode.data('resource'), count: 1};
      }
    } else {
      //first click on this node
      interactorsToDisplay.layout(layoutOptions).run();
      clickedNodes[targetNode.id()] = {resource: targetNode.data('resource'), count: 1};
    }
  }

  readonly DEFAULT_INTERACTOR_WIDTH = 100;
  readonly DEFAULT_DISGENET_WIDTH = 120
  readonly INTERACTOR_PADDING = 20;
  readonly CHAR_WIDTH = 10;
  readonly CHAR_HEIGHT = 12;
  readonly INTACT = "IntAct";

  addInteractorNodes(interactorsData: Interactor[], targetNode: NodeSingular, cy: cytoscape.Core, numberToAdd: number, resource: string) {
    const interactorNodes: cytoscape.NodeDefinition[] = [];
    const interactorLayout = new InteractorsLayout();
    // todo :
    const resourceClass = resource === this.INTACT ? ['Protein', 'PhysicalEntity', 'Interactor'] : ['PhysicalEntity', 'Interactor', 'DiseaseInteractor'];

    interactorsData.forEach((interactor: Interactor, index: number) => {
      const position = interactorLayout.getPosition(targetNode, index, numberToAdd)
      const displayName = interactor.alias ? interactor.alias : interactor.acc;
      interactorNodes.push({
        data: {
          id: interactor.acc + '-' + targetNode.data('entity').id(),
          displayName: displayName,
          width: resource === this.INTACT ? this.DEFAULT_INTERACTOR_WIDTH : this.DEFAULT_DISGENET_WIDTH,
          // width: Math.max(displayName.length * this.CHAR_WIDTH + 2 * this.INTERACTOR_PADDING, this.DEFAULT_INTERACTOR_WIDTH),
          height: this.CHAR_HEIGHT + 2 * this.INTERACTOR_PADDING,
          source: targetNode.id(),
          accURL: interactor.accURL,
          score: interactor.score,
          evidences: interactor.evidences,
          evidenceURLs: interactor.evidencesURL,
          resource: resource
        },
        //todo: provide shape base on interactor type: Gene, RNA, Protein, Molecule
        classes: resourceClass,
        position: position
      })
    })
    cy?.add(interactorNodes)
  }

  addInteractorEdges(interactorsData: Interactor[], targetNode: NodeSingular, cy: cytoscape.Core | undefined, resource: string) {

    const resourceClass = resource === this.INTACT ? ['Interactor'] : ['Interactor', 'Disease'];

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
          evidenceURLs: interactor.evidencesURL,
          resource: resource
        },
        classes: resourceClass
      })
    })
    cy?.add(interactorEdges)
  }


  getInteractors(interactorsData: Interactor[], cy: cytoscape.Core, numberToAdd: number) {
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


  removeInteractorEdges(targetNode: cytoscape.NodeSingular, cy: cytoscape.Core) {
    const edgesToRemove = cy.edges(`[edgeToTarget = '${targetNode.id()}']`);
    edgesToRemove.remove();
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



