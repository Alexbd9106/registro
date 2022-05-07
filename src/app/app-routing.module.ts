import { NgModule } from "@angular/core";
import { RouterModule, Routes } from "@angular/router";

import { FinishComponent } from "./finish/finish.component";
import { CrearAspiranteComponent } from "./aspirante/crear-aspirante/crear-aspirante.component";
import { CrearAspiranteMobilComponent } from "./aspirante/crear-aspirante/crear-aspirante-mobil.component";

let routes: Routes = [
  { path: '', component: CrearAspiranteComponent, outlet: 'pc' },
  { path: '', component: CrearAspiranteMobilComponent, outlet: 'mobil' },
  { path: 'error', component: FinishComponent }
];

@NgModule({
  imports: [ RouterModule.forRoot(routes) ],
  exports: [ RouterModule ]
})
export class AppRoutingModule {}
