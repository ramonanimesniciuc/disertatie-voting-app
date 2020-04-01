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
    public numbers:any;
  constructor(private projectsService: ProjectsService) { }

  ngOnInit() {
      this.getRecentNumbers();
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

}
