import { NgModule } from "@angular/core";
import { Routes, RouterModule } from "@angular/router";

import { ReservationsPageComponent } from "./components/reservations-page/reservations-page.component";
import { AuthGuard } from "../../core/guards/auth.guard";

const routes: Routes = [{ path: "reservations", component: ReservationsPageComponent, canActivate: [AuthGuard] }];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class ReservationsRoutingModule {}
