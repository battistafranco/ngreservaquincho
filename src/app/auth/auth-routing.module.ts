import {RouterModule, Routes} from '@angular/router';
import {ModuleWithProviders} from '@angular/core';

import { LoginPageComponent } from "./components/login-page/login-page.component";

//const routes: Routes = [ { path: "login", component: LoginPageComponent }];
// const routes: Routes = [  { path: "", redirectTo: "login", pathMatch: "full" },
// { path: "login", component: LoginPageComponent }];

const routes: Routes = [
  {
      path: '',
      component: LoginPageComponent,
      children: [
          { path: '', component: LoginPageComponent },
          { path: 'login', component: LoginPageComponent }
         
      ]
  }
];

// @NgModule({
//   imports: [RouterModule.forChild(routes)],
//   exports: [RouterModule]
// })
export const AuthRoutingModule: ModuleWithProviders = RouterModule.forChild(routes);
