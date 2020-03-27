import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { NgbModule } from '@ng-bootstrap/ng-bootstrap';
import { FormsModule } from '@angular/forms';
import { NouisliderModule } from 'ng2-nouislider';
import { JwBootstrapSwitchNg2Module } from 'jw-bootstrap-switch-ng2';
import { RouterModule } from '@angular/router';

import { SectionsComponent } from './sections.component';
import { ButtonsSectionComponent } from './buttons-section/buttons-section.component';
import { InputsSectionComponent } from './inputs-section/inputs-section.component';
import { CrsSectionComponent } from './crs-section/crs-section.component';
import { NavigationSectionComponent } from './navigation-section/navigation-section.component';
import { TabsSectionComponent } from './tabs-section/tabs-section.component';
import { AlertsSectionComponent } from './alerts-section/alerts-section.component';
import { TypographySectionComponent } from './typography-section/typography-section.component';
import { AngularSectionComponent } from './angular-section/angular-section.component';
import { NucleoSectionComponent } from './nucleo-section/nucleo-section.component';
import { VersionsSectionComponent } from './versions-section/versions-section.component';
import { NgbdModalComponent } from './modal/modal.component';
import { NgbdModalContent } from './modal/modal.component';
import { MostVotedProjectComponent } from './most-voted-project/most-voted-project.component';
import { ProjectListComponent } from './project-list/project-list.component';
import {ProjectsService} from '../services/projects.service';
import {HttpService} from '../services/http.service';
import {HttpClient, HttpClientModule} from '@angular/common/http';
import { ProjectPageComponent } from './project-page/project-page.component';
import { AddProjectComponent } from './add-project/add-project.component';
import {AppModule} from '../app.module';
import {SharedModule} from '../shared/shared.module';

@NgModule({
  declarations: [
    SectionsComponent,
    ButtonsSectionComponent,
    InputsSectionComponent,
    CrsSectionComponent,
    NavigationSectionComponent,
    TabsSectionComponent,
    AlertsSectionComponent,
    TypographySectionComponent,
    AngularSectionComponent,
    NucleoSectionComponent,
    VersionsSectionComponent,
    NgbdModalComponent,
    NgbdModalContent,
    MostVotedProjectComponent,
    ProjectListComponent,
    ProjectPageComponent,
    AddProjectComponent
  ],
  entryComponents: [NgbdModalContent],
    imports: [
        CommonModule,
        FormsModule,
        NgbModule,
        RouterModule,
        NouisliderModule,
        HttpClientModule,
        SharedModule,
        JwBootstrapSwitchNg2Module,
    ],
    exports: [SectionsComponent, ProjectListComponent],
  providers:[ProjectsService, HttpService , HttpClient]
})
export class SectionsModule { }
