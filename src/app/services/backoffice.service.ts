import { Injectable } from '@angular/core';
import {HttpService} from './http.service';

@Injectable({
  providedIn: 'root'
})
export class BackofficeService {
  public currentScreen: string;
  constructor(private httpService: HttpService) { }

  addNews(news: any) {
    return this.httpService.post('news', news);
  }

  approveCollaboration(collaboration:any){
    return this.httpService.get('approve-collaboration/' + collaboration.id);
  }
  getNews() {
    return this.httpService.get('news');
  }

  getCollaborations(){
    return this.httpService.get('project-collaborations');
  }

  getUserBySearch(searchItem: string) {
    return this.httpService.get('users/' + searchItem);
  }

  deleteUser(userId: number) {
    return this.httpService.get('deleteUser/' + userId);
  }
  deleteProject(projectId: number) {
    return this.httpService.get('deleteProject/' + projectId);
  }

  approveProject(projectId:number){
    return this.httpService.get('approveProject/' + projectId);
  }
  getProjectsInPendding(){
    return this.httpService.get('pendingprojects');
  }

  getCategoriesChart(){
      return this.httpService.get('categoriesChartData');
  }

  getUsersChartByAge(){
      return this.httpService.get('usersAgeChart');
  }
  updateUserRole(userID:number){
    return this.httpService.get('updateUserToAdmin/' + userID);
  }

  approveSponsor(sponsorId: number){
    return this.httpService.get('approveSponsor/' + sponsorId);
  }

  getCommnetsToday(){
    return this.httpService.get('commentsToday');
  }

  getRewardData(){
    return this.httpService.get('rewardsData');
  }

  getSponsorsWithoutApproval(){
    return this.httpService.get('sponsorswithoutapproval');
  }
}
