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

	exercieseWithTime:string[]=["running","jogging","walking","yoga"];
	weeks:string[]=[
	"sunday","monday","tuesday","wednesday","thursday","friday","saturday"
	];
	constructor() { 
		this.user={username:"Ritik",
					exercisesList:[],
					stats:[]
				};

		this.user.stats.push({
			date:(new Date()).toString().slice(0,15),
			weight:0,
			height:0,
			todayStats:[],
		})
		this.printData();
	}
	addExercises(day:string,exerciseList:string[]):void{
		// this.exercisesList[day]=exerciseList;
		this.user.exercisesList[day]=exerciseList;
		
		this.printData();
	}
	//it will update one exercise
	//but if a exercise is added and sets and reps are added 
	//you cannot del this for now
	updateOneExercise(i:number,exerciseName:string,exercise:EXERCISE):void{
		this.user.stats[i].todayStats[exerciseName]=exercise;

		this.printData();
	}
	addStatsOfOneExercise(date:string,exerciseName:string,exercise:EXERCISE):void{
		for(let i=0;i<this.user.stats.length;i++)
		{
			if(this.user.stats[i].date===date){
				this.updateOneExercise(i,exerciseName.toLowerCase(),exercise);
				break;
			}
		}

		this.printData();
	}
	//exercise which required the mins and hrs
	isTime(exerciseName:string):boolean{
		if(this.exercieseWithTime.indexOf(exerciseName)>-1) return true;
		return false;
	}
	addStatsOfExercises(date:string,weight:number,height:number,todayStats:OneDayStats[]):void{
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
		console.log(day);
		this.printData();
		return this.user.exercisesList[this.weeks[day]];
	}
	printData():void{
		console.log(this.user);
	}

}
