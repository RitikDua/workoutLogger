import { Injectable } from '@angular/core';
import {USER} from '../interfaces/user';
import {EXERCISE} from '../interfaces/exercise';
import {ExerciseList } from '../interfaces/exerciseList';
import {STAT } from '../interfaces/stat';
import {OneDayStats} from '../interfaces/todayStats';
import {OVERALL} from '../interfaces/data/overall';
import {TODAY} from '../interfaces/data/today';
import {WEEK} from '../interfaces/data/week';
import {AuthResponse} from '../login/classes/authresponse';
import {User} from '../login/classes/user';
import  {HttpClient, HttpHeaders } from '@angular/common/http';
import { Inject} from '@angular/core';
import {BROWSER_STORAGE} from '../login/storage';
import { Observable, throwError } from 'rxjs';
import { catchError, retry } from 'rxjs/operators';
@Injectable({
  providedIn: 'root'
})
export class UserService {
	user:USER;
	exercisesList:ExerciseList[]=[];
	statForToday:STAT;
	userId:string;
	todayStats:OneDayStats[]=[];
	username:string;
	apiBaseUrl="http://localhost:3000";
	exercieseWithTime:string[]=["running","jogging","walking","yoga"];
	weeks:string[]=[
	"sunday","monday","tuesday","wednesday","thursday","friday","saturday"
	];
	constructor(@Inject(BROWSER_STORAGE) private storage:Storage,private http:HttpClient) { 
		
		this.printData();
	}
	createUser():void{

		if(this.isLoggedIn())
		{
			this.http.post<any>(`${this.apiBaseUrl}/api/user`,{"name":this.getCurrentUser().name,"email":this.getCurrentUser().email})
				.subscribe((val)=>{
					if(val!==null)
					{
						this.username=val.username;
						this.userId=val.userId;
						this.saveExercisesList(val.exercisesList);
						this.createEmptyStatForToday();
						console.log(this.username+" "+this.userId)
						console.log(this.exercisesList);
					}
					else{
						console.log(val);
					}
				},(res)=>console.log("constructor of servic completed "+res))
		}
	}
	saveStat(stat:any){

	}
	createEmptyStatForToday():void{
		this.http.post<any>(`${this.apiBaseUrl}/api/add/stat`,{"userId":this.userId,"weight":0,"height":0})
			.subscribe((val)=>{
				console.log("");
			},(res)=>console.log(res),
			()=>console.log("Stat for today is created"))
			this.statForToday={
				date:(new Date()).toString().slice(0,15),
				weight:1,
				height:1,
				todayStats:this.todayStats
			}
	}
	saveExercisesList(exList:any):void{
		if(exList)
			{
				for(let i=0;i<exList.length;i++)
				this.exercisesList[exList[i].day]=exList[i].exercises;
			}
			else{
				for(let i=0;i<this.weeks.length;i++)
				this.exercisesList[this.weeks[i]]=[];		
			}
	}

	
	 addExercises(day:string,exerciseList:string[]):void{
	 	this.exercisesList[day.toLowerCase()]=exerciseList;
	 	let req=[];
	 	for(let i in this.exercisesList){
	 		req.push({
	 			"day":i,
	 			"exercises":this.exercisesList[i]
	 		})
	 	}
	 	this.http.post<any>(`${this.apiBaseUrl}/api/add/exercisesList`,{"userId":this.userId,"exercisesList":req})
	 		.subscribe((val)=>{

	 		},(res)=>console.log(res),()=>console.log("exercisesList is added"))

	}
	
	//it will update one exercise
	//but if a exercise is added and sets and reps are added 
	//you cannot del this for now
	updateOneExercise(i:number,exerciseName:string,exercise:EXERCISE):void{
		this.user.stats[i].todayStats[exerciseName]=exercise;

		this.printData();
	}

	addStatsOfOneExercise(date:string,exerciseName:string,exercise:EXERCISE):void{
	
		let reqExercise={
			"sets":exercise.sets,
			"reps":exercise.reps,
			"hrs":exercise.hrs,
			"mins":exercise.mins,	
		}
		this.todayStats[exerciseName]=exercise;
		this.statForToday.todayStats=this.todayStats;
		this.http.post<any>(`${this.apiBaseUrl}/api/add/stat/todaystat`,
				{"userId":this.userId,
				"exerciseName":exerciseName,
				"exercise":reqExercise}).subscribe(
				(val)=>console.log(),
				(res)=>console.log(res),
				()=>console.log("Todaystat is added")
				)
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
		return this.exercisesList[this.weeks[day]];
	}

	printData():void{
	

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
		if(stat.todayStats==undefined) return 0;
		for(let i in stat.todayStats)
		{
			total+=this.getTimeSpendOnDateUtil(stat.todayStats[i]);
		}
		return total;
	}
	getTodayDataUtil(stat:STAT):TODAY[]{
		let total:TODAY[]=[];
		
		for(let i in stat.todayStats)
		{
			total.push({
				exerciseName:i,time:this.getTimeSpendOnDateUtil(stat.todayStats[i])});
		}
		return total;
	}
	getTodayData():TODAY[]{
		let todayData:TODAY[]=[];
		let todayDate:string=(new Date()).toString().slice(0,15);
		for(let i=0;i<this.user.stats.length;i++)
		{
			if(this.user.stats[i].date===todayDate)
			{
				return this.getTodayDataUtil(this.user.stats[i]);
			}
		}
		return todayData;
	}
	getWeekData():WEEK[]{
			let overall:WEEK[]=[];
		let total:number=0;
		for(let i=0;i<this.user.stats.length;i++)
			{total=0;
				total+=this.getTimeSpendOnDate(this.user.stats[i]);
				overall.push({
					label:this.weeks[new Date(this.user.stats[i].date).getDay()],
					time:total
				})
			}
			
		console.log(overall);

		return overall;

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


	private makeAuthApiCall(urlPath:string,user:User):Promise<AuthResponse>{
		const url:string=`${this.apiBaseUrl}/${urlPath}`;
		return this.http.post(url,user).toPromise().then((res)=>res as AuthResponse).catch((err)=> err);
	}
	


  private getToken():string{
  	return this.storage.getItem("workoutLogger");
  	}
  private saveToken(token:string):void{
  	this.storage.setItem('workoutLogger',token); 
  }
   public login(user:User):Promise<any>{
  	return this.makeAuthApiCall("login",user).then((authResp:AuthResponse)=>this.saveToken(authResp.token));
  }

  public register(user:User):Promise<any>{
  	return this.makeAuthApiCall("signup",user).then((authResp:AuthResponse)=>this.saveToken(authResp.token));
  }
  public logout():void{
  	this.storage.removeItem("workoutLogger");
  }
  public isLoggedIn():boolean{
  	const token:string=this.getToken();
  	if(token){
  		const payload=JSON.parse(atob(token.split('.')[1]));
  		return payload.exp>(Date.now()/1000);
  	}
  	else{
  		return false;
  	}
  }
  public getCurrentUser():User{
  	if(this.isLoggedIn()){
  		const token:string=this.getToken();
  		const {email,name}=JSON.parse(atob(token.split('.')[1]));
  		return {email,name} as User;
  	}
  }
}		