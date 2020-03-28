import { Component, OnInit } from '@angular/core';
import {AuthService} from '../services/auth.service';
import {CookieService} from 'ngx-cookie-service';
import {Router} from '@angular/router';
import {FormBuilder, FormControl, FormGroup, Validators} from '@angular/forms';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.css']
})
export class LoginComponent implements OnInit {
  focus;
  focus1;
  constructor(private authService: AuthService,
              private router: Router,
              private formBuilder: FormBuilder,
              private cookieService: CookieService) { }
  private group: FormGroup;
  ngOnInit() {
    this.cookieService.deleteAll();
    console.log(this.cookieService);
    this.group = this.formBuilder.group({
      username: new FormControl('', Validators.required),
      password: new FormControl('' , Validators.required)
    });
  }

    login() {
      // console.log(this.group.value);
      this.authService.login(this.group.value).subscribe(
          (success) => {
            console.log('success');
            console.log(success);
            this.cookieService.set('token', success.token);
            this.cookieService.set('userLogged', success._id);
            if (success.isDsu === true) {
                this.cookieService.set('isDSU', 'true');
            }
            console.log(this.cookieService.get('isDSU'));
            this.router.navigate(['/proiecte']);
          }
      );
    }


}
