import { Component, OnInit } from '@angular/core';
import {FormBuilder, FormControl, FormGroup, Validators} from '@angular/forms';
import {AuthService} from '../services/auth.service';
import {NotificationsService} from 'angular2-notifications';

@Component({
    selector: 'app-signup',
    templateUrl: './signup.component.html',
    styleUrls: ['./signup.component.scss']
})
export class SignupComponent implements OnInit {
    test: Date = new Date();
    focus;
    focus1;
    focus2;
    public gdpr = false;
    public formGroup: FormGroup;
    public minAge: any;
    constructor(private formBuilder: FormBuilder,
                private notificationsService: NotificationsService,
                public authService: AuthService) { }

    ngOnInit() {
        this.formGroup = this.formBuilder.group({
            last_name: new FormControl('', Validators.required),
            first_name: new FormControl('', Validators.required),
            username: new FormControl('', Validators.required),
            email: new FormControl('', Validators.email),
            password: new FormControl('', Validators.minLength(8)),
            birthdate: new FormControl('', Validators.required),
            createdAt: new FormControl(new Date()),
            phone: new FormControl('', Validators.required),
            roles: new FormControl(['user'])
        });

    }

    get password() {
        return this.formGroup.get('password');
    }

    registerUser() {
        const today = new Date();
        this.minAge = new Date(today.getFullYear() - 18, today.getMonth(), today.getDate());
        if (new Date(this.formGroup.get('birthdate').value).getFullYear() > today.getFullYear() - 18) {
            this.notificationsService.error('Varsta necesara este de 18 ani!', '', {timeOut: 1500});
        } else {
            this.authService.register(this.formGroup.value).subscribe(
                (success) => {
                    console.log(success);
                    this.formGroup.reset();
                    this.notificationsService.success('Te-ai inregistrat cu success!', '', {timeOut: 1500});
                },
                (err) => {
                    this.notificationsService.error(err.message);
                }
            );
        }

    }
}
