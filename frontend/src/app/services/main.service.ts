import { Injectable } from '@angular/core';
import { CanActivate, ActivatedRouteSnapshot, RouterStateSnapshot, Router, UrlTree } from '@angular/router';
// import {BROWSER_STORAGE} from '../storage/storage';
// import {User} from '../classes/user';
import  {HttpClient, HttpHeaders } from '@angular/common/http';
import {Exercise} from '../interfaces/exercise';
import {User} from '../interfaces/user';
import {Day} from '../interfaces/day';

@Injectable({
  providedIn: 'root'
})
export class MainService {
	apiBaseUrl="http://localhost:3000";
	week=[{}];
	today=[{}];
	months=[{}];
	weekDays:string[]=["Sunday","Monday","Tueday","Wednesday","Thursday","Friday","Saturday","Sunday"];
	monthsNames:string[]=["Jan","Feb","Mar","Apr","May","Jun","Jul","Aug","Sep","Oct","Nov","Dec"];
	user:User={
		name:"",email:"",profilePic:""
	};
	public todayGoals:Exercise[]=[];
	constructor(private http:HttpClient, private router: Router){
		for(let i =0;i< this.weekDays.length;i++) 
			this.week[i]={
				name:this.weekDays[i],value:0
				};
		for(let i =0;i< this.monthsNames.length;i++) 
				this.months[i]={
					name:this.monthsNames[i],value:0
					};
			
	 }
	
	async submitSchedule(todayGoals:any){
		const url=`${this.apiBaseUrl}/schedule/create`;
		return await this.http.post<any>(url,todayGoals,{
			withCredentials:true
		}).toPromise().then((res)=>this.setTodaySchedule(res.todayGoals))
	}	
	async getTodaySchedule(){
		const url=`${this.apiBaseUrl}/schedule/today`;
		await this.http.get<any>(url,{
			withCredentials:true
		}).toPromise().then((res)=>this.setTodaySchedule(res.schedule.exercises)).catch(err=>console.log(err)) 
	}
	setTodaySchedule(todayGoals:Exercise[]){
		// if(!todayGoals||todayGoals.length !== 0)
		// 	window.location.href="http://localhost:4200/schedule"
		this.todayGoals=todayGoals;
		console.log(todayGoals)
	}

	async submitExercise(exerciseId:string,doneDuration:number){
		const exercise={
			exercise:{
				exerciseId:exerciseId,doneDuration:doneDuration
			}
		};
		const url=`${this.apiBaseUrl}/exercise`;
		
		return await this.http.post<any>(url,exercise,{
			withCredentials:true
		}).toPromise().then((res)=>console.log(res))
	}
	getUserProfile():User{
		return this.user;
	}
	setUserProfile(user:User){
		this.user=user;
	}
	async getUser(){
		const url=`${this.apiBaseUrl}/`;
		await this.http.get<any>(url,{
			withCredentials:true
		}).toPromise().then((res)=>this.setUserProfile(res.data.user)).catch(err=>console.log(err)) 

	}
	async getWeeklyData(){

		const url=`${this.apiBaseUrl}/stats/lastweek`;
		await this.http.get<any>(url,{
			withCredentials:true
		}).toPromise().then((res)=>this.setWeekData(res.data)).catch((err)=>console.log(err));
	}
	async getMonthlyData(){

		const url=`${this.apiBaseUrl}/stats/month`;
		await this.http.get<any>(url,{
			withCredentials:true
		}).toPromise().then((res)=>this.setMonthData(res.data)).catch((err)=>console.log(err));
	}
	async getTodayData(){

		const url=`${this.apiBaseUrl}/schedule/today`;
		await this.http.get<any>(url,{
			withCredentials:true
		}).toPromise().then((res)=>this.setTodayData(res.schedule.exercises)).catch((err)=>console.log(err));
	}
	async setTodayData(data:any){
		console.log(data)
		this.today=[];
		for(let i=0;i<data.length;i++){
			this.today[i]={
				name:data[i].name,
				value:data[i].doneDuration
			};
		}
		console.log(this.today);
	
	}
	async setWeekData(data:any){
		console.log(data)
		for(let i=0;i<data.length;i++){
			const temp=new Date(data[i]._id);
			// const key:string=this.weekDays[]
			// console.log("asd")
			this.week[temp.getDay()]={name:this.weekDays[temp.getDay()],
				value:parseInt(data[i].total)};
		}
		console.log(this.week);
	}
	async setMonthData(data:any){
		console.log(data)
		for(let i=0;i<data.length;i++){
			this.months[data[i]._id.month-1]={name:this.monthsNames[data[i]._id.month-1],
				value:parseInt(data[i].total)};
		}
		console.log(this.months);
	}
	getWeekStats(){
		return this.week;
	}
	getTodayStats(){
		return this.today;
	}
	getMonthStats(){
		return this.months;
	}
}
