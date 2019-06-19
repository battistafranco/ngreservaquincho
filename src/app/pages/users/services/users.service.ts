import { UsersPageStore } from "./users-page.store";
import { UsersFirestore } from "./users.firestore.service";
import { Injectable } from "@angular/core";
import { Observable } from "rxjs";
import { User } from "../../../models/user";
import { tap, map } from "rxjs/operators";
import { AuthService } from "src/app/auth/services/auth.service";

@Injectable({
  providedIn: "root"
})
export class UsersService {
  constructor(
    private auth: AuthService,
    private firestore: UsersFirestore,
    private store: UsersPageStore
  ) {
    this.firestore
      .collection$(ref => ref.orderBy("apartment", "asc"))
      .pipe(
        tap(users => {
          this.store.patch(
            { loading: false, users },
            `users collection subscription`
          );
        })
      )
      .subscribe();
  }

  get users$(): Observable<User[]> {
    return this.store.state$.pipe(
      map(state => (state.loading ? [] : state.users))
    );
  }

  get user$(): Observable<User> {
    return this.store.state$.pipe(
      map(state => (state.loading ? {} : state.users.filter(a=> a.email === this.auth.afAuth.auth.currentUser.email))[0])
    );
  }

  userExist(email) : Observable<boolean>
  {
    return this.store.state$.pipe(
      map(state => (state.loading ? false : state.users.filter(a=> a.email === email).length > 0 ? true : false))
    );
  }

  get loading$(): Observable<boolean> {
    return this.store.state$.pipe(map(state => state.loading));
  }

  get noResults$(): Observable<boolean> {
    return this.store.state$.pipe(
      map(state => {
        return !state.loading && state.users && state.users.length === 0;
      })
    );
  }

  get formStatus$(): Observable<string> {
    return this.store.state$.pipe(map(state => state.formStatus));
  }

  setCurrentUser(user){    
    localStorage.setItem('currentUser', JSON.stringify(user));
  }

  getCurrentUser(){
    let user = JSON.parse(localStorage.getItem('currentUser'));
    return user;
  }

  create(user: User) {
    user.isAdmin = false;
    this.store.patch(
      { loading: true, users: [], formStatus: "Saving..." },
      "user create"
    );
    return this.firestore
      .create(user)
      .then(_ => {
        this.store.patch({ formStatus: "Saved!" }, "user create SUCCESS");
        setTimeout(
          () =>
            this.store.patch(
              { formStatus: "" },
              "user create timeout reset formStatus"
            ),
          2000
        );
      })
      .catch(err => {
        this.store.patch(
          { loading: false, formStatus: "An error ocurred" },
          "user create ERROR"
        );
      });
  }

  delete(id: string): any {
    this.store.patch({ loading: true, users: [] }, "user delete");
    return this.firestore.delete(id).catch(err => {
      this.store.patch(
        { loading: false, formStatus: "An error ocurred" },
        "user delete ERROR"
      );
    });
  }
}
