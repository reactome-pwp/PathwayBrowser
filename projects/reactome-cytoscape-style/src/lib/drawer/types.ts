import BackgroundImage = cytoscape.Css.BackgroundImage;
import PropertyValueNode = cytoscape.Css.PropertyValueNode;
import _ from "lodash";

export type Image = {
  [k in keyof BackgroundImage]: BackgroundImage[k] extends PropertyValueNode<infer X> ? X : never
}

export interface Drawer {
  background?: Image;
  select?: Image;
  hover?: Image;
  flag?: Image;
  decorators?: Image[];
}

export interface DrawerProvider {
  (width: number, height: number, drug: boolean, disease: boolean, interactor: boolean): Drawer
}
export type Memo<T> = T & _.MemoizedFunction;
export type Aggregated<T> = {
  [k in keyof T]-?: T[k][]
}
