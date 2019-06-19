import { Component, OnInit, AfterViewInit } from "@angular/core";
import { AuthService } from "src/app/auth/services/auth.service";
import { Router } from "@angular/router";

@Component({
  selector: "app-nav-bar",
  templateUrl: "./nav-bar.component.html",
  styleUrls: ["./nav-bar.component.scss"]
})
export class NavBarComponent implements OnInit {
  isAdmin: boolean = true;
  isUser: boolean = true;
  id: string = "";
  show: boolean = false;
  currentUser: any;

  constructor(private _authService: AuthService, private router: Router) {}

  ngOnInit() {
    //var usr = this.globals.getActualUserFromLocal();
    //this.id = usr.id;
    // this.isAdmin = usr.rol == "Administrador" ? true : false;
    // this.isUser = usr.rol == "Usuario" ? true : false;
    // this.nombre = usr.nombre;
  }

  ngAfterViewInit() {
    this.setCurrentUser();
  }

  toggleCollapse() {
    this.show = !this.show;
  }

  isAuthenticated() {
    return this._authService.isAuthenticated$;   
  }

  setCurrentUser() {
    this.currentUser = this._authService.user;
  }

  logout() {
    this._authService.doLogout();    
    sessionStorage.clear();
    this.router.navigate(["/login"]);
  }
}
