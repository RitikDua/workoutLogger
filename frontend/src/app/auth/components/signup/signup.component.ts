import { Component, OnInit } from '@angular/core';
import  {Router} from '@angular/router';
import {AuthService} from '../../service/auth.service';

@Component({
  selector: 'app-signup',
  templateUrl: './signup.component.html',
  styleUrls: ['./signup.component.css']
})
export class SignupComponent implements OnInit {
	public formError:string='';
	public credentials={
		name:'',email:'',password:''
	};

  constructor(private router:Router,private authService:AuthService) { }

  ngOnInit(): void {
    	if(this.authService.isLoggedIn()) this.router.navigate(["/profile"])

  }

  errorMsg():boolean{
    console.log(this.formError);
    if(this.formError.length !== 0) return true;
    else return false;
  }
  public onRegisterSubmit():void{
  	this.formError="";
  	if(!this.credentials.name||!this.credentials.email||!this.credentials.password)
  			this.formError="All fields are Required";
  	else this.doRegister();
  }
  private async doRegister(){
  	await this.authService.register(this.credentials)
.then((res)=>{
       this.router.navigate(['/profile'])
      })
  		.catch((msg)=>this.formError=msg);
  }
}
