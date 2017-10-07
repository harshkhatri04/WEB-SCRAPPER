import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'app-chart',
  templateUrl: './chart.component.html',
  styleUrls: ['./chart.component.css']
})
export class ChartComponent implements OnInit {

  constructor() {}

  ngOnInit() {}

  // lineChart data for Gandhimathi Appliances Ltd.
  public lineChartData: Array < any > = [
    { data: [172.25, 169.7, 172.65, 170.85, 186.5, 179.5, 176.85, 179.25, 178.2, 179.0, 174.7, 186.85, 180.7], label: 'Gandhimathi Appliances Ltd.' },

  ];
  public lineChartLabels: Array < any > = ['2017-09-01', '2017-09-04', '2017-09-05', '2017-09-06', '2017-09-07', '2017-09-08', '2017-09-11', '2017-09-12', '2017-09-13', '2017-09-14', '2017-09-15', '2017-09-18', '2017-09-19'];

//line chart data for Havells India Ltd.
  public lineChartData1: Array < any > = [
    { data: [492.3, 492.95, 492.25, 492.70, 488.10, 496.80, 506.95, 500.90, 504.85, 506.65, 511.25, 510.65], label: 'Havells India Ltd.' },

  ];
  public lineChartLabels1: Array < any > = ['2017-09-04', '2017-09-05', '2017-09-06', '2017-09-07', '2017-09-08', '2017-09-11', '2017-09-12', '2017-09-13', '2017-09-14', '2017-09-15', '2017-09-18', '2017-09-19'];

  public lineChartOptions: any = {
    responsive: true
  };

// color for chart
  public lineChartColors: Array < any > = [{ 
    backgroundColor: 'rgba(148,159,177,0.2)',
    borderColor: 'rgba(148,159,177,1)',
    pointBackgroundColor: 'rgba(148,159,177,1)',
    pointBorderColor: '#fff',
    pointHoverBackgroundColor: '#fff',
    pointHoverBorderColor: 'rgba(148,159,177,0.8)'
  }];
  public lineChartLegend: boolean = true;

  //chart type
  public lineChartType: string = 'line';

  
  // events of charts
  
  public chartHovered(e: any): void {
  }
}
