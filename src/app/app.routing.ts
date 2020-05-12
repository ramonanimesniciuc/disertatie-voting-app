import { NgModule } from '@angular/core';
import { CommonModule, } from '@angular/common';
import { BrowserModule  } from '@angular/platform-browser';
import { Routes, RouterModule } from '@angular/router';

import { HomeComponent } from './home/home.component';
import { ProfileComponent } from './profile/profile.component';
import { SignupComponent } from './signup/signup.component';
import { LandingComponent } from './landing/landing.component';
import { LoginComponent } from './login/login.component';
import {ProjectPageComponent} from './sections/project-page/project-page.component';
import {AddProjectComponent} from './sections/add-project/add-project.component';
import {BackofficeComponent} from './sections/backoffice/backoffice.component';
import {StatisticsComponent} from './sections/statistics/statistics.component';
import {ManagementComponent} from './sections/management/management.component';
import {AddNewsComponent} from './sections/add-news/add-news.component';
import {NewsListComponent} from './sections/news-list/news-list.component';
import {RewardsComponent} from './sections/rewards/rewards.component';
import {AddVoucherComponent} from "./sections/add-voucher/add-voucher.component";

const routes: Routes = [
    { path: 'home',             component: HomeComponent },
    { path: 'user-profile',     component: ProfileComponent },
    { path: 'register',           component: SignupComponent },
    { path: 'proiecte',          component: LandingComponent },
    { path: 'stiri',          component: NewsListComponent },

    {
    path: 'proiecte/:id',
      component: ProjectPageComponent
    },
    {
        path: 'adauga-proiect',
        component: AddProjectComponent
    },
    {
        path: 'backoffice',
        component: BackofficeComponent,
        children: [
            {
                path: 'statistici',
                component: StatisticsComponent
            },
            {path: 'management', component: ManagementComponent},
            {path: 'adauga-stire', component: AddNewsComponent},
            {path: 'adauga-voucher', component: AddVoucherComponent }
        ]
    },
    { path: 'login',          component: LoginComponent },
    {path: 'recompense', component: RewardsComponent},
    { path: '', redirectTo: 'home', pathMatch: 'full' }
];

@NgModule({
  imports: [
    CommonModule,
    BrowserModule,
    RouterModule.forRoot(routes, {
      useHash: true
    })
  ],
  exports: [
  ],
})
export class AppRoutingModule { }
