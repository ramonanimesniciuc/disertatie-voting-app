import {Component, OnInit, ViewChild} from '@angular/core';
import {ProjectsService} from '../../services/projects.service';
import {ActivatedRoute, Router} from '@angular/router';
import {CookieService} from 'ngx-cookie-service';
import {BackofficeService} from '../../services/backoffice.service';
import {NotificationsService} from 'angular2-notifications';
declare const tinymce;
@Component({
  selector: 'app-project-page',
  templateUrl: './project-page.component.html',
  styleUrls: ['./project-page.component.css']
})
export class ProjectPageComponent implements OnInit {

  constructor(private projectsService: ProjectsService,
              private cookieService: CookieService,
              private notificationsService: NotificationsService,
              private backofficeService: BackofficeService,
              private router: Router,
              private activatedRoute: ActivatedRoute) { }
  private projectId: any;
  private project: any;
  public showVote = false;
  public comment: string;
  public projectUser: any;
  @ViewChild('projectContent')projectContent ;
  ngOnInit(): void {
    this.activatedRoute.params.subscribe(
        (params) => {
          this.projectId = params.id;
          this.getProjectById();
          this.checkVote();
        }
    );

  }

  private getProjectById() {
    this.projectsService.getProjectById(this.projectId).subscribe(
        (project) => {
          this.project = project.data;
          if (!this.project) {
              setTimeout(() => {
                  this.router.navigate['/proiecte'];
              }, 7000);
          }
          this.getUser();
        }
    );
  }

  getUser() {
      this.projectsService.getUserOfProject(this.project.userId).subscribe(
          (user) => {
              this.projectUser = user.user;
          }
      );
  }

  increaseVotes() {
    // tslint:disable-next-line:radix
    const votes = this.project.votes;
    console.log(this.cookieService.get('userLogged'));
    this.projectsService.increaseNumberOfVotes(this.projectId, this.cookieService.get('userLogged'), votes + 1).subscribe(
        (success) => {
          console.log(success);
          this.getProjectById();
          this.notificationsService.success('Ati votat cu success acest proiect!');
          setTimeout(() => {
              location.reload();
          }, 1000);
        },
        (err) => {
          console.log(err);
          this.notificationsService.error('Proiectul nu a putut fi votat.Incearca mai tarziu!');
        }
    );
  }

    onTextChanged($event) {
this.comment = $event;
    }

    approveProject(projectId: any) {
this.backofficeService.approveProject(projectId).subscribe(
    (success) => {
        console.log('project approved');
        this.getProjectById();
        location.reload();
        this.notificationsService.success('Proiectul a fost aprobat!');
    },
    (err) => {
        console.log('err aprove');
        // this.notificationsService.error('A aparut o eroare la aprobarea proiectului!');
        this.notificationsService.success('Proiectul a fost aprobat!');
        location.reload();
    }
);
    }

    deleteProject(projectId: any) {
      this.backofficeService.deleteProject(projectId).subscribe
      (
          (success) => {
              console.log('project deleted');
              this.getProjectById();
              this.notificationsService.success('Proiectul a fost sters!');
          },
          (err) => {
              console.log(err);
              this.notificationsService.error('A aparut o eroare la stergerea proiectului!');
          }
      );
    }

  addComment() {
    const comment = {
      content: this.comment,
      // tslint:disable-next-line:radix
      userId: parseInt(this.cookieService.get('userLogged')),
      projectId: this.projectId
    };
    this.projectsService.addComment(comment).subscribe(
        (success) => {
          console.log(success);
          this.comment = '';
            tinymce.activeEditor.setContent('');
            this.notificationsService.success('Comentariul a fost adaugat!');
            this.getProjectById();
        },
        (err) => {
          console.log(err);
          this.notificationsService.error(err);
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
