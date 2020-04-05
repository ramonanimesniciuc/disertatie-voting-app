import {Component, Input, OnInit} from '@angular/core';
import {ProjectsService} from '../../services/projects.service';
import {Router} from '@angular/router';

@Component({
  selector: 'app-project-list',
  templateUrl: './project-list.component.html',
  styleUrls: ['./project-list.component.css']
})
export class ProjectListComponent implements OnInit {

  constructor(private projectService: ProjectsService,
              private router: Router) { }
  // public projects: any[];
  @Input('projects')projects:any[];
  ngOnInit(): void {
    // this.getProjects();
  }

  private getProjects() {
    this.projectService.getProjects().subscribe(
        (projects) => {
          this.projects = projects.data;
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
