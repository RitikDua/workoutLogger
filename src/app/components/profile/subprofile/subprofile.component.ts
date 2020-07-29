import { Component, OnInit ,Input} from '@angular/core';
import {UserService} from '../../../services/user.service';
import  {Router} from '@angular/router';

@Component({
  selector: 'app-subprofile',
  templateUrl: './subprofile.component.html',
  styleUrls: ['./subprofile.component.css']
})
export class SubprofileComponent implements OnInit {
	@Input() username;
  constructor(private userService:UserService,private router:Router) { }

  ngOnInit(): void {
  }


  logout(){

    let start=async()=>{this.userService.logout()}
    start().then(()=>this.router.navigateByUrl("/login"));
  }

}
