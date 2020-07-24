import { Component, OnInit } from '@angular/core';
import {FormControl, FormGroup} from '@angular/forms';
import {UserService} from '../../services/user.service';

@Component({
  selector: 'app-stats',
  templateUrl: './stats.component.html',
  styleUrls: ['./stats.component.css']
})
export class StatsComponent implements OnInit {
pie:object[]=[];
dates:any=[];
check=false;
  constructor(private userService:UserService) {

  }
  date():void{this.check=!this.check;
  	// return this.check;
  }
  ngOnInit(): void {
  	setTimeout(()=>{
  		this.pie=[];
  		let total=0;
      this.userService.getTodayDataPromise().then((val)=>{
              
       for(let i=0;i<val.todayStats.length;i++)
       {
       		this.pie.push({
       			"name":val.todayStats[i].exerciseName,

       			"value":this.userService.getTimeSpendOnDateUtil(val.todayStats[i].exercise)
       		})
       		total+=this.pie[i]["value"];
       }
          } ).then(()=>{

       for(let i=0;i<this.pie.length;i++)
       {
       this.pie[i]["value"]=(parseFloat((100*this.pie[i]["value"]/total).toFixed(2)));
       }
       console.log(this.pie);  	
          })
       
  },1000);

  	setTimeout(()=>{
  		this.dates=[];
  		let temp=new Set();
  		let total=[];
      this.userService.getOverallDataPromise().then((val)=>{
            total=val;
            })
      .then(()=>{
      		for(let i of total.values())
      			temp.add(i.date);

      }).then(()=>{
      	this.dates=Array.from(temp);
      })
       
  },1000);
  }

}
