import { BrowserModule } from "@angular/platform-browser";
import { NgModule, LOCALE_ID } from "@angular/core";

import { AppRoutingModule } from "./app-routing.module";
import { AppComponent } from "./app.component";

import { UsersModule } from "./pages/users/users.module";
import { ReservationsModule } from "./pages/reservations/reservations.module";
import { CoreModule } from "./core/core.module";
import { AuthModule } from "./auth/auth.module";
import { AngularFireAuth } from "@angular/fire/auth";
import { NavBarComponent } from "./shared/nav-bar/nav-bar.component";

import { BrowserAnimationsModule } from "@angular/platform-browser/animations";
import { NgbModule } from "@ng-bootstrap/ng-bootstrap";
import { OrderbyPipe } from "./pipes/order-by.pipe";
import { ToastrModule } from "ngx-toastr";

import { registerLocaleData } from '@angular/common';
import localeEs from '@angular/common/locales/es';
import { MaterialModules } from "./shared/material/material.module";
import { ServiceWorkerModule } from '@angular/service-worker';
import { environment } from '../environments/environment';

registerLocaleData(localeEs, 'es');

@NgModule({
  declarations: [AppComponent, NavBarComponent, OrderbyPipe],
  imports: [
    BrowserModule,  
    CoreModule,
    UsersModule,
    MaterialModules,
    ReservationsModule,
    AuthModule,    
    NgbModule,
    BrowserAnimationsModule,
    AppRoutingModule,
    ToastrModule.forRoot(),
    ServiceWorkerModule.register('ngsw-worker.js', { enabled: environment.production })
  ],
  providers: [AngularFireAuth, { provide: LOCALE_ID, useValue: 'es-AR' }],
  bootstrap: [AppComponent]
})
export class AppModule {}
