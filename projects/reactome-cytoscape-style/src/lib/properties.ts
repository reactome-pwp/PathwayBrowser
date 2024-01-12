import {defaultable, extract, PropertiesType, Property} from "./properties-utils";

export interface Properties extends PropertiesType {
  global: {
    thickness: Property<number>
    surface: Property<string>
    onSurface: Property<string>
    primary: Property<string>
    onPrimary: Property<string>
    positive: Property<string>
    negative: Property<string>
    selectNode: Property<string>
    selectEdge: Property<string>
    hoverNode: Property<string>
    hoverEdge: Property<string>
  },
  compartment: {
    fill: Property<string>
    opacity: Property<number>
  }
  shadow: {
    opacity: Property<[number, number][]>
    labelOpacity: Property<[number, number][]>
  }
  protein: {
    fill: Property<string>
    drug: Property<string>
    radius: Property<number>
  }
  genomeEncodedEntity: {
    fill: Property<string>
    stroke: Property<string>
    drug: Property<string>
    radius: Property<number>
  }
  rna: {
    fill: Property<string>
    drug: Property<string>
    radius: Property<number>
  }
  gene: {
    fill: Property<string>
    decorationHeight: Property<number>
    decorationExtraWidth: Property<number>
    arrowHeadSize: Property<number>
    borderRadius: Property<number>
    arrowRadius: Property<number>
  }
  molecule: {
    fill: Property<string>
    stroke: Property<string>
    drug: Property<string>
  }
  entitySet: {
    fill: Property<string>
    stroke: Property<string>
    drug: Property<string>
    radius: Property<number>
  }
  complex: {
    fill: Property<string>
    stroke: Property<string>
    drug: Property<string>
    cut: Property<number>
  }
  //interacting pathway and sub pathway
  pathway: {
    fill: Property<string>
    stroke: Property<string>
    disease: Property<string>
  }
  modification: {
    fill: Property<string>
  }
}

export function setDefaults(properties: UserProperties = {}, css: CSSStyleDeclaration) {
  const global: Properties['global'] = defaultable(properties.global || {})
    .setDefault('thickness', 4)
    .setDefault('surface', () => css.getPropertyValue('--surface') || '#F6FEFF')
    .setDefault('onSurface', () => css.getPropertyValue('--on-surface') || '#001F24')
    .setDefault('primary', () => css.getPropertyValue('--primary') || '#006782')
    .setDefault('onPrimary', () => css.getPropertyValue('--on-primary') || '#FFFFFF')
    .setDefault('positive', () => css.getPropertyValue('--positive') || '#0C9509')
    .setDefault('negative', () => css.getPropertyValue('--negative') || '#BA1A1A')
    .setDefault('selectNode', () => css.getPropertyValue('--select-node') || '#6EB3E4')
    .setDefault('selectEdge', () => css.getPropertyValue('--select-edge') || '#0561A6')
    .setDefault('hoverNode', () => css.getPropertyValue('--hover-node') || '#78E076')
    .setDefault('hoverEdge', () => css.getPropertyValue('--hover-edge') || '#04B601')

  const compartment: Properties['compartment'] = defaultable(properties.compartment || {})
    .setDefault('opacity', 0.06)
    .setDefault('fill', () => css.getPropertyValue('--compartment') || '#E5834A')

  const shadow: Properties['shadow'] = defaultable(properties.shadow || {})
    .setDefault('opacity', [[0.2, 0.2], [0.4, 0]])
    .setDefault('labelOpacity', [[0.2, 1], [0.4, 0]])

  const protein: Properties['protein'] = defaultable(properties.protein || {})
    .setDefault('fill', () => css.getPropertyValue('--primary-contrast-1') || '#001F29')
    .setDefault('drug', () => css.getPropertyValue('--drug-contrast-1') || '#3E001D')
    .setDefault('radius', 8)

  const genomeEncodedEntity: Properties['genomeEncodedEntity'] = defaultable(properties.genomeEncodedEntity || {})
    .setDefault('fill', () => extract(protein.fill))
    .setDefault('stroke', () => extract(global.primary))
    .setDefault('drug', () => extract(protein.drug))
    .setDefault('radius', 8)

  const rna: Properties['rna'] = defaultable(properties.rna || {})
    .setDefault('fill', () => css.getPropertyValue('--primary-contrast-2') || '#003545')
    .setDefault('drug', () => css.getPropertyValue('--drug-contrast-2') || '#610B33')
    .setDefault('radius', 8)

  const gene: Properties['gene'] = defaultable(properties.gene || {})
    .setDefault('decorationHeight', 20)
    .setDefault('decorationExtraWidth', 17)
    .setDefault("arrowHeadSize", 10)
    .setDefault("borderRadius", 8)
    .setDefault("arrowRadius", 8)
    .setDefault("fill", () => css.getPropertyValue('--primary-contrast-3') || '#004D62')

  const molecule: Properties['molecule'] = defaultable(properties.molecule || {})
    .setDefault("fill", () => extract(global.surface))
    .setDefault("stroke", () => extract(global.onSurface))
    .setDefault('drug', () => css.getPropertyValue('--drug-contrast-4') || '#9C3D61')
  ;

  const complex: Properties['complex'] = defaultable(properties.complex || {})
    .setDefault("cut", 8)
    .setDefault("fill", () => css.getPropertyValue('--tertiary-contrast-1') || '#00315C')
    .setDefault("stroke", () => css.getPropertyValue('--on-tertiary') || '#FFFFFF')
    .setDefault('drug', () => css.getPropertyValue('--drug-contrast-4') || '#7E2549')

  const entitySet: Properties['entitySet'] = defaultable(properties.entitySet || {})
    .setDefault("radius", 8)
    .setDefault("fill", () => css.getPropertyValue('--tertiary-contrast-2') || '#1660A5')
    .setDefault("stroke", () => css.getPropertyValue('--on-tertiary') || '#FFFFFF')
    .setDefault('drug', () => css.getPropertyValue('--drug-contrast-5') || '#BB557A')

  const pathway: Properties['pathway'] = defaultable(properties.pathway || {})
    .setDefault("fill", () => extract(global.primary))
    .setDefault("stroke", () => extract(global.onPrimary))
    .setDefault('disease', () => extract(global.negative))

  const modification: Properties['modification'] = defaultable(properties.modification || {})
    .setDefault("fill", css.getPropertyValue('--primary-contrast-2') || '#003545')

  return {
    global,
    compartment,
    shadow,
    protein,
    genomeEncodedEntity,
    rna,
    gene,
    molecule,
    complex,
    entitySet,
    pathway,
    modification
  }
}

export type UserProperties = Partial<{
  [k in keyof Properties]: Partial<Properties[k]>
}>

