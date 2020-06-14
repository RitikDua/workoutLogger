import { Component, OnInit } from '@angular/core';
import * as pluginAnnotations from 'chartjs-plugin-annotation';
import { ChartDataSets, ChartOptions } from 'chart.js';
import {OVERALL} from '../../../interfaces/data/overall';

import {UserService} from '../../../services/user.service';
@Component({
  selector: 'app-line-chart',
  templateUrl: './line-chart.component.html',
  styleUrls: [ './line-chart.component.css' ]
})
export class LineChartComponent implements OnInit  {
   // lineChart

    public lineChartLabels = [];
  public lineChartData= [];
  public lineChartType = 'line';
public lineChartOptions: (ChartOptions & { annotation: any }) = {
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

  public lineChartLegend = true;
  // public lineChartType = 'line';
  public lineChartPlugins = [pluginAnnotations];
  constructor(private userService:UserService){
    this.userService.getOverallDataPromise()
      .then((val)=>{
        console.log(val);
        if(val!==null)
        this.userService.saveOverallData(val)
      }).then(()=>{
        let overall:OVERALL[]=this.userService.getOverallData();
     let timeArr:number[]=[];
     for(let i in overall)
     {
       this.lineChartLabels.push(i);
       this.lineChartData.push(overall[i]);
     }
        
      })
  }
  
  
  ngOnInit(){
this.userService.getOverallDataPromise()
      .then((val)=>{
        console.log(val);
        if(val!==null)
        this.userService.saveOverallData(val)
      }).then(()=>{
        let overall:OVERALL[]=this.userService.getOverallData();
     let timeArr:number[]=[];
     for(let i=0;i<overall.length;i++)
     {
       this.lineChartLabels.push(overall[i].label);
       this.lineChartData.push(overall[i].time);
     }
        
      })  }
}
