import { Injectable } from '@angular/core';
import {USER} from '../interfaces/user';
import {EXERCISE} from '../interfaces/exercise';
import {ExerciseList } from '../interfaces/exerciseList';
import {STAT } from '../interfaces/stat';
import {OneDayStats} from '../interfaces/todayStats';
import {OVERALL} from '../interfaces/data/overall';

@Injectable({
  providedIn: 'root'
})
export class UserService {
	user:USER;

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
	//for today
	getExercisesList():ExerciseList{
		let day=(new Date()).getDay();
		console.log(day);
		this.printData();
		return this.user.exercisesList[this.weeks[day]];
	}

	printData():void{
		console.log(this.user);
	}

	getData(){
			
	}
	//returns time of particular exercise used
	getTimeSpendOnDateUtil(val:EXERCISE):number{
		
		if(val.hrs==null)
		{
			return val.sets*val.reps;
		}	
		else{
			return ((val.hrs/60))+val.mins;
		}
		return 1;
	}
	getTimeSpendOnDate(stat:STAT):number{
		let total:number=0;
		
		for(let i in stat.todayStats)
		{
			total+=this.getTimeSpendOnDateUtil(stat.todayStats[i]);
		}
		return total;
	}
	getOverall():OVERALL[]{
		let overall:OVERALL[]=[];
		let total:number=0;
		for(let i=0;i<this.user.stats.length;i++)
			{total=0;
				total+=this.getTimeSpendOnDate(this.user.stats[i]);
				overall.push({
					label:this.user.stats[i].date,
					time:total
				})
			}
		console.log(overall);

		return overall;
	}
}
