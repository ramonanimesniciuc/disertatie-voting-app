import { Component, OnInit } from '@angular/core';
import {BackofficeService} from '../../services/backoffice.service';
import {NotificationsService} from 'angular2-notifications';

@Component({
  selector: 'app-management',
  templateUrl: './management.component.html',
  styleUrls: ['./management.component.css']
})
export class ManagementComponent implements OnInit {
  public comments: any;
  public sponsors: any;
  constructor(private backofficeService: BackofficeService,
              private notificationsService: NotificationsService) { }

  ngOnInit(): void {
    this.getComments();
    this.getSponsorsWithoutApproval();

  }

  getComments() {
    this.backofficeService.getCommnetsToday().subscribe((success) => {
      console.log(success);
      this.comments = success.comments;
    });
  }

  approveSponsor(sponsorId: any) {
   this.backofficeService.approveSponsor(sponsorId).subscribe(
       (success) => {
         this.notificationsService.success('Sponsorul a fost aprobat cu succes!', '', {timeOut: 1500});
         this.getSponsorsWithoutApproval();
       },
       (err) => {
         this.notificationsService.error('A aparut o eroare!Incercati inca o data', '', {timeOut: 3000});
       }
   );
  }

  getSponsorsWithoutApproval() {
    this.backofficeService.getSponsorsWithoutApproval().subscribe(
        (sponsors) => {
          this.sponsors = sponsors.data;
        }
    );
  }

}
