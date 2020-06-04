import { Component, OnInit } from '@angular/core';
import * as pluginAnnotations from 'chartjs-plugin-annotation';
import { ChartDataSets, ChartOptions } from 'chart.js';
import {WEEK} from '../../../interfaces/data/week';
import {ChartType } from 'chart.js';
import { Label } from 'ng2-charts';
import {UserService} from '../../../services/user.service';

@Component({
  selector: 'app-bar-chart',
  templateUrl: './bar-chart.component.html',
  styleUrls: ['./bar-chart.component.css']
})
export class BarChartComponent implements OnInit {

  // public barChartOptions = {
  //   responsive: true
  // };


public barChartOptions: (ChartOptions & { annotation: any }) = {
    // scaleShowVerticalLines: false,
  
    responsive: true,
    legend:{
      display:false
    },
    // scales: {
    //   // We use this empty structure as a placeholder for dynamic theming.
    //   xAxes: [{}],
    //   yAxes: [
    //     {
    //       id: 'y-axis-0',
    //       position: 'left',
    //     },
    //     {
    //       id: 'y-axis-1',
    //       position: 'right',
    //       gridLines: {
    //         color: 'rgba(255,0,0,0.3)',
    //       },
    //       ticks: {
    //         fontColor: 'red',
    //       }
    //     }
    //   ]
    // },
    annotation: {
      annotations: [
        {
          type: 'line',
          mode: 'vertical',
          scaleID: 'x-axis-0',
          value: 'March',
          borderColor: 'green',
          borderWidth: 2,
          label: {
            enabled: true,
            fontColor: 'green',
            content: 'LineAnno'
          }
        },
      ],
    },
  };
    public barChartLabels: Label[] = [];
  public barChartType: ChartType = 'bar';
  public barChartLegend = true;

  public barChartData: ChartDataSets[] = [
  ];
  weeks:string[]=["sunday","monday","tuesday","wednesday","thursday","friday","saturday","sunday"];
    constructor(private userService:UserService) { let overall:WEEK[]=this.userService.getWeekData();
     let timeArr:number[]=[];
     let map=new Map();
     for(let i=0;i<this.weeks.length;i++)
     {
     	map.set(this.weeks[i],0);
     }
     for(let i=0;i<overall.length;i++)
     {
       map.set(overall[i].label,overall[i].time);
     }
     for(let i in map)
     {

     }
     for(let i=0;i<this.weeks.length;i++)
     {this.barChartLabels.push(this.weeks[i]);
      
     	timeArr.push(map.get(this.weeks[i]));}
     this.barChartData.push({data:timeArr,label:" "});
     console.log(overall);
 }

  ngOnInit(): void {
  	// let overall:WEEK[]=this.userService.getWeekData();
   //   let timeArr:number[]=[];
   //   for(let i=0;i<overall.length;i++)
   //   {
   //     this.barChartLabels.push(overall[i].label);
   //    timeArr.push(overall[i].time);
   //   }
   //   this.barChartData.push({data:timeArr,label:""});
   //   console.log(overall);
  }


}
