import { Component, OnInit } from '@angular/core';
import {BackofficeService} from '../../../services/backoffice.service';
import {Router} from '@angular/router';

@Component({
  selector: 'app-approve-project',
  templateUrl: './approve-project.component.html',
  styleUrls: ['./approve-project.component.css']
})
export class ApproveProjectComponent implements OnInit {
  public pendingProject: any[];
  constructor(private backofficeService: BackofficeService,
              private router:Router) { }

  ngOnInit(): void {
    this.getPendingProjects();
  }

  getPendingProjects() {
    this.backofficeService.getProjectsInPendding().subscribe
    (
        (projects) => {
          this.pendingProject = projects.data;
        },
        (Err) => {
          console.log(Err);
        }
    );
  }
  private goToProjectPage(project: any) {
    this.router.navigate(['proiecte/' +  project.id]);
  }

}
