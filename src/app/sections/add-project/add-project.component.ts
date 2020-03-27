import { Component, OnInit } from '@angular/core';
import {FormBuilder, FormControl, FormGroup} from '@angular/forms';
import {CookieService} from 'ngx-cookie-service';
import {ProjectsService} from '../../services/projects.service';

@Component({
  selector: 'app-add-project',
  templateUrl: './add-project.component.html',
  styleUrls: ['./add-project.component.css']
})
export class AddProjectComponent implements OnInit {
  private group: FormGroup;
  private categories: any[];
  private content: string;
  constructor(private formBuilder: FormBuilder,
              private cookieService: CookieService,
              private projectsService: ProjectsService) { }

  ngOnInit() {
    this.group = this.formBuilder.group({
      title: new FormControl(''),
      CategoryId: new FormControl(''),
      content: new FormControl(''),
      // tslint:disable-next-line:radix
      UserId: new FormControl(parseInt(this.cookieService.get('userLogged'))),
      createdAt: new FormControl(new Date()),
      votes: new FormControl(0)
    });
    this.getCategories();
  }

  public onReady( editor ) {
    editor.ui.getEditableElement().parentElement.insertBefore(
        editor.ui.view.toolbar.element,
        editor.ui.getEditableElement()
    );
  }

  getCategories() {
    this.projectsService.getCategories().subscribe(
        (categories) => {
          this.categories = categories.data;
        },
        (err) => {
          console.log(err);
        }
    );
  }

  onTextChanged($event){
    this.group.get('content').setValue($event);
  }

  addProject() {
    this.group.get('createdAt').setValue(new Date());
    this.projectsService.addProject(this.group.value).subscribe(
        (success) => {
          console.log(success.data);
          this.group.reset();
        }
    );

  }
}



