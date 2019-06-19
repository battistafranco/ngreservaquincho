import { Component, OnInit } from '@angular/core';
import { User } from 'src/app/models/user';
import { UsersService } from '../../services/users.service';

@Component({
  selector: 'app-users-page',
  templateUrl: './users-page.component.html',
  styleUrls: ['./users-page.component.scss']
})
export class UsersPageComponent implements OnInit {
  currentUser: User;
  constructor(private _us: UsersService) { }

  ngOnInit() {
    
    this.currentUser = this._us.getCurrentUser();
  }

}