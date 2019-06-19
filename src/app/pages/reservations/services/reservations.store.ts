import { ReservationsPage } from "../states/reservations-page";
import { StoreService } from "src/app/core/services/store.service";
import { Injectable } from "@angular/core";

@Injectable({
  providedIn: "root"
})
export class ReservationsPageStore extends StoreService<ReservationsPage> {
  protected store: string = "reservations-page";

  constructor() {
    super({
      loading: true,
      reservations: []
    });
  }
}
