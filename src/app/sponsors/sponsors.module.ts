import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { SponsorSignUpComponent } from './sponsor-sign-up/sponsor-sign-up.component';
import { AddThemeComponent } from './add-theme/add-theme.component';
import { ThemeProjectsComponent } from './theme-projects/theme-projects.component';
import {FormsModule, ReactiveFormsModule} from '@angular/forms';
import {SharedModule} from '../shared/shared.module';
import { SponsorsThemesPresentationComponent } from './sponsors-themes-presentation/sponsors-themes-presentation.component';
import {NgbCarouselModule} from '@ng-bootstrap/ng-bootstrap';



@NgModule({
    declarations: [SponsorSignUpComponent, AddThemeComponent, ThemeProjectsComponent, SponsorsThemesPresentationComponent],
    exports: [
        SponsorsThemesPresentationComponent
    ],
    imports: [
        CommonModule,
        ReactiveFormsModule,
        SharedModule,
        NgbCarouselModule,
        FormsModule
    ]
})
export class SponsorsModule { }
