import BackgroundImage = cytoscape.Css.BackgroundImage;
import PropertyValueNode = cytoscape.Css.PropertyValueNode;
import _ from "lodash";
import {Properties} from "../properties";

export type Image = {
  [k in keyof BackgroundImage]: BackgroundImage[k] extends PropertyValueNode<infer X> ? X : never
}

export interface Drawer {
  background?: Image;
  select?: Image;
  hover?: Image;
  flag?: Image;
  decorators?: Image[];
  analysis?: Image;
}

export interface DrawerParameters {
  width: number,
  height: number,
  drug?: boolean,
  disease?: boolean,
  crossed?: boolean,
  interactor?: boolean,
  lossOfFunction?: boolean,
  gradient?: string
}

export interface DrawerProvider {
  (properties: Properties, params: DrawerParameters): Drawer
}

export type Memo<T> = T & _.MemoizedFunction;
export type Aggregated<T> = {
  [k in keyof T]-?: T[k][]
}
