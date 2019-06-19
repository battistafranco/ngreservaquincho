import { Component, OnInit } from "@angular/core";
import { AuthService } from "../../services/auth.service";
import { Router } from "@angular/router";
import { UsersService } from "src/app/pages/users/services/users.service";

@Component({
  selector: "app-login-page",
  templateUrl: "./login-page.component.html",
  styleUrls: ["./login-page.component.scss"]
})
export class LoginPageComponent implements OnInit {
  constructor(
    private _authService: AuthService,
    private _us: UsersService,
    private router: Router
  ) {}
  usuarioInexistente: boolean;
  ngOnInit() {}

  ngAfterViewInit() {
    if (this._authService.isAuthenticated$) {
      this.router.navigate(["/reservations"]);
    }
  }

  doProviderLogin(value) {
    if (value == "Google") {
      this._authService.doGoogleLogin().then(res => {
        this.varifyUser(res.user);
      });
    } else if (value == "Facebook") {
      this._authService.doFacebookLogin().then(res => {
        this.varifyUser(res.user);
      });
    }
  }



  varifyUser(usr) {
    this._us.user$.subscribe(r => {      
      if (r) {
        this._us.setCurrentUser(r);
        this.usuarioInexistente = false;
        this.router.navigate(["/reservations"]);
      } else {
        this._authService.invalidUser();
      }
    });
  }
}
