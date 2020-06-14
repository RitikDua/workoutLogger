import { Component, OnInit } from '@angular/core';
import {TODAY} from '../../../interfaces/data/today';

import {UserService} from '../../../services/user.service';

// import * as pluginDataLabels from 'chartjs-plugin-datalabels';

@Component({
  selector: 'app-pie-chart',
  templateUrl: './pie-chart.component.html',
  styleUrls: ['./pie-chart.component.css']
})
export class PieChartComponent implements OnInit {
  public pieChartLabels = [];
  public pieChartData = [];
  public pieChartType = 'pie';
 public pieChartColors = [
    {
      backgroundColor:["#003f5c",
                      "#2f4b7c",
                      "#665191",
                      "#a05195",
                      "#d45087",
                      "#f95d6a",
                      "#ff7c43",
                      "#ffa600"]
    },
  ];

  constructor(private userService:UserService){
  this.userService.getTodayDataPromise().then((val)=>{
              console.log(val);
              if(val!==null)
              this.userService.saveTodayData(val.todayStats);
          
  }).then(()=>{
  let today:TODAY[]=this.userService.getTodayData();
  console.log(today);
     // let timeArr:number[]=[];
     for(let i=0;i<today.length;i++)
     {
       this.pieChartLabels.push(today[i].exerciseName);
       this.pieChartData.push(today[i].time);
     }
  }  
  )
}
  ngOnInit(): void { 
  }
}
