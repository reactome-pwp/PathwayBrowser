import {RouterModule, Routes} from "@angular/router";
import {NgModule} from "@angular/core";
import {DiagramComponent} from "./diagram/diagram.component";
import {DiagramIteratorComponent} from "./diagram-iterator/diagram-iterator.component";

export const routes: Routes = [
  {path: 'iterate', component: DiagramIteratorComponent},
  {path: 'iterate/:id', component: DiagramIteratorComponent},
  {path: ':id', component: DiagramComponent},
  {path: '**', redirectTo: 'R-HSA-453279'}
]


@NgModule({
  imports: [RouterModule.forRoot(routes, {bindToComponentInputs: true})],
  exports: [RouterModule]
})
export class AppRoutingModule { }
