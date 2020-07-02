import { Component, OnInit } from '@angular/core';
import {BackofficeService} from '../../../services/backoffice.service';
import {NotificationsService} from 'angular2-notifications';

@Component({
  selector: 'app-users',
  templateUrl: './users.component.html',
  styleUrls: ['./users.component.css']
})
export class UsersComponent implements OnInit {

  constructor(private backofficeService: BackofficeService,
              private notificationsService: NotificationsService) { }
  public searched: string;
  public user: any;
  public userDeleted = false;
  public loading: boolean;
  ngOnInit(): void {
  }

  searchUser() {
    this.backofficeService.getUserBySearch(this.searched).subscribe(
        (user) => {
          this.user = user.data;
          this.user.roles = user.roles;
        },
        (err) => {
          console.log(err);
        }
    );
  }

  deleteUser(userId: number) {
      this.loading = true;
      this.backofficeService.deleteUser(userId).subscribe(
    (success) => {
      console.log('success delete');
      this.userDeleted = true;
      this.loading = false;
      this.notificationsService.success('Utilizatorul a fost sters', '', {timeOut: 1500});
      this.user = {};
    },
    (Err) => {
      console.log(Err);
    }
);
  }

  updateRole(userId: number) {
      this.loading = true;
      this.backofficeService.updateUserRole(userId).subscribe(
          (success) => {
              console.log(success);
              this.searchUser();
              this.loading = false;
              this.notificationsService.success('Utilizatorul are drepturile de admin acum.', '', {timeOut: 1500});
          },
          (err) => {
              console.log(err);
          }
      );
  }

}
