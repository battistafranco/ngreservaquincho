import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { AuthRoutingModule } from './auth-routing.module';
import { ReactiveFormsModule } from '@angular/forms';
import { LoginPageComponent } from './components/login-page/login-page.component';
import { LoginFormComponent } from './components/login-form/login-form.component';
import { MaterialModules } from '../shared/material/material.module';

@NgModule({
  declarations: [LoginPageComponent, LoginFormComponent],
  imports: [
    CommonModule, ReactiveFormsModule, MaterialModules, AuthRoutingModule
  ]
})
export class AuthModule { }
