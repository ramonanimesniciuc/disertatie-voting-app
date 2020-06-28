import { Component, OnInit } from '@angular/core';
import {ProjectsService} from '../services/projects.service';
import {Project} from "../models/project.model";
import {Category} from "../models/category.model";
import {CookieService} from 'ngx-cookie-service';

@Component({
    selector: 'app-landing',
    templateUrl: './landing.component.html',
    styleUrls: ['./landing.component.scss']
})

export class LandingComponent implements OnInit {
  focus: any;
  focus1: any;
    public numbers: any;
    public projects: Project[];
    public categories: Category[];
  constructor(private projectsService: ProjectsService,
              private cookieService: CookieService) { }

  ngOnInit() {
      this.getRecentNumbers();
      this.getProjects();
      this.getCategories();
      console.log(this.cookieService.get('isSponsor'));
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
              this.projects = projects.data.map(x => new Project(x));
              console.log(this.projects);
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
