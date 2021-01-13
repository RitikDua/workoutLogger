import { Component, OnInit } from '@angular/core';
import {User} from '../../../interfaces/user';
import {MainService} from '../../../services/main.service'
@Component({
  selector: 'app-user',
  templateUrl: './user.component.html',
  styleUrls: ['./user.component.css']
})
export class UserComponent implements OnInit {
  user:User={
		name:"",email:"",profilePic:""
	};
	loading:boolean=true;
  constructor(private mainService:MainService) { }

  ngOnInit(): void {
  		this.mainService.getUser()
  		.then(()=>{
  			this.user=this.mainService.getUserProfile();
  			this.loading=false;
  		})
  		.catch((err)=>console.log(err));
  }
  logout(){
  	this.mainService.logout();
  }
}
