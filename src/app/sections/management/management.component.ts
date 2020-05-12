import { Component, OnInit } from '@angular/core';
import {BackofficeService} from "../../services/backoffice.service";

@Component({
  selector: 'app-management',
  templateUrl: './management.component.html',
  styleUrls: ['./management.component.css']
})
export class ManagementComponent implements OnInit {
  public comments:any;
  constructor(private backofficeService: BackofficeService) { }

  ngOnInit(): void {
    this.getComments();

  }

  getComments(){
    this.backofficeService.getCommnetsToday().subscribe((success)=>{
      console.log(success);
      this.comments = success.comments;
    });
  }

}
