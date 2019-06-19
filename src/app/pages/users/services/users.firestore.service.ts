import { Injectable } from "@angular/core";
import { FirestoreService } from "src/app/core/services/firestore.service";
import { User } from "../../../models/user";

@Injectable({
  providedIn: "root"
})
export class UsersFirestore extends FirestoreService<User> {
  protected basePath: string = "users";
}
