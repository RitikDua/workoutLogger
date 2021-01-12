import { Component, OnInit } from '@angular/core';
import { NgxChartsModule } from '@swimlane/ngx-charts';
import {MainService} from '../../../services/main.service';
export var single = [
  // {
  //   "name": "Germany",
  //   "value": 8940000
  // },
  // {
  //   "name": "USA",
  //   "value": 5000000
  // },
  // {
  //   "name": "France",
  //   "value": 7200000
  // }
];

export var multi = [
  {
    "name": "Germany",
    "series": [
      {
        "name": "2010",
        "value": 7300000
      },
      {
        "name": "2011",
        "value": 8940000
      }
    ]
  },

  {
    "name": "USA",
    "series": [
      {
        "name": "2010",
        "value": 7870000
      },
      {
        "name": "2011",
        "value": 8270000
      }
    ]
  },

  {
    "name": "France",
    "series": [
      {
        "name": "2010",
        "value": 5000002
      },
      {
        "name": "2011",
        "value": 5800000
      }
    ]
  }
];

@Component({
  selector: 'app-bar',
  templateUrl: './bar.component.html',
  styleUrls: ['./bar.component.css']
})
export class BarComponent implements OnInit {
single: any[]=[];
  multi: any[]=[];

  view: any[] = [700, 400];

  // options
  showXAxis = true;
  showYAxis = true;
  gradient = false;
  showLegend = true;
  showXAxisLabel = true;
  xAxisLabel = 'WeekDay';
  showYAxisLabel = true;
  yAxisLabel = 'value';

  colorScheme = {
    domain: ['#5AA454', '#A10A28', '#C7B42C', '#AAAAAA']
  };

  constructor(private mainService:MainService) {
    // Object.assign(this.mainService.getWeekStats(), { single })
    // console.log(this.single);
  }

  onSelect(event:any) {
    console.log(event);
  }
  ngOnInit(): void {
  	this.mainService.getWeeklyData().then(()=>{
  		this.single=(this.mainService.getWeekStats())
  	}).catch((Err)=>console.log(Err));
  }

}
