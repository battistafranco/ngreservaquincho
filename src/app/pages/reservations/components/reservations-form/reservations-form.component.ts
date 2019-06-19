import { Component, OnInit } from "@angular/core";
import { FormGroup, FormControl, Validators } from "@angular/forms";
import { Observable } from "rxjs";
import { ReservationsService } from "../../services/reservations.service";
import { Reservation } from "src/app/models/reservation";
import { ToastrService } from "ngx-toastr";
import * as moment from "moment";

@Component({
  selector: "app-reservations-form",
  templateUrl: "./reservations-form.component.html",
  styleUrls: ["./reservations-form.component.scss"]
})
export class ReservationsFormComponent implements OnInit {
  reservation: Reservation;
  reservaIsInvalid$: Observable<Reservation[]>;
  alertMsg: string;
  minDate = moment();
  form: FormGroup = new FormGroup({
    turno: new FormControl("", Validators.required),
    fecha: new FormControl("", Validators.required),
    observacion: new FormControl("")
  });

  turnos = [
    { value: "Mediodia", text: "☀️ Mediodía" },
    { value: "Noche", text: " ⭐ Noche" }
  ];

  status$: Observable<string>;

  constructor(private _rs: ReservationsService, private tostr: ToastrService) {}

  ngOnInit() {
    this.status$ = this._rs.formStatus$;
    this.onChanges();
  }

  public hasError = (controlName: string, errorName: string) => {
    return this.form.controls[controlName].hasError(errorName);
  };

  isValidReservation() {
    this.reservaIsInvalid$ = this._rs.isValidReservation$(this.form.value);
  }

  onChanges(): void {
    this.reservaIsInvalid$ = null;
    this.form.valueChanges.subscribe(values => {
      if (this.form.valid) {
        this.reservaIsInvalid$ = this._rs.isValidReservation$(values);
      } else {
        this.reservaIsInvalid$ = null;
      }
    });
  }

  submit() {
    this.form.disable();

    this._rs.create({
      ...this.form.value
    });

    this.alertMsg = "OK! Reserva registrada..";
    this.form.reset();

    this.form.enable();
  }

  closeAlert() {
    this.alertMsg = "";
  }
}
