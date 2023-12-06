/// <reference path="../../../../node_modules/@types/cytoscape/index.d.ts"/>
import {Reactome} from "../../src/lib/reactome-style";
import cytoscape from 'cytoscape';
import ReactionDefinition = Reactome.ReactionDefinition;
import PhysicalEntityDefinition = Reactome.PhysicalEntityDefinition;
import EdgeTypeDefinition = Reactome.EdgeTypeDefinition;


declare module 'cytoscape' {
  //   import PhysicalEntityDefinition = Reactome.PhysicalEntityDefinition;
  //   import ReactionDefinition = Reactome.ReactionDefinition;
  //   import EdgeTypeDefinition = Reactome.EdgeTypeDefinition;


  // export interface ElementDefinition {
  //   classes: PhysicalEntityDefinition | ReactionDefinition | EdgeTypeDefinition | string[] | string | undefined;
  // }

  export interface NodeDefinition extends cytoscape.ElementDefinition {
    classes: PhysicalEntityDefinition | ReactionDefinition | string[] | string | undefined;
  }

  export interface EdgeDefinition extends cytoscape.ElementDefinition {
    classes: EdgeTypeDefinition | string[] | string | undefined;
  }

  // export namespace Css {
  //   interface BackgroundImage extends cytoscape.Css.BackgroundImage {
  //     "background-image"?: PropertyValueNode<string[]> | PropertyValueNode<string>;
  //     "background-"?: PropertyValueNode<string[]> | PropertyValueNode<string>;
  //   }
  // }

}



