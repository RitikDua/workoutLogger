import { Injectable } from '@angular/core';
// import {USER} from '../interfaces/user';

import {AuthResponse} from '../login/classes/authresponse';
import {User} from '../login/classes/user';
import  {HttpClient, HttpHeaders } from '@angular/common/http';
import { Inject} from '@angular/core';
import {BROWSER_STORAGE} from '../login/storage/storage';
import { Observable, throwError } from 'rxjs';
import { catchError, retry } from 'rxjs/operators';
import { Router} from '@angular/router';
import {ExerciseList } from '../interfaces/exerciseList';
import {STAT } from '../interfaces/stat';
import {OneDayStats} from '../interfaces/todayStats';
import {TODAY} from '../interfaces/data/today';
import {EXERCISE} from '../interfaces/exercise';

@Injectable({
  providedIn: 'root'
})
export class UserService {
	exercisesList:ExerciseList[]=[];
  userId:string;
  weeks:string[]=[
  "sunday","monday","tuesday","wednesday","thursday","friday","saturday"
  ];
	username:string;
	apiBaseUrl="http://localhost:3000";
	statForToday:STAT;
  todayData:TODAY[]=[];
  todayStats:OneDayStats[]=[];

	constructor(@Inject(BROWSER_STORAGE) private storage:Storage,private http:HttpClient,private router:Router) { 
		if(this.isLoggedIn())
		{
			console.log("isLoggedIn")

			this.router.navigateByUrl("/profile");	
		}
		else{
			this.router.navigateByUrl("/login");
		}
	}
  getUsername():string{
    return this.username;
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
           console.log(this.exercisesList);
           console.log(val);
       },(res)=>console.log(res),()=>console.log("exercisesList is added"))
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
          
        },(res)=>console.log("constructor of service completed "+res))
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

  addStatsOfOneExercise(date:string,exerciseName:string,exercise:EXERCISE):void{
  console.log(exercise);
    let reqExercise={
      "sets":exercise.sets,
      "reps":exercise.reps,
      "hrs":exercise.hrs,
      "mins":exercise.mins,  
    }

    this.todayStats[exerciseName]=exercise;
    // this.statForToday.todayStats=this.todayStats;
    // console.log(reqExercise);
    this.http.post<any>(`${this.apiBaseUrl}/api/add/stat/todaystat`,
        {"userId":this.userId,
        "exerciseName":exerciseName,
        "exercise":reqExercise}).subscribe(
        (val)=>console.log(val),
        (res)=>console.log(res),
        ()=>{
          console.log("Todaystat is added")
          
          // this.createTodayData()
        })

  }
  createTodayData(){
    let todayDate:string=(new Date()).toString().slice(0,15);
    this.http.post<any>(`${this.apiBaseUrl}/api/stats/ondate`,
          {"date":todayDate,"userId":this.userId})
          .subscribe(
            (val)=>
            {  console.log(val);
              if(val!==null)
              this.saveTodayData(val.todayStats);
            },(res)=>console.log(res),
            ()=>console.log("Today stat its completed")
            )    

  }
  createEmptyStatForToday():void{
    this.http.post<any>(`${this.apiBaseUrl}/api/add/stat`,{"userId":this.userId,"weight":0,"height":0})
      .subscribe((val)=>{
        console.log("");
      },(res)=>console.log(res),
      ()=>{console.log("Stat for today is created")
      this.statForToday={
        date:(new Date()).toString().slice(0,15),
        weight:1,
        height:1,
        todayStats:this.todayStats}
      console.log(this.statForToday);
      })

      
  }
  getTodayData():any{
    return this.todayStats;
  }
  saveTodayData(val:any):void{
    // console.log(val[0]);

    this.todayData=[];
    for(let i=0;i<val.length;i++)
    {let temp:EXERCISE={
      sets:val[i].exercise.sets,
      mins:val[i].exercise.mins,
      hrs:val[i].exercise.hrs,
      reps:val[i].exercise.reps,
      }
      this.todayData.push({
        exerciseName:val[i].exerciseName,
        time:this.getTimeSpendOnDateUtil(temp)
      })
    }
    
  }
  //for today
  getExercisesList():ExerciseList{
    let day=(new Date()).getDay();
    console.log(this.weeks[day]);

    return this.exercisesList[this.weeks[day]];
  }
  //returns time of particular exercise used
  getTimeSpendOnDateUtil(val:EXERCISE):number{
    
    if(!(val.hrs||val.hrs))
    {
      return val.sets*val.reps;
    }  
    else{
      if(!val.hrs) val.hrs=0;
      return ((val.hrs/60))+val.mins;
    }
    return 1;
  }

    getProfileExercisesList():ExerciseList[]{
      return this.exercisesList;
    }
getOverallDataPromise(){
    let todayDate:string=(new Date()).toString().slice(0,15);
    
    return this.http.post<any>(`${this.apiBaseUrl}/api/stats/overall`,
          {"userId":this.userId}).toPromise();
  }
  /***For Authentication***/

  private makeAuthApiCall(urlPath:string,user:User):Promise<AuthResponse>{
		const url:string=`${this.apiBaseUrl}/${urlPath}`;
		return this.http.post(url,user).toPromise().then((res)=>res as AuthResponse).catch((err)=> err);
	}
	

   getTodayDataPromise(){
    let todayDate:string=(new Date()).toString().slice(0,15);
    
    const res=  this.http.post<any>(`${this.apiBaseUrl}/api/stats/ondate`,
          {"date":todayDate,"userId":this.userId}).toPromise()
    return res;
  }

  private getToken():string{
  	return this.storage.getItem("login");
  	}
  private saveToken(token:string):void{
  	this.storage.setItem('login',token); 
  }
   public login(user:User):Promise<any>{
  	return this.makeAuthApiCall("login",user).then((authResp:AuthResponse)=>this.saveToken(authResp.token));
  }

  public register(user:User):Promise<any>{
  	return this.makeAuthApiCall("signup",user).then((authResp:AuthResponse)=>this.saveToken(authResp.token));
  }
  public logout():void{
  	this.storage.removeItem("login");
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