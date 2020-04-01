import { Component, OnInit } from '@angular/core';
import {BackofficeService} from '../../../services/backoffice.service';

@Component({
  selector: 'app-users',
  templateUrl: './users.component.html',
  styleUrls: ['./users.component.css']
})
export class UsersComponent implements OnInit {

  constructor(private backofficeService: BackofficeService) { }
  public searched: string;
  public users: any[];
  public userDeleted = false;
  ngOnInit(): void {
  }

  searchUser() {
    this.backofficeService.getUserBySearch(this.searched).subscribe(
        (user) => {
          this.users = user.data;
        },
        (err) => {
          console.log(err);
        }
    );
  }

  deleteUser(userId: number) {
      this.backofficeService.deleteUser(userId).subscribe(
    (success) => {
      console.log('success delete');
      this.userDeleted = true;
      this.users = [];
    },
    (Err) => {
      console.log(Err);
    }
);
  }

}
