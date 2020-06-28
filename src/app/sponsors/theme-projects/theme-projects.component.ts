import { Component, OnInit } from '@angular/core';
import {SponsorsService} from '../sponsors.service';
import {CookieService} from 'ngx-cookie-service';
import {NotificationsService} from 'angular2-notifications';

@Component({
  selector: 'app-theme-projects',
  templateUrl: './theme-projects.component.html',
  styleUrls: ['./theme-projects.component.css']
})
export class ThemeProjectsComponent implements OnInit {
  public projects: any[];
  constructor(private sponsorsService: SponsorsService,
              private notificationService: NotificationsService,
              private cookieService: CookieService) { }

  ngOnInit(): void {
    this.getProjectsBySponsors();
  }

  getProjectsBySponsors() {
    this.sponsorsService.getSponsorsProjects(this.cookieService.get('userLogged')).subscribe(
        (projects) => {
          this.projects = projects.data;
        }
    );
  }

  approveProject(project: any) {
  this.sponsorsService.approveProject(project).subscribe(
      (success) => {
       this.notificationService.info('Ai aprobat proiectul cu succes', '', 5000);
      },
      (err) => {
        this.notificationService.error('Nu am putut aproba proiectul!', 'Incearca mai tarziu', 5000);
      }
  );
  }

}
