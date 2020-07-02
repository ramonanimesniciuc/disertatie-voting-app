import { Component, OnInit } from '@angular/core';
import {FormBuilder, FormControl, FormGroup, Validators} from '@angular/forms';
import {CookieService} from 'ngx-cookie-service';
import {ProjectsService} from '../../services/projects.service';
import {NotificationsService} from 'angular2-notifications';
declare const tinymce;
@Component({
  selector: 'app-add-project',
  templateUrl: './add-project.component.html',
  styleUrls: ['./add-project.component.css']
})
export class AddProjectComponent implements OnInit {
  private group: FormGroup;
  private categories: any[];
  private content: string;
  public theme: any;
  constructor(private formBuilder: FormBuilder,
              private notificationsService: NotificationsService,
              private cookieService: CookieService,
              private projectsService: ProjectsService) { }

  ngOnInit() {
    this.group = this.formBuilder.group({
      title: new FormControl('', Validators.required),
      categoryId: new FormControl('', Validators.required),
      content: new FormControl('', Validators.required),
      // tslint:disable-next-line:radix
      userId: new FormControl(parseInt(this.cookieService.get('userLogged'))),
      createdAt: new FormControl(new Date()),
      shortDescription: new FormControl('', Validators.required),
      activeInvolvement: new FormControl(false, Validators.required),
      votes: new FormControl(0),
      statusId: new FormControl(1),
        hasSponsorTheme: new FormControl(null)
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
    onThemeSelected($event) {
      this.theme = $event;
      this.group.get('hasSponsorTheme').setValue($event.id);
    }

    deleteTheme() {
      this.theme = null;
    }

  onTextChanged($event) {
    this.group.get('content').setValue($event);
  }

  addProject() {
    console.log(this.group.value);
    this.group.get('createdAt').setValue(new Date());
    this.projectsService.addProject(this.group.value).subscribe(
        (success) => {
          console.log(success.data);
          this.group.get('content').setValue('');
          tinymce.activeEditor.setContent('');
          this.content = '';
          this.group.reset();
          this.group.get('userId').setValue(this.cookieService.get('userLogged'));
          this.notificationsService.success('Proiect adaugat cu success', '', {timeOut: 1500});
          this.theme = null;
        },
        (err) => {
            this.notificationsService.error('Eroare la adaugarea proiectului!', '', {timeOut: 1500});
        }
    );

  }
}



