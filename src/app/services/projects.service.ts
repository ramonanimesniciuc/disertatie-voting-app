import { Injectable } from '@angular/core';
import {HttpClient} from '@angular/common/http';
import {HttpService} from './http.service';


@Injectable({
  providedIn: 'root'
})
export class ProjectsService {

  constructor(private http: HttpService) { }

  getCategories() {
    return this.http.get('categories');
  }

  addComment(comment: any) {
    return this.http.post('comments', comment);
  }

  addCollaboration(projectId: number, userId: any) {
    return this.http.post('collaborations', {projectId: projectId, userId: userId, status: 'NOK'});
  }

  checkProjectCollaboration(projectId: number, userId: any) {
    return this.http.get('collaboration/' + projectId + '/' + userId);
  }

  getProjects() {
    return this.http.get('projects');
  }

  getFilteredProjects(CategoryId: number) {
    return this.http.get('filterprojects/' + CategoryId);
  }

  getProjectsByCategory(categoryId: any) {
    return this.http.get('projects/category/' + categoryId);
  }

  getProjectById(projectId: number) {
    return this.http.get('projects/' + projectId);
  }

  addProject(project: any) {
    return this.http.post('projects', project);
  }

  increaseNumberOfVotes(projectId: number, userId: any , Novotes: any) {
    return this.http.post('projects/' + projectId + '/votes', {UserId: userId, votes: Novotes});
  }

  checkVote(projectId: any, userId: any) {
    return this.http.get('check-vote/' + projectId + '/' + userId);
  }

  getMostVoted() {
    return this.http.get('mostvoted');
  }

  getRecentNumbers() {
    return this.http.get('recentnumbers');
  }

  getUserOfProject(userId: number) {
    return this.http.get('projectUser/' + userId);
  }
}
