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
}
