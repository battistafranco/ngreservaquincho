import { UsersService } from "./../../services/users.service";
import { AngularFirestore } from "@angular/fire/firestore";
import { Component, OnInit } from "@angular/core";
import { FormGroup, FormControl, Validators } from "@angular/forms";
import { Observable } from "rxjs";

@Component({
  selector: "app-users-form",
  templateUrl: "./users-form.component.html",
  styleUrls: ["./users-form.component.scss"]
})
export class UsersFormComponent implements OnInit {
  form: FormGroup = new FormGroup({
    name: new FormControl("", Validators.required),
    email: new FormControl("", Validators.required),
    apartment: new FormControl("", Validators.required)
  });

  apartments = [
    "1A",
    "1B",
    "2A",
    "2B",
    "3A",
    "3B",
    "4A",
    "4B",
    "5A",
    "5B",
    "6A",
    "6B",
    "7A",
    "7B"
  ];

  status$: Observable<string>;

  constructor(private users: UsersService) {}

  ngOnInit() {
    this.status$ = this.users.formStatus$;
  }

  isInvalid(name) {
    return (
      this.form.controls[name].invalid &&
      (this.form.controls[name].dirty || this.form.controls[name].touched)
    );
  }

  async submit() {
    this.form.disable();
    await this.users.create({
      ...this.form.value
    });
    this.form.reset();
    this.form.enable();
  }
}
