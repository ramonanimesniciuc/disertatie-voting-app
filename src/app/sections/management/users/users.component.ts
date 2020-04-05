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
  public user: any;
  public userDeleted = false;
  ngOnInit(): void {
  }

  searchUser() {
    this.backofficeService.getUserBySearch(this.searched).subscribe(
        (user) => {
          this.user = user.data;
          this.user.roles=user.roles;
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
      this.user = {};
    },
    (Err) => {
      console.log(Err);
    }
);
  }

  updateRole(userId:number){
      this.backofficeService.updateUserRole(userId).subscribe(
          (success)=>{
              console.log(success);
          },
          (err)=>{
              console.log(err);
          }
      );
  }

}
