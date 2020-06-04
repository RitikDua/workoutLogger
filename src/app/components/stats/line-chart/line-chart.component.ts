import { Component, OnInit } from '@angular/core';
import * as pluginAnnotations from 'chartjs-plugin-annotation';
import { ChartDataSets, ChartOptions } from 'chart.js';

@Component({
  selector: 'app-line-chart',
  templateUrl: './line-chart.component.html',
  styleUrls: [ './line-chart.component.css' ]
})
export class LineChartComponent implements OnInit  {
   // lineChart
    public lineChartLabels = ['Sales Q1', 'Sales Q2', 'Sales Q3', 'Sales Q4'];
  public lineChartData = [120, 150, 180, 90];
  public lineChartType = 'line';
public lineChartOptions: (ChartOptions & { annotation: any }) = {
    responsive: true,
    scales: {
      // We use this empty structure as a placeholder for dynamic theming.
      xAxes: [{}],
      yAxes: [
        {
          id: 'y-axis-0',
          position: 'left',
        },
        {
          id: 'y-axis-1',
          position: 'right',
          gridLines: {
            color: 'rgba(255,0,0,0.3)',
          },
          ticks: {
            fontColor: 'red',
          }
        }
      ]
    },
    annotation: {
      annotations: [
        {
          type: 'line',
          mode: 'vertical',
          scaleID: 'x-axis-0',
          value: 'March',
          borderColor: 'orange',
          borderWidth: 2,
          label: {
            enabled: true,
            fontColor: 'orange',
            content: 'LineAnno'
          }
        },
      ],
    },
  };
  public lineChartLegend = true;
  // public lineChartType = 'line';
  public lineChartPlugins = [pluginAnnotations];
  constructor(){

  }
  ngOnInit(){

  }
  
}
