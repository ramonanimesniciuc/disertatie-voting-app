import { Component, OnInit } from '@angular/core';
import {ChartDataSets, ChartOptions, ChartType} from 'chart.js';
import {Color, Label, MultiDataSet} from 'ng2-charts';
import {BackofficeService} from '../../services/backoffice.service';

@Component({
  selector: 'app-statistics',
  templateUrl: './statistics.component.html',
  styleUrls: ['./statistics.component.css']
})
export class StatisticsComponent implements OnInit {

  constructor(private backOfficeService: BackofficeService) { }
  public showAgeChart: boolean;
  public rewardsData: any;
  barChartOptions: ChartOptions = {
    responsive: true,
  };
  barChartLabels: Label[] = [];
  barChartType: ChartType = 'bar';
  barChartLegend = true;
  barChartPlugins = [];

  barChartData: ChartDataSets[] = [
    { data: [], label: 'Proiecte/categorii' }
  ];

  doughnutChartLabels: Label[] = ['Sub 30 de ani', 'Intre 30 de ani si 60 ani', 'Peste 60 ani'];
  doughnutChartData: MultiDataSet = [
    [55, 25, 20]
  ];
  doughnutChartType: ChartType = 'doughnut';
  lineChartColors: Color[] = [
    {
      borderColor: 'rgba(175,242,249,0.28)',
      backgroundColor: 'rgba(49,173,204,0.28)',
    },
  ];

  ageChartColors: Color[] = [
    {
      borderColor: 'rgba(13,207,234,0.28)',
      backgroundColor: ['rgba(63,35,171,0.82)', 'rgba(188,170,204,0.28)', 'rgba(85,51,255,0.28)']
    },
  ];
  ngOnInit(): void {
    this.getCategoriesChart();
    this.getAgeChart();
    this.getRewardsData();
  }

  getCategoriesChart() {
    this.backOfficeService.getCategoriesChart().subscribe(
        (data) => {
          console.log(data);
          this.barChartLabels = data.categories;
          this.barChartData[0].data = data.projects;
        }
    );
  }

  getAgeChart() {
    this.backOfficeService.getUsersChartByAge().subscribe(
        (data) => {
          console.log(data);
          this.showAgeChart = true;
          this.doughnutChartData[0][0] = data.under30;
          this.doughnutChartData[0][1] = data.between30and60;
          this.doughnutChartData[0][2] = data.over60;
          console.log(this.doughnutChartData);
        }
    );
  }

  getRewardsData() {
      this.backOfficeService.getRewardData().subscribe((data) => {
       this.rewardsData = data;
      });
  }


}
