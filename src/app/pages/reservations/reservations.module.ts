import { NgModule } from "@angular/core";
import { CommonModule } from "@angular/common";
import { ReactiveFormsModule } from "@angular/forms";
import { ReservationsRoutingModule } from "./reservations-routing.module";

import { BrowserAnimationsModule } from "@angular/platform-browser/animations";
import { ReservationsPageComponent } from "./components/reservations-page/reservations-page.component";
import { ReservationsListComponent } from "./components/reservations-list/reservations-list.component";
import { ReservationsFormComponent } from "./components/reservations-form/reservations-form.component";
import { MaterialModules } from "../../shared/material/material.module";
import { ToastrModule } from 'ngx-toastr';

@NgModule({
  declarations: [ReservationsPageComponent, ReservationsListComponent, ReservationsFormComponent],
  imports: [CommonModule, ReservationsRoutingModule, ReactiveFormsModule,MaterialModules,BrowserAnimationsModule,ToastrModule]
})
export class ReservationsModule {}
