import { Inject,Injectable } from '@angular/core';
import {BROWSER_STORAGE} from '../storage/storage';
import {User} from '../classes/user';
import {AuthResponse} from '../classes/authresponse';

@Injectable({
  providedIn: 'root'
})
export class AuthService {

  constructor(@Inject(BROWSER_STORAGE) private storage:Storage) { }

   public getToken():string{
  	const token:any=this.storage.getItem("login");
  	if(!token) return "";

  	return token;
  }
  private saveToken(token:string):void{
  	this.storage.setItem('login',token); 
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
