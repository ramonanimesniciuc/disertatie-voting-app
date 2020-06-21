import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { SponsorSignUpComponent } from './sponsor-sign-up/sponsor-sign-up.component';
import { AddThemeComponent } from './add-theme/add-theme.component';
import { ThemeProjectsComponent } from './theme-projects/theme-projects.component';
import {ReactiveFormsModule} from "@angular/forms";



@NgModule({
  declarations: [SponsorSignUpComponent, AddThemeComponent, ThemeProjectsComponent],
    imports: [
        CommonModule,
        ReactiveFormsModule
    ]
})
export class SponsorsModule { }
