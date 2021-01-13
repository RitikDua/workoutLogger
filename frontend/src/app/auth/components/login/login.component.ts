import { Component, OnInit } from '@angular/core';
import  {Router} from '@angular/router';
import {AuthService} from '../../service/auth.service';
import {MatSnackBar} from '@angular/material/snack-bar';
@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.css']
})
export class LoginComponent implements OnInit {
  public formError:string='';
  public credentials={
  	name:'',
  	email:'',
  	password:''
  }
  constructor(private router:Router,private _snackBar: MatSnackBar,private authService:AuthService) { 

  }

  ngOnInit(): void {
  	if(this.authService.isLoggedIn()) this.router.navigate(["/profile"])
  }
  errorMsg():boolean{

    if(this.formError.length !== 0){ return true;}
    else return false;
  }

  public onLoginSubmit():void{
  	this.formError="";
  	if(!this.credentials.email||!this.credentials.password)
  		this.formError="All fields are Required";
  	else this.doLogin();
  }
  
  private async doLogin(){
  	await this.authService.login(this.credentials)
  		.then(()=> this.authService.isLoggedIn()&&this.router.navigateByUrl('/add'))
  		.catch((msg)=>{
  			this.formError=msg
                  this._snackBar.open("User not found", "ERROR", {
                  duration: 2000,
                });
        console.log("ERR");
        console.log(msg);
  		});
  }
  
  public openSnackBar() {
  	console.log("asd")
    this._snackBar.open("not", "error", {
      duration: 2000,
    });
  }

}
