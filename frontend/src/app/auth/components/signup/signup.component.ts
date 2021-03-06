import { Component, OnInit } from '@angular/core';
import  {Router} from '@angular/router';
import {AuthService} from '../../service/auth.service';
import {MatSnackBar} from '@angular/material/snack-bar';

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

  constructor(private _snackBar: MatSnackBar,private router:Router,private authService:AuthService) { }

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
       this.router.navigate(['/add'])
      })
  		.catch((msg)=>{this.formError=msg

                  this._snackBar.open("Username/email already exist", "ERROR", {
                  duration: 2000,
                });
      });
  }
}
