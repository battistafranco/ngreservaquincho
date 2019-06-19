import { Component, OnInit } from "@angular/core";

import * as moment from "moment";
import "moment/locale/es";
import { extendMoment } from "moment-range";
import { Reservation } from "src/app/models/reservation";
import { AuthService } from "src/app/auth/services/auth.service";
import { ReservationsService } from "../../services/reservations.service";
import { Observable } from "rxjs";

moment.locale("es");
const momRange = extendMoment(moment);

interface Evento {
  fecha: string;
  dia: string;
  otroMes: boolean;
  reserva: Reservation;
  fechaCompleta: string;
  habilitado: boolean;
  isWeekend: boolean;
  isToday: boolean;
}

@Component({
  selector: "app-reservations-list",
  templateUrl: "./reservations-list.component.html",
  styleUrls: ["./reservations-list.component.scss"]
})
export class ReservationsListComponent implements OnInit {
  selectedMonth: any = 0;
  selectedMonthDesc: string;
  selectedDate: any;
  diasMes: any[];
  mes: string;
  reservas: Reservation[];
  reservas$: Observable<Reservation[]>;
  today: any;
  orderBy = "fecha";
  isAscending = true;

  constructor(
    private _rs: ReservationsService,
    private _authService: AuthService,
    private _reservasService: ReservationsService
  ) {}

  ngOnInit() {
    this.today = moment();
    this.setReservationsList(0);
  }

  ngAfterViewInit() {}

  setDate(value) {
    this.setReservationsList(value);
  }

  setReservationsList(mes) {
    if (mes == 0) {
      this.selectedMonth = moment().month();
      this.selectedDate = moment();
    } else {
      this.selectedMonth = moment(this.selectedDate)
        .add(mes, "month")
        .month();
      this.selectedDate = moment(this.selectedDate).add(mes, "month");
    }
    this.selectedMonthDesc = this.getMes(this.selectedMonth);
    this.reservas$ = this._reservasService.getReservationsByMonth$(
      this.selectedMonth + 1
    );
  }

  getMes(value): string {
    switch (value) {
      case 0:
        return "Enero";
      case 1:
        return "Febrero";
      case 2:
        return "Marzo";
      case 3:
        return "Abril";
      case 4:
        return "Mayo";
      case 5:
        return "Junio";
      case 6:
        return "Julio";
      case 7:
        return "Agosto";
      case 8:
        return "Septiembre";
      case 9:
        return "Octubre";
      case 10:
        return "Noviembre";
      case 11:
        return "Diciembre";
      default:
        return "";
    }
  }

  async delete(id) {
    await this._rs.delete(id);
  }

  isEven(n) {
    return n % 2 == 0;
  }
}
