import { ReservationsPageStore } from "./reservations.store";
import { ReservationsFirestore } from "./reservations.firestore.service";
import { Injectable, Query } from "@angular/core";
import { Observable } from "rxjs";
import { Reservation } from "../../../models/reservation";
import { tap, map } from "rxjs/operators";
import { UsersService } from "../../users/services/users.service";
import * as moment from "moment";
import { ToastrService } from "ngx-toastr";

@Injectable({
  providedIn: "root"
})
export class ReservationsService {
  constructor(
    private _us: UsersService,
    private firestore: ReservationsFirestore,
    private store: ReservationsPageStore,
    private tostr: ToastrService
  ) {
    this.firestore
      .collection$(ref => ref.orderBy("fecha", "asc"))
      .pipe(
        tap(reservations => {
          this.store.patch(
            { loading: false, reservations },
            `reservations collection subscription`
          );
        })
      )
      .subscribe();
  }

  getReservationsByMonth$(mes): Observable<Reservation[]> {
    return this.store.state$.pipe(
      map(state =>
        state.loading ? [] : state.reservations.filter(a => a.mes == mes)
      )
    );
  }

  isValidReservation$(values): Observable<Reservation[]> {
    let dia = +moment(values.fecha).format("DD");
    let mes = +moment(values.fecha).format("MM");
    let anio = +moment(values.fecha).format("YYYY");
    let fecha = moment(values.fecha).format("YYYY-MM-DD");
    let turno = values.turno;  
    // return this.firestore
    // .collection$(ref => ref.where("turno","==", turno)
    //                     .where("año","==",anio)
    //                     .where("dia","==",dia)
    //                     .where("mes","==",mes))
    return this.store.state$.pipe(
      map(state => (state.loading ? [] : state.reservations.filter(r => r.fecha == fecha && r.turno == turno)))
    );
  }

  get reservations$(): Observable<Reservation[]> {
    return this.store.state$.pipe(
      map(state => (state.loading ? [] : state.reservations))
    );
  }

  get loading$(): Observable<boolean> {
    return this.store.state$.pipe(map(state => state.loading));
  }

  get noResults$(): Observable<boolean> {
    return this.store.state$.pipe(
      map(state => {
        return (
          !state.loading &&
          state.reservations &&
          state.reservations.length === 0
        );
      })
    );
  }

  get formStatus$(): Observable<string> {
    return this.store.state$.pipe(map(state => state.formStatus));
  }

  create(reservation: Reservation) {
    this.store.patch(
      { loading: true, reservations: [], formStatus: "Saving..." },
      "reservation create"
    );

    this._us.user$.subscribe(usr => {
      reservation.usuario = usr.email;
      reservation.departamento = usr.apartment;
      reservation.fecha = moment(reservation.fecha).format("YYYY-MM-DD");
      reservation.mes = moment(reservation.fecha).month() + 1;
      reservation.dia = +moment(reservation.fecha).format("D");
      reservation.año = moment(reservation.fecha).year();
      reservation.timestamp = moment().toISOString();

      return this.firestore
        .create(reservation)
        .then(_ => {
          this.store.patch(
            { formStatus: "Saved!" },
            "reservation create SUCCESS"
          );
          this.tostr.success("Reserva creada correctamente!", "OK!");
          setTimeout(
            () =>
              this.store.patch(
                { formStatus: "" },
                "reservation create timeout reset formStatus"
              ),
            2000
          );
        })
        .catch(err => {
          this.store.patch(
            { loading: false, formStatus: "An error ocurred" },
            "reservation create ERROR"
          );
          this.tostr.error(
            "Ocurrió un error al crear la reserva. Vuelva a intentar.",
            "Oops!"
          );
        });
    });
  }

  delete(id: string): any {
    this.store.patch({ loading: true, reservations: [] }, "reservation delete");
    return this.firestore
      .delete(id)
      .then(res => {
        this.store.patch(
          { formStatus: "Deleted!" },
          "reservation delete SUCCESS"
        );
      })
      .catch(err => {
        this.store.patch(
          { loading: false, formStatus: "An error ocurred" },
          "reservation delete ERROR"
        );
      });
  }
}
