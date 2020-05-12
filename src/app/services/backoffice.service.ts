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

  getNews() {
    return this.httpService.get('news');
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

  getCommnetsToday(){
    return this.httpService.get('commentsToday');
  }
}
