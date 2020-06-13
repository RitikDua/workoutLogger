import { Component, OnInit } from '@angular/core';
import  {Router} from '@angular/router';
import {UserService} from '../../../services/user.service';

@Component({
  selector: 'app-register',
  templateUrl: './register.component.html',
  styleUrls: ['./register.component.css']
})
export class RegisterComponent implements OnInit {
	public formError:string='';
	public credentials={
		name:'',email:'',password:''
	};

  constructor(private router:Router,private authenticationService:UserService) { }

  ngOnInit(): void {
  }

  public onRegisterSubmit():void{
  	this.formError="";
  	if(!this.credentials.name||!this.credentials.email||!this.credentials.password)
  			this.formError="All fields are Required";
  	else this.doRegister();
  }
  private doRegister():void{
  	this.authenticationService.register(this.credentials)
  		.then(()=> this.router.navigateByUrl("/"))
  		.catch((msg)=>this.formError=msg);
  }
}
