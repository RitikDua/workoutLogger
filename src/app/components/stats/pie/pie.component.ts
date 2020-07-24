import { Component, OnInit,Input } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';
import { NgxChartsModule } from '@swimlane/ngx-charts';
import {TODAY} from '../../../interfaces/data/today';
import {UserService} from '../../../services/user.service';
var single = [
  {
    "name": "Germany",
    "value": 8940000
  },
  {
    "name": "USA",
    "value": 5000000
  },
  {
    "name": "France",
    "value": 7200000
  },
    {
    "name": "UK",
    "value": 6200000
  }
];
@Component({
  selector: 'app-pie',
  templateUrl: './pie.component.html',
  styleUrls: ['./pie.component.css']
})
export class PieComponent implements OnInit {
	@Input() pie;
single: any[];
  view: any[] = [400, 400];
	todayData:TODAY[]=[];

  
  gradient: boolean = true;
  showLegend: boolean = true;
  showLabels: boolean = true;
  isDoughnut: boolean = false;
  legendPosition: string = 'below';

  colorScheme = {
    domain: ['#5AA454', '#A10A28', '#C7B42C', '#AAAAAA',"#c1414a","#dd9933","#263246","#d3d6da","#7cc640","	#c7d70e","#b15a9f","#5ab16c"]
  };

  constructor(private userService:UserService) {
   //  this.single=this.pie;
   //  // this.todayData=this.userService.getTodayData();
  	// console.log(this.single);
  }

  onSelect(data): void {
    console.log('Item clicked', JSON.parse(JSON.stringify(data)));
  }

  onActivate(data): void {
    console.log('Activate', JSON.parse(JSON.stringify(data)));
  }

  onDeactivate(data): void {
    console.log('Deactivate', JSON.parse(JSON.stringify(data)));
  }
 

  ngOnInit(): void {
setTimeout(()=>{
this.single=this.pie;
    // this.todayData=this.userService.getTodayData();
  	console.log(this.single);

  }
  ,2001)}

}
