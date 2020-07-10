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
  public showCollaborate = false;
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
                  // tslint:disable-next-line:no-unused-expression
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
              console.log(this.projectUser);
              console.log(this.cookieService.get('userLogged'));
              console.log(this.cookieService.get('isDSU'));
             this.checkCollaboration();
          }
      );
  }

  checkCollaboration() {
  this.projectsService.checkProjectCollaboration(this.projectId, this.cookieService.get('userLogged')).subscribe(
      (success) => {
          if (success.checked === true && success.status) {
              this.showCollaborate = false;
              this.notificationsService.info('Felicitari.Esti inscris ca si colaborator!', '', {timeOut: 1500});
          } else {
              if (success.status) {
                  this.notificationsService.info(success.status, '', {timeOut: 1500});
              } else {
                  this.showCollaborate = true;
              }

          }
      },
      (err) => {
          this.notificationsService.error('Nu am putut verifica colaborarile acestui proiect!', '', {timeOut: 1500});
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
          this.notificationsService.success('Ati votat cu success acest proiect!' , '' , {timeOut: 1500});
          setTimeout(() => {
              location.reload();
          }, 1000);
        },
        (err) => {
          console.log(err);
          this.notificationsService.error('Proiectul nu a putut fi votat.Incearca mai tarziu!', '', {timeOut: 1500});
        }
    );
  }

    onTextChanged($event) {
this.comment = $event;
    }

    approveProject(projectId: any) {
this.backofficeService.approveProject(projectId).subscribe(
    (success) => {
        this.getProjectById();
        location.reload();
        this.notificationsService.success('Proiectul a fost aprobat!', 'Acesta va fi disponibil in pagina de proiecte', {timeOut: 3500});
    },
    (err) => {
        // this.notificationsService.error('A aparut o eroare la aprobarea proiectului!');
        this.notificationsService.success('Proiectul a fost aprobat!', '', {timeOut: 1500});
        location.reload();
    }
);
    }

    deleteProject(projectId: any) {
      this.backofficeService.deleteProject(projectId).subscribe
      (
          (success) => {
              this.getProjectById();
              this.notificationsService.success('Proiectul a fost sters!',  'Acesta nu va mai putea fi accesat!' , {timeOut: 2500});
          },
          (err) => {
              this.notificationsService.error('A aparut o eroare la stergerea proiectului!', 'Incercati mai tarziu!', {timeOut: 1500});
          }
      );
    }

    collaborate(projectId: number, userId: any) {
this.projectsService.addCollaboration(projectId, userId).subscribe(
    (success) => {
        this.notificationsService.info(success.message, '', {timeOut: 1500});
        this.getProjectById();
    },
    (err) => {
        this.notificationsService.error(err.message, '', {timeOut: 1500});
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
          this.comment = '';
            tinymce.activeEditor.setContent('');
            this.notificationsService.success('Comentariul a fost adaugat!', '', {timeOut: 1500});
            this.getProjectById();
        },
        (err) => {
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
