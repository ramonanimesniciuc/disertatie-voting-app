import { Injectable } from '@angular/core';
import {HttpService} from './http.service';

@Injectable({
  providedIn: 'root'
})
export class NewsService {

  constructor(private httpService: HttpService) { }

  public getNews() {
    return this.httpService.get('news');
  }

  public addNews(news: any) {
    return this.httpService.post('news', news);
  }

  public deleteNews(newsId: any){
    return this.httpService.get('deletenews/' + newsId);
  }
}
