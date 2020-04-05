import { Component, OnInit } from '@angular/core';
import {FakeNewsService} from '../../services/fake-news.service';

@Component({
  selector: 'app-news-list',
  templateUrl: './news-list.component.html',
  styleUrls: ['./news-list.component.css']
})
export class NewsListComponent implements OnInit {
  public fakenews: any[];
  constructor(private fakeNewsService: FakeNewsService) { }

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

  goToReadNews(newsId: number){

  }

}
