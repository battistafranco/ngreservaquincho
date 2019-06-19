import { UsersPage } from "../states/users-page";
import { StoreService } from "src/app/core/services/store.service";
import { Injectable } from "@angular/core";

@Injectable({
  providedIn: "root"
})
export class UsersPageStore extends StoreService<UsersPage> {
  protected store: string = "users-page";

  constructor() {
    super({
      loading: true,
      users: []
    });
  }
}
