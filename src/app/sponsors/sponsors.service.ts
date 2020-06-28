import { Injectable } from '@angular/core';
import {HttpService} from '../services/http.service';

@Injectable({
  providedIn: 'root'
})
export class SponsorsService {

  constructor(protected  http: HttpService) { }

  public getSponsorsThemes(){
    return this.http.get('sponsors-themes');
  }

  public getSponsorsProjects(sponsorId: any){
    return this.http.get('projectsbysponsor/' + sponsorId);
  }

  public approveProject(projectId: any){
    return this.http.get('project-approved-by-sponsor/' + projectId);
  }
}
