import { NgModule } from "@angular/core";
import { Routes, RouterModule } from "@angular/router";
import { LoginPageComponent } from "./auth/components/login-page/login-page.component";

// const routes: Routes = [  { path: "", redirectTo: "login", pathMatch: "full" },
// { path: "login", component: LoginPageComponent }];
const routes: Routes = [
  { path: "", pathMatch: 'full', redirectTo: 'login' },
  { path: "login", component: LoginPageComponent }
  
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule {}
