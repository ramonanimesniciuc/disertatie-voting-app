import { Component, OnInit } from '@angular/core';
import {AuthService} from '../services/auth.service';
import {CookieService} from 'ngx-cookie-service';
import {Router} from '@angular/router';
import {FormBuilder, FormControl, FormGroup, Validators} from '@angular/forms';
import {NotifierService} from 'angular-notifier';
import {NotificationsService} from 'angular2-notifications';

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
              private notificationsService: NotificationsService,
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
            this.cookieService.set('token', success.accessToken);
            this.cookieService.set('userName', success.username);
            this.cookieService.set('userPoints', success.points);
            this.authService.username = success.username;
            this.cookieService.set('userLogged', success.id);
            if (success.roles[0] === 'ROLE_SPONSOR') {
                this.cookieService.set('isSponsor', 'true');
            }
            if (success.roles[0] === 'ROLE_ADMIN') {
                this.cookieService.set('isDSU', 'true');
            }
            console.log(this.cookieService.get('isDSU'));
            if (success.roles[0] === 'ROLE_ADMIN' || success.roles[0] === 'ROLE_USER') {
                this.notificationsService.success('Bine ai revenit,' + this.cookieService.get('userName'), '', {timeOut: 1500});
            } else {
                this.notificationsService.success('Bine ai revenit,' + success.name , '', {timeOut: 1500});
            }

            this.router.navigate(['/proiecte']);
          },
          (err) => {
           this.notificationsService.error('Autentificare esuata!Incearca inca o data!', '', {timeOut: 1500});
          }
      );
    }


}
