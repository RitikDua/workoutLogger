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
            // this.createEmptyStatForToday();
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

    getProfileExercisesList():ExerciseList[]{
      return this.exercisesList;
    }

  /***For Authentication***/

  private makeAuthApiCall(urlPath:string,user:User):Promise<AuthResponse>{
		const url:string=`${this.apiBaseUrl}/${urlPath}`;
		return this.http.post(url,user).toPromise().then((res)=>res as AuthResponse).catch((err)=> err);
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