import { Component, OnInit } from '@angular/core';
import {RewardsService} from '../../services/rewards.service';
import {NotificationsService} from 'angular2-notifications';
import {CookieService} from 'ngx-cookie-service';

@Component({
  selector: 'app-rewards',
  templateUrl: './rewards.component.html',
  styleUrls: ['./rewards.component.css']
})
export class RewardsComponent implements OnInit {
  public rewardsAvailable: any[];
  public rewardsByUser: any[];
  public userPoints: any;
  constructor(private rewardsService: RewardsService,
              public cookieService: CookieService,
              private notificationsService: NotificationsService) { }

  ngOnInit(): void {
      this.userPoints = 0;
    this.getRewards();
    this.getRewardsByUser();
    this.getPoints();
  }

  getRewards() {
    this.rewardsService.getRewards().subscribe(
        (rewards) => {
          this.rewardsAvailable = rewards.data;
        },
        (err) => {
          this.notificationsService.error('Eroare la aducerea de vouchere!', '', {timeOut: 1500});
        }
    );
  }

  getRewardsByUser() {
    this.rewardsService.getRewardsUser(Number(this.cookieService.get('userLogged'))).subscribe(
        (rewards) => {
          this.rewardsByUser = rewards.data;
        },
        (err) => {
          this.notificationsService.error('Nu am putut aduce voucherele dvs.!', '', {timeOut: 1500});
        }
    );
  }

  buyVoucher(voucher: any) {
  return this.rewardsService.buyVoucher({
      userId: this.cookieService.get('userLogged'),
      rewardId: voucher.id,
      pointsRemainig: Number( this.cookieService.get('userPoints')) - voucher.points
  }).subscribe(
      (success) => {
          this.notificationsService.success(success.message, '', {timeOut: 1500});
          this.getPoints();
      }
  );
  }

  getPoints() {
  this.rewardsService.getUserPoints(this.cookieService.get('userLogged')).subscribe(
      (result) => {
        this.userPoints = result.points;
      }
  );
  }

}
