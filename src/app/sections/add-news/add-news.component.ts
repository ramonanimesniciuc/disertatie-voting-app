import { Component, OnInit } from '@angular/core';
import {FormBuilder, FormControl, FormGroup} from '@angular/forms';
import {CookieService} from 'ngx-cookie-service';
import {BackofficeService} from '../../services/backoffice.service';
declare const tinymce;
@Component({
  selector: 'app-add-news',
  templateUrl: './add-news.component.html',
  styleUrls: ['./add-news.component.css']
})


export class AddNewsComponent implements OnInit {
  private formGroup: FormGroup;
  constructor(private formBuilder: FormBuilder,
              private cookieService: CookieService,
              private backofficeService: BackofficeService) { }

  ngOnInit() {
    this.formGroup = this.formBuilder.group({
      title: new FormControl(''),
      description: new FormControl(''),
      createdAt: new FormControl(new Date()),
      addedBy: new FormControl(this.cookieService.get('userLogged'))
    });

  }
  public onReady( editor ) {
    editor.ui.getEditableElement().parentElement.insertBefore(
        editor.ui.view.toolbar.element,
        editor.ui.getEditableElement()
    );
  }

  addNews() {
    console.log(this.formGroup.value);
    this.backofficeService.addNews(this.formGroup.value).subscribe(
        (success) => {
          console.log(success);
          tinymce.activeEditor.setContent('');
          this.formGroup.reset();
        },
        (err) => {
          console.log(err);
        }
    );
  }

  onTextChanged($event){
    this.formGroup.get('description').setValue($event);
  }

}
