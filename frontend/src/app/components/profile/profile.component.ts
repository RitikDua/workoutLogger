import { Component, OnInit } from '@angular/core';
import {MainService} from '../../services/main.service'
import { Router} from '@angular/router';

export interface Tile {
  color: string;
  cols: number;
  rows: number;
  text: string;
}

@Component({
  selector: 'app-profile',
  templateUrl: './profile.component.html',
  styleUrls: ['./profile.component.css']
})

export class ProfileComponent implements OnInit {
  loading:boolean=true;
  tiles: Tile[] = [
    {text: 'line', cols: 3, rows: 1, color: 'rgba (252,252,252,0.9) '},
    {text: 'user', cols: 1, rows: 2, color: 'rgba (252,252,252,0.9) '},
    {text: 'pie', cols: 1, rows: 1, color: 'rgba (252,252,252,0.9) '},
    {text: 'bar', cols: 2, rows: 1, color: 'rgba (252,252,252,0.9) '},
  ];
  constructor(private mainService:MainService,private router:Router) { 
  	// this.loading=this.mainService.todayGoals.length
  }

  ngOnInit(): void {
  
  	if(this.mainService.todayGoals&&this.mainService.todayGoals.length!==0){
  		this.loading=false;
  		  		console.log(this.mainService.todayGoals)
  	}
  	else{
  		this.mainService.getTodaySchedule().then(()=>{
		if(!this.mainService.todayGoals||this.mainService.todayGoals.length===0) this.router.navigate(['/schedule']);
  
  			this.loading=false;}).catch((err)=>console.log(err));
  	}
  }

}
