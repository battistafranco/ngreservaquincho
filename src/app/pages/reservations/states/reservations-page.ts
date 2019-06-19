import { Reservation } from "../../../models/reservation";
export interface ReservationsPage {
  loading: boolean;
  reservations: Reservation[];
  formStatus: string;
}
