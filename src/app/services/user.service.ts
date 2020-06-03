import { Injectable } from '@angular/core';
import {USER} from '../interfaces/user';
import {EXERCISE} from '../interfaces/exercise';
import {ExerciseList } from '../interfaces/exerciseList';
import {STAT } from '../interfaces/stat';
import {OneDayStats} from '../interfaces/todayStats';

@Injectable({
  providedIn: 'root'
})
export class UserService {
	user:USER;
	stats:STAT[];
	exercisesList:ExerciseList;
	exercise:EXERCISE;

	weeks:string[]=[
	"monday","tuesday","wednesday","thursday","friday","saturday","sunday"
	];
	constructor() { 
		this.user={username:"Ritik",
					exercisesList:[],
					stats:[]
				};
		
		this.printData();
	}
	addExercises(day:string,exerciseList:string[]):void{
		// this.exercisesList[day]=exerciseList;
		this.user.exercisesList[day]=exerciseList;
		
		this.printData();
	}
	updateOneExercise(i:number,exerciseName:string,exercise:EXERCISE):void{
		this.user.stats[i].todayStats[exerciseName]=exercise;

		this.printData();
	}
	addStatsOfOneExercise(date:Date,exerciseName:string,exercise:EXERCISE):void{
		for(let i=0;i<this.user.stats.length;i++)
		{
			if(this.user.stats[i].date===date){
				this.updateOneExercise(i,exerciseName,exercise);
				break;
			}
		}

		this.printData();
	}
	addStatsOfExercises(date:Date,weight:number,height:number,todayStats:OneDayStats[]):void{
		for(let i=0;i<this.user.stats.length;i++)
		{
			if(this.user.stats[i].date===date){
				this.user.stats[i].todayStats=todayStats;
				this.user.stats[i].weight=weight;
				this.user.stats[i].height=height;
				break;
			}
		}
		this.printData();
	}
	getExercisesList():ExerciseList{
		let day=(new Date()).getDay();
		
		this.printData();
		return this.user.exercisesList[this.weeks[day]];
	}
	printData():void{
		console.log(this.user);
	}

}
