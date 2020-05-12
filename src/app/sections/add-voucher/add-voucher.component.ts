import { Component, OnInit } from '@angular/core';
import {FormBuilder, FormControl, FormGroup, Validators} from "@angular/forms";
import {RewardsService} from "../../services/rewards.service";
import {NotificationsService} from "angular2-notifications";
declare const tinymce;
@Component({
  selector: 'app-add-voucher',
  templateUrl: './add-voucher.component.html',
  styleUrls: ['./add-voucher.component.css']
})
export class AddVoucherComponent implements OnInit {
  public formGroup: FormGroup;
  constructor(public rewardsService: RewardsService,
              private notificationsService: NotificationsService,
              private formBuilder: FormBuilder) { }

  ngOnInit(): void {
    this.formGroup = this.formBuilder.group({
      title: new FormControl(''),
      description: new FormControl('', Validators.required),
      points: new FormControl(0, Validators.required),
      createdAt: new FormControl( new Date()),
      updatedAt: new FormControl( new Date()),
      expiresAt: new FormControl(new Date())
    });
  }

  onTextChanged($event){
this.formGroup.get('description').setValue($event);
  }

  addVoucher(){
    this.rewardsService.addVoucher(this.formGroup.value).subscribe(
        (success) => {
          this.notificationsService.success('Voucher adaugat!','',{timeOut:1500});
          this.formGroup.reset();
          tinymce.activeEditor.setContent('');
        }
    );
  }

}
