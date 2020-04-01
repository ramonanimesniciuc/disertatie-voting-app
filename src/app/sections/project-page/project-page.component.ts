import { Component, OnInit } from '@angular/core';
import {ProjectsService} from '../../services/projects.service';
import {ActivatedRoute} from '@angular/router';
import {CookieService} from 'ngx-cookie-service';
import {BackofficeService} from '../../services/backoffice.service';

@Component({
  selector: 'app-project-page',
  templateUrl: './project-page.component.html',
  styleUrls: ['./project-page.component.css']
})
export class ProjectPageComponent implements OnInit {

  constructor(private projectsService: ProjectsService,
              private cookieService: CookieService,
              private backofficeService: BackofficeService,
              private activatedRoute: ActivatedRoute) { }
  private projectId: any;
  private project: any;
  public showVote = false;
  public comment: string;
  ngOnInit(): void {
    this.activatedRoute.params.subscribe(
        (params) => {
          this.projectId = params.id;
          this.getProjectById();
        }
    );
  }

  private getProjectById() {
    this.projectsService.getProjectById(this.projectId).subscribe(
        (project) => {
          this.project = project.data;
        }
    );
  }

  increaseVotes() {
    // tslint:disable-next-line:radix
    const votes = this.project.votes;
    this.projectsService.increaseNumberOfVotes(this.projectId, parseInt(this.cookieService.get('userLogged'),2), votes + 1).subscribe(
        (success) => {
          console.log(success);
          this.getProjectById();
        },
        (err) => {
          console.log(err);
        }
    );
  }

    approveProject(projectId: any){
this.backofficeService.approveProject(projectId).subscribe(
    (success) => {
        console.log('project approved');
        this.getProjectById();
        location.reload();
    },
    (err) => {
        console.log('err aprove');
    }
);
    }

    deleteProject(projectId:any){
      this.backofficeService.deleteProject(projectId).subscribe
      (
          (success) => {
              console.log('project deleted');
              this.getProjectById();
              location.reload();
          },
          (err) => {
              console.log(err);
          }
      );
    }

  addComment() {
    const comment = {
      contet: this.comment,
      // tslint:disable-next-line:radix
      UserId: parseInt(this.cookieService.get('userLogged')),
      ProjectId: this.projectId
    };
    this.projectsService.addComment(comment).subscribe(
        (success) => {
          console.log(success);
        },
        (err) => {
          console.log(err);
        }
    );
  }

  checkVote() {
    if (this.cookieService.get('userLogged')) {
      this.projectsService.checkVote(this.projectId, this.cookieService.get('userLogged')).subscribe(
          (success) => {
            if (success.hasVoted) {
              this.showVote = false;
            } else {
              this.showVote = true;
            }
          },
          (err) => {
            this.showVote = true;
          }
      );
    }

  }

}
