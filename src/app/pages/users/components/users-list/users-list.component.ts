import { User } from "../../../../models/user";
import { Component, OnInit, Input } from "@angular/core";
import { Observable } from "rxjs";
import { UsersService } from "../../services/users.service";

@Component({
  selector: "app-users-list",
  templateUrl: "./users-list.component.html",
  styleUrls: ["./users-list.component.scss"]
})
export class UsersListComponent implements OnInit {
  @Input() currentUser: User;
  loading$: Observable<boolean>;
  users$: Observable<User[]>;
  noResults$: Observable<boolean>;

  constructor(private users: UsersService) {}

  ngOnInit() {
    this.loading$ = this.users.loading$;
    this.noResults$ = this.users.noResults$;
    this.users$ = this.users.users$;
  }

  delete(user: User) {
    this.users.delete(user.id);
  }
}
