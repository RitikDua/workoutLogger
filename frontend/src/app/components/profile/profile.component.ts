import { Component, OnInit } from '@angular/core';
import {MainService} from '../../services/main.service'

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
    {text: 'line', cols: 3, rows: 1, color: 'lightblue'},
    {text: 'user', cols: 1, rows: 2, color: 'lightgreen'},
    {text: 'pie', cols: 1, rows: 1, color: 'lightpink'},
    {text: 'bar', cols: 2, rows: 1, color: '#DDBDF1'},
  ];
  constructor(private mainService:MainService) { 
  	// this.loading=this.mainService.todayGoals.length
  }

  ngOnInit(): void {
  
  	if(this.mainService.todayGoals&&this.mainService.todayGoals.length!==0){
  		this.loading=false;
  		  		console.log(this.mainService.todayGoals)
  	}
  	else{
  		this.mainService.getTodaySchedule().then(()=>this.loading=false).catch((err)=>console.log(err));

  	}
  }

}
