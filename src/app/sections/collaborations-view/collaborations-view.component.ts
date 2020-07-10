import { Component, OnInit } from '@angular/core';
import {BackofficeService} from '../../services/backoffice.service';
import {NotificationsService} from 'angular2-notifications';

@Component({
  selector: 'app-collaborations-view',
  templateUrl: './collaborations-view.component.html',
  styleUrls: ['./collaborations-view.component.css']
})
export class CollaborationsViewComponent implements OnInit {

  constructor(private backofficeService: BackofficeService,
              private notificationsService: NotificationsService) { }
  public collaborations: any;
  ngOnInit(): void {
    this.getCollaborations();
  }

  getCollaborations() {
    this.backofficeService.getCollaborations().subscribe(
        (collaborations) => {
          this.collaborations = collaborations.data;
        },
        (err) => {
          this.notificationsService.error('Eroare la incarcarea colaborarilor!', 'Incearca mai tarziu', {timeOut: 3000});
        }
    );
  }

  approveCollaboration(collaboration: any) {
    this.backofficeService.approveCollaboration(collaboration).subscribe(
        (Success) => {
          this.notificationsService.success('Colaborarea a fost aprobata cu success!', '', {timeOut: 1500});
          this.getCollaborations();
        },
        (err) => {
          this.notificationsService.error('A aparut o eroare!Incercati mai tarziu', '', {timeOut: 1500});
        }
    );
  }

}
