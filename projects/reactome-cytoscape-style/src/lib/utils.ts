import {NodeDefinition} from "./types";

export const NODE_TYPE_MAP = new Map<string, NodeDefinition>([
    ['Gene', ['Gene', 'PhysicalEntity']],
    ['RNA', ['RNA', 'PhysicalEntity']],
    ['Protein', ['Protein', 'PhysicalEntity']],
    ['Entity', ['GenomeEncodedEntity', 'PhysicalEntity']],
    ['Complex', ['Complex', 'PhysicalEntity']],
    ['EntitySet', ['EntitySet', 'PhysicalEntity']],
    ['Chemical', ['Molecule', 'PhysicalEntity']],
  ]
)
