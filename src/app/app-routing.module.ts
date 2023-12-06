import {RouterModule, Routes} from "@angular/router";
import {NgModule} from "@angular/core";
import {DiagramComponent} from "./diagram/diagram.component";

export const routes: Routes = [
  {path: ':id', component: DiagramComponent},
  {path: '**', redirectTo: 'R-HSA-453279'}
]


@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
