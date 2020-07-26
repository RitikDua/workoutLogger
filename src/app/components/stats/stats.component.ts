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
bar:object[]=[];
dates:any=[];
check=false;
check1=false;
check2=false;
weeks:string[]=[
  "sunday","monday","tuesday","wednesday","thursday","friday","saturday"
  ];
username:string="";
  constructor(private userService:UserService) {
    this.username=this.userService.getUsername();
  }
  date():void{this.check=!this.check;
  	// return this.check;
  }
  ngOnInit(): void {

this.check=false;
this.check1=false;
this.check2=false;
    let tempOverall=[0,0,0,0,0,0,0];
    setTimeout(()=>{
      this.dates=[];
      let temp=new Set();
      let total=[];
      this.userService.getOverallDataPromise().then((val)=>{
            total=val;
            console.log(val);
            })
      .then(()=>{
          for(let i of total.values())
            {temp.add(i.date);
              tempOverall[new Date(i.date).getDay()]+=10;
            }
      }).then(()=>{
        console.log(tempOverall);
        this.dates=Array.from(temp);
      }).then(()=>
     {this.check1=true;
     })
       
  },500);
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
          }).then(()=>{
            this.check=true;
          })
       
  },550);
    setTimeout(()=>{
      this.bar=[];
      let total=0;
        for(let i=0; i<7;i++)
        {
          this.bar.push({
            name:this.weeks[i],
            value:tempOverall[i]
          })
        if(i==6) this.check2=true;
        }
console.log(this.bar)

  },600);

  }

}
