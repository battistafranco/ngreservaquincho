import { Component, OnInit, Output, EventEmitter } from "@angular/core";
import { AuthService } from "../../services/auth.service";
import { FormGroup, FormControl, Validators } from "@angular/forms";
import { Observable } from "rxjs";
import { Router } from "@angular/router";
import { UsersService } from "src/app/pages/users/services/users.service";

@Component({
  selector: "app-login-form",
  templateUrl: "./login-form.component.html",
  styleUrls: ["./login-form.component.scss"]
})
export class LoginFormComponent implements OnInit {
  form: FormGroup = new FormGroup({
    email: new FormControl("", Validators.required),
    password: new FormControl("", Validators.required)
  });

  status$: Observable<string>;
  
  type$: Observable<string>;
  @Output() userInvalid = new EventEmitter();

  constructor(
    private _authService: AuthService,
    private _us: UsersService,
    private router: Router
  ) {}

  ngOnInit() {
    this.status$ = this._authService.formStatus$;
    this.type$ = this._authService.formType$;
  }

  isInvalid(name) {
    return (
      this.form.controls[name].invalid &&
      (this.form.controls[name].dirty || this.form.controls[name].touched)
    );
  }

  async onSubmit() {
    this.form.disable();
    debugger;
    try {
      this._authService.doLogin(this.form.value).then(res => {
        this.verifyUser();
        this.router.navigate(["/reservations"]);
      });
    } catch {
      this.userInvalid.emit(true);
    }

    this.form.reset();
    this.form.enable();
  }

  verifyUser() {
    this._us.user$.subscribe(r => {
      if (r) {
        this._us.setCurrentUser(r);
        this.router.navigate(["/reservations"]);
      } else {
        this._authService.doLogout();
        this.userInvalid.emit(true);
      }
    });
  }
}
