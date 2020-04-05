import { Component, OnInit } from '@angular/core';
import {ProjectsService} from '../services/projects.service';

@Component({
    selector: 'app-landing',
    templateUrl: './landing.component.html',
    styleUrls: ['./landing.component.scss']
})

export class LandingComponent implements OnInit {
  focus: any;
  focus1: any;
    public numbers: any;
    public projects: any[];
    public categories: any[];
  constructor(private projectsService: ProjectsService) { }

  ngOnInit() {
      this.getRecentNumbers();
      this.getProjects();
      this.getCategories();
  }

    private getRecentNumbers() {
        this.projectsService.getRecentNumbers().subscribe(
            (numbers) => {
                this.numbers = numbers;
            },
            (err) => {
                console.log(err);
            }
        );
    }

    private getCategories() {
      this.projectsService.getCategories().subscribe(
          (categories) => {
              this.categories = categories.data;
          }
      );
    }

    private getProjects() {
      this.projectsService.getProjects().subscribe(
          (projects) => {
              this.projects = projects.data;
          }
      );
    }

    private getFilteredProject(categoryId) {
      this.projectsService.getFilteredProjects(categoryId).subscribe(
          (projects) => {
              this.projects = projects.data;
          },
          (err) => {
              console.log(err);
          }
      );
    }

}
