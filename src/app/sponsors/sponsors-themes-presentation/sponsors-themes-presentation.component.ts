import {Component, EventEmitter, OnInit, Output} from '@angular/core';
import {SponsorsService} from '../sponsors.service';
import {NotificationsService} from 'angular2-notifications';

@Component({
  selector: 'app-sponsors-themes-presentation',
  templateUrl: './sponsors-themes-presentation.component.html',
  styleUrls: ['./sponsors-themes-presentation.component.css']
})
export class SponsorsThemesPresentationComponent implements OnInit {
  public themes = [];
  @Output()selectedTheme = new EventEmitter();
  constructor(private sponsorsService: SponsorsService,
              private notificationsService: NotificationsService) { }


  ngOnInit(): void {
    this.getSponsorsThemes();

  }

  getSponsorsThemes() {
    this.sponsorsService.getSponsorsThemes().subscribe(
        (themes) => {
          this.themes = themes.data;
        },
        (err) => {
          this.notificationsService.error('Eroare la incarcare', 'Temele propuse de sponsori nu s-au putut incarca!', 5000);
        }
    );
  }
  emitSelectedTheme(themeId: any){
    this.selectedTheme.emit(themeId);
  }
}
