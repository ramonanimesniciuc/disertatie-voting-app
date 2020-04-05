import { Component, OnInit } from '@angular/core';
import {FormBuilder, FormControl, FormGroup} from '@angular/forms';
import {AuthService} from '../services/auth.service';

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

    public formGroup: FormGroup;
    constructor(private formBuilder: FormBuilder,
                public authService: AuthService) { }

    ngOnInit() {
        this.formGroup = this.formBuilder.group({
            last_name: new FormControl(),
            first_name: new FormControl(),
            username: new FormControl(),
            email: new FormControl(),
            password: new FormControl(),
            birthdate: new FormControl(),
            createdAt: new FormControl(new Date()),
            phone: new FormControl(),
            roles:new FormControl(['admin'])
        });

    }

    registerUser() {
        this.authService.register(this.formGroup.value).subscribe(
            (success) => {
                console.log(success);
            },
            (err) => {
                console.log(err);
            }
        );
    }
}
