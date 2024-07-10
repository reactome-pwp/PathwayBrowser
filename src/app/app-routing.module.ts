import {RouterModule, Routes} from "@angular/router";
import {NgModule} from "@angular/core";
import {DiagramComponent} from "./diagram/diagram.component";
import {DiagramIteratorComponent} from "./diagram-iterator/diagram-iterator.component";
import {legacyGuard} from "./guard/legacy.guard";
import {ViewportComponent} from "./viewport/viewport.component";

export const routes: Routes = [
  {path: 'iterate', component: DiagramIteratorComponent},
  {path: 'iterate/:id', component: DiagramIteratorComponent},
  {path: 'PathwayBrowser/:id', component: ViewportComponent},
  {path: ':id', component: DiagramComponent},
  {path: '**', component: DiagramComponent,  canActivate: [legacyGuard], runGuardsAndResolvers: 'always'}
]


@NgModule({
  imports: [RouterModule.forRoot(routes, {bindToComponentInputs: true})],
  exports: [RouterModule]
})
export class AppRoutingModule { }
