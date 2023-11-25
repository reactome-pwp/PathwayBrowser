import {Reactome} from "./reactome-style";

export type Provider<T> = () => T;

export type Property<T> = T | Provider<T>;

export function isProvider<T>(property: Property<T>): property is Provider<T> {
  return (property as Provider<T>).apply !== undefined;
}

export function extract<T>(property: Property<T>): T {
  return isProvider(property) ? property() : property;
}

export type PropertiesType = {
  [k: string]: Property<any>
}


export type Contain<T, K extends keyof T> = T & {
  [P in K]-?: T[P];
}

export type Defaultable<T> = T & {
  setDefault<K extends keyof T, V extends T[K]>(key: K, defaultValue: V): Defaultable<Contain<T, K>>;
}


export function defaultable<T>(object: T): Defaultable<T> {
  const defaultable = (object) as Defaultable<T>;

  defaultable.setDefault = function <K extends keyof T, V extends T[K]>(key: K, defaultValue: V): Defaultable<Contain<T, K>> {
    if (!object[key]) object[key] = defaultValue;
    return defaultable as Defaultable<Contain<T, K>>;
  };

  return defaultable;
}

export const propertyExtractor = <G extends keyof Reactome.Properties, K extends keyof Reactome.Properties[G]>(group: G, key: K) => Reactome.Style.properties[group][key]
export const propertyMapper = <G extends keyof Reactome.Properties, K extends keyof Reactome.Properties[G], T extends Reactome.Properties[G][K] extends Property<infer X> ? X : never,  M extends (t: T) => any>(group: G, key: K, mapper: M) => mapper(extract(Reactome.Style.properties[group][key]))
