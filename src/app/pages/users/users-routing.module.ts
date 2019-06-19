import { NgModule } from "@angular/core";
import { Routes, RouterModule } from "@angular/router";

import { UsersPageComponent } from "./components/users-page/users-page.component";
import { AuthGuard } from "../../core/guards/auth.guard";

const routes: Routes = [{ path: "users", component: UsersPageComponent, canActivate: [AuthGuard] }];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class UsersRoutingModule {}
