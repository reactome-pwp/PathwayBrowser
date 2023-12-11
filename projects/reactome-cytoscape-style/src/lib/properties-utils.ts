import {Style} from "./style";
import {Properties} from "./properties";

export type Provider<T> = () => T;

export type Property<T> = T | Provider<T>;

/**
 * This is a guard function to check if a property is a Provider function, or a direct value
 *
 * @param property The value to check
 * @return true if is a Provider function
 */
export function isProvider<T>(property: Property<T>): property is Provider<T> {
  return (property as Provider<T>).apply !== undefined;
}

/**
 * This function extracts the value from a property, and if the property is a Provider<T>, it calls the property function to get the actual value.
 *
 * @param property A value of type Property<T>.
 */
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

export const propertyExtractor = <G extends keyof Properties, K extends keyof Properties[G]>(group: G, key: K) => Style.properties[group][key]
export const propertyMapper = <G extends keyof Properties, K extends keyof Properties[G], T extends Properties[G][K] extends Property<infer X> ? X : never,  M extends (t: T) => any>(group: G, key: K, mapper: M) => mapper(extract(Style.properties[group][key]))


