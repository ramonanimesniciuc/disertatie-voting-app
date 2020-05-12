import { Injectable } from '@angular/core';
import {HttpService} from './http.service';

@Injectable({
  providedIn: 'root'
})
export class RewardsService {

  constructor(private http: HttpService) { }

  public getRewards() {
    return this.http.get('rewards');
  }

  public getRewardsUser(userId: number) {
    return this.http.get('rewardsUser/' + userId);
  }

  public buyVoucher(buy: any) {
    return this.http.post('buyVoucher', buy);
  }

  public addVoucher(voucher:any){
    return this.http.post('vouchers', voucher);
  }

  public getUserPoints(userId: any){
    return this.http.get('userpoints/' + userId);
  }
}
