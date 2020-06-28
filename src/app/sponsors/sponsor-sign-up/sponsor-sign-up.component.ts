import { Component, OnInit } from '@angular/core';
import {FormBuilder, FormControl, FormGroup, Validators} from '@angular/forms';
import {AuthService} from '../../services/auth.service';
import {NotificationsService} from 'angular2-notifications';
declare const tinymce;
@Component({
  selector: 'app-sponsor-sign-up',
  templateUrl: './sponsor-sign-up.component.html',
  styleUrls: ['./sponsor-sign-up.component.css']
})
export class SponsorSignUpComponent implements OnInit {

  constructor(private formBuilder: FormBuilder,
              private authService: AuthService,
              private notificationsService: NotificationsService) { }
  signUpForm: FormGroup;
  isVoucher: boolean;
  isTheme: boolean;
  ngOnInit(): void {
    this.signUpForm = this.formBuilder.group({
      name: new FormControl('', Validators.required),
      username: new FormControl('', Validators.required),
      password: new FormControl('', Validators.required),
      email: new FormControl('', Validators.required),
      createdAt: new FormControl(new Date()),
      theme_title: new FormControl('', Validators.required),
      theme_description : new FormControl('', Validators.required),
        reward : new FormControl('', Validators.required),
        type: new FormControl('')
    }
    );
  }

   registerSponsor() {
      if (this.isTheme) {
          this.signUpForm.get('type').setValue('theme');
      } else {
          this.signUpForm.get('type').setValue('voucher');
      }
   this.authService.registerSponsor(this.signUpForm.value).subscribe(
       (success) => {
           this.signUpForm.reset();
           this.isTheme = false;
           this.isVoucher = false;
           tinymce.activeEditor.setContent('');
       this.notificationsService.success('Contul a fost creat cu success!Vei primi un email cand un reprezent DSU v-a aproba contul tau.', '', 6000);
       }
   );
   }

    changeThemeSelection($event) {
      this.isTheme = !this.isTheme;
      if (this.isTheme) {
          this.isVoucher = false;
      }
    }

    changeVoucherSelection($event) {
      this.isVoucher = !this.isVoucher;
      if (this.isVoucher) {
          this.isTheme = false;
      }
    }

   onTextChanged($event) {
    this.signUpForm.get('theme_description').setValue($event);
   }
}
