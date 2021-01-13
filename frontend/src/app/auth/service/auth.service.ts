import { Inject,Injectable } from '@angular/core';
import { CanActivate, ActivatedRouteSnapshot, RouterStateSnapshot, Router, UrlTree } from '@angular/router';
import {BROWSER_STORAGE} from '../storage/storage';
import {User} from '../classes/user';
import  {HttpClient, HttpHeaders } from '@angular/common/http';

import {AuthResponse} from '../classes/authresponse';

@Injectable({
  providedIn: 'root'
})
export class AuthService {

	apiBaseUrl="http://localhost:3000";
  constructor(@Inject(BROWSER_STORAGE) private storage:Storage,private http:HttpClient, private router: Router) { }

   public getToken():string{
  	const token:any=this.storage.getItem("workout-login");
  	if(!token) return "";

  	return token;
  }
  private saveToken(token:any):void{
    console.log(token);
  	this.storage.setItem('workout-login',token); 
  }
 public isLoggedIn():boolean{
  	const token:string=this.getToken();
  	if(token){
  		const payload=JSON.parse(atob(token.split('.')[1]));
  		return payload.exp>(Date.now()/1000); //jwt expiry time default setItem
  	}
  	else{
  		return false;
  	}
  }
  public getCurrentUser():User{
  		const token=this.getToken();
  		const {email,name}=JSON.parse(atob(token.split('.')[1]));
  
  	if(this.isLoggedIn()){
  		return {email,name} as User;
  	}
  	else {
  		//route to login
		this.router.navigate(['/login'])
  		return {email,name} as User;
	}	
  }

	private makeAuthApiCall(urlPath:string,user:User):Promise<AuthResponse>{
		const url:string=`${this.apiBaseUrl}/${urlPath}`;
		return this.http.post(url,user,{
      withCredentials:true,
    }).toPromise().then((res)=>{
      console.log(res);
      return  res as AuthResponse});
	}
	public login(user:User):Promise<any>{
  	return this.makeAuthApiCall("login",user).then((authResp:any)=>{
      // console.log(authResp);
      this.saveToken(authResp.data.token)

  });
  }

  public register(user:User):Promise<any>{
  	return this.makeAuthApiCall("signup",user).then((authResp:any)=>this.saveToken(authResp.data.token));
  }
  public logout():void{
  	this.storage.removeItem("workout-login");
		this.router.navigate(['/login'])
  }
	
}
