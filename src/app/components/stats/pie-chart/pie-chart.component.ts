import { Component, OnInit } from '@angular/core';
import {TODAY} from '../../../interfaces/data/today';

import {UserService} from '../../../services/user.service';

@Component({
  selector: 'app-pie-chart',
  templateUrl: './pie-chart.component.html',
  styleUrls: ['./pie-chart.component.css']
})
export class PieChartComponent implements OnInit {
  public pieChartLabels = [];
  public pieChartData = [];
  public pieChartType = 'pie';

  constructor(private userService:UserService){
  let today:TODAY[]=this.userService.getTodayData();
     // let timeArr:number[]=[];
     for(let i=0;i<today.length;i++)
     {
       this.pieChartLabels.push(today[i].exerciseName);
       this.pieChartData.push(today[i].time);
     }
  }
  ngOnInit(): void { 
  }

}
