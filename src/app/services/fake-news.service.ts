import { Injectable } from '@angular/core';
import {HttpService} from './http.service';

@Injectable({
  providedIn: 'root'
})
export class FakeNewsService {

  constructor(private httpService: HttpService) { }

  public getNews() {
    return this.httpService.get('news');
  }

  public addNews(news: any) {
    return this.httpService.post('news', news);
  }
}
