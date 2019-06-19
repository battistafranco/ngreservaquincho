import { NgModule } from "@angular/core";
import { CommonModule } from "@angular/common";
import { ReactiveFormsModule } from "@angular/forms";
import { UsersRoutingModule } from "./users-routing.module";

import { UsersPageComponent } from "./components/users-page/users-page.component";
import { UsersListComponent } from "./components/users-list/users-list.component";
import { UsersFormComponent } from "./components/users-form/users-form.component";
import { MaterialModules } from "../../shared/material/material.module";

@NgModule({
  declarations: [UsersPageComponent, UsersListComponent, UsersFormComponent],
  imports: [CommonModule, UsersRoutingModule, ReactiveFormsModule, MaterialModules],
  providers: []
})
export class UsersModule {}
