import { Auth } from "../states/auth";
import { StoreService } from "src/app/core/services/store.service";
import { Injectable } from "@angular/core";


@Injectable({
  providedIn: "root"
})
export class AuthStore extends StoreService<Auth> {
  protected store: string = "Auth";

  constructor() {
    super({
      isAuthenticated: false,
    });
  }
}
