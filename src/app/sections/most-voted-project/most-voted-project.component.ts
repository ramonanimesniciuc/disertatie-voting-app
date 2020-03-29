import { Component, OnInit } from '@angular/core';
import {ProjectsService} from '../../services/projects.service';

@Component({
  selector: 'app-most-voted-project',
  templateUrl: './most-voted-project.component.html',
  styleUrls: ['./most-voted-project.component.css']
})
export class MostVotedProjectComponent implements OnInit {

  constructor(private projectsService: ProjectsService) { }
 public mostVotedProject: any;
  ngOnInit(): void {
    this.getMostVoted();
  }

  getMostVoted() {
    this.projectsService.getMostVoted().subscribe
    (
        (project) => {
          this.mostVotedProject = project.data;
        },
        (err) => {
          console.log(err);
        }
    );
  }

}
