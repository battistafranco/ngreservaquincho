import { Injectable } from "@angular/core";

import { AngularFireAuth } from "@angular/fire/auth";
import * as firebase from "firebase/app";
import { Observable } from "rxjs";
import { AuthStore } from "./auth.store";
import { map } from "rxjs/operators";

@Injectable({
  providedIn: "root"
})
export class AuthService {
  user: Observable<firebase.User>;

  constructor(public afAuth: AngularFireAuth, private store: AuthStore) {
    this.user = afAuth.authState;
  }

  doFacebookLogin() {
    return new Promise<any>((resolve, reject) => {
      let provider = new firebase.auth.FacebookAuthProvider();
      this.afAuth.auth.signInWithPopup(provider).then(
        res => {
          resolve(res);
        },
        err => {
          console.log(err);
          reject(err);
        }
      );
    });
  }

  doGoogleLogin() {
    this.store.patch(
      {
        isAuthenticated: false,
        formStatus: "Google Loggin in...",
        formType: "info"
      },
      "Google loggin in"
    );
    return new Promise<any>((resolve, reject) => {
      let provider = new firebase.auth.GoogleAuthProvider();
      provider.addScope("profile");
      provider.addScope("email");
      this.afAuth.auth.signInWithPopup(provider).then(
        res => {
          this.store.patch(
            {
              isAuthenticated: true,
              formStatus: "Logged!",
              formType: "success"
            },
            "Google loggin SUCCESS"
          );
          resolve(res);
          setTimeout(
            () =>
              this.store.patch(
                { formStatus: "", formType: "" },
                "Google loggin timeout reset formStatus"
              ),
            2000
          );
        },
        err => {
          this.store.patch(
            {
              isAuthenticated: false,
              formStatus:
                "Usuario inexistente, comunicarse con battistafranco@gmail.com!",
              formType: "error"
            },
            "Google loggin ERROR"
          );
          reject(err);
        }
      );
    });
  }

  doLogin(value) {
    this.store.patch(
      { isAuthenticated: false, formStatus: "Loggin in...", formType: "info" },
      "User loggin in"
    );
    return new Promise<any>((resolve, reject) => {
      firebase
        .auth()
        .signInWithEmailAndPassword(value.email, value.password)
        .then(res => {
          this.store.patch(
            {
              isAuthenticated: true,
              formStatus: "Logged!",
              formType: "success"
            },
            "user loggin SUCCESS"
          );
          resolve(res);
          setTimeout(
            () =>
              this.store.patch(
                { formStatus: "", formType: "" },
                "user loggin timeout reset formStatus"
              ),
            2000
          );
        })
        .catch(err => {
          this.store.patch(
            {
              isAuthenticated: false,
              formStatus:
                "Usuario inexistente, comunicarse con battistafranco@gmail.com!",
              formType: "error"
            },
            "user loggin ERROR"
          );
          reject(err);
        });
    });
  }

  doLogout() {
    this.store.patch(
      { isAuthenticated: false, formStatus: "Loggin out...", formType: "info" },
      "User Loggin out"
    );
    setTimeout(
      () =>
        this.store.patch(
          { formStatus: "", formType: "" },
          "user logg out timeout reset formStatus"
        ),
      2000
    );
    localStorage.clear();
    this.afAuth.auth.signOut();
  }

  invalidUser() {
    this.store.patch(
      {
        isAuthenticated: false,
        formStatus:
          "Usuario inexistente, comunicarse con battistafranco@gmail.com!",
        formType: "error"
      },
      "User Invalid"
    );
    localStorage.clear();
  }

  get formStatus$(): Observable<string> {
    return this.store.state$.pipe(map(state => state.formStatus));
  }

  get formType$(): Observable<string> {
    return this.store.state$.pipe(map(state => state.formType));
  }

  get isAuthenticated$(): Observable<boolean> {
    return this.store.state$.pipe(map(state => state.isAuthenticated));
  }
}
