import { Injectable } from "@angular/core";
import { FirestoreService } from "src/app/core/services/firestore.service";
import { Reservation } from "../../../models/reservation";

@Injectable({
  providedIn: "root"
})
export class ReservationsFirestore extends FirestoreService<Reservation> {
  protected basePath: string = "reservations";
}
