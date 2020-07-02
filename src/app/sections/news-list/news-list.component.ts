import { Component, OnInit } from '@angular/core';
import {NewsService} from '../../services/news.service';
import {CookieService} from 'ngx-cookie-service';
import {NotificationsService} from 'angular2-notifications';

@Component({
  selector: 'app-news-list',
  templateUrl: './news-list.component.html',
  styleUrls: ['./news-list.component.css']
})
export class NewsListComponent implements OnInit {
  public fakenews: any[];
  constructor(private fakeNewsService: NewsService,
              private notificationsService: NotificationsService,
              public cookieService: CookieService) { }

  ngOnInit(): void {
    this.getFakeNews();
  }

  getFakeNews() {
this.fakeNewsService.getNews().subscribe(
    (news) => {
      this.fakenews = news.data;
    },
    (err) => {
      console.log(err);
    }
);
  }

  goToReadNews(newsId: number) {

  }
  deleteNews(news: any) {
this.fakeNewsService.deleteNews(news.id).subscribe(
    (success) => {
      this.notificationsService.success('Ai sters articolul cu succes!', '', {timeOut: 1500});
      this.getFakeNews();
    },
    (err) => {
      this.notificationsService.error(err.message, '', {timeOut: 1500});
    }
);
  }


}
