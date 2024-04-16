import cytoscape from "cytoscape";

export interface ReactomeEventTarget {
  reactomeId: string,
  type: 'PhysicalEntity' | 'Pathway' | 'reaction' | 'Interactor',
  element: cytoscape.NodeSingular,
  cy: cytoscape.Core
}

export enum ReactomeEventTypes {
  hover = 'reactome::hover',
  leave = 'reactome::leave',

  select = 'reactome::select',
  unselect = 'reactome::unselect'
}

export class ReactomeEvent extends CustomEvent<ReactomeEventTarget> {
  constructor(type: ReactomeEventTypes, target: ReactomeEventTarget) {
    super(type, {detail: target});
  }

}
