import { Component, OnInit } from '@angular/core';
import {FormBuilder, FormControl, FormGroup, Validators} from "@angular/forms";

@Component({
  selector: 'app-sponsor-sign-up',
  templateUrl: './sponsor-sign-up.component.html',
  styleUrls: ['./sponsor-sign-up.component.css']
})
export class SponsorSignUpComponent implements OnInit {

  constructor(private formBuilder: FormBuilder) { }
  signUpForm: FormGroup;
  ngOnInit(): void {
    this.signUpForm = this.formBuilder.group({
      name: new FormControl('',Validators.required),
      username: new FormControl('', Validators.required),
      password: new FormControl('', Validators.required),
      email: new FormControl('',Validators.required),
      
    })
  }

}
