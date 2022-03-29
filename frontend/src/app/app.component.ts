import { Component } from '@angular/core';
import {AuthService} from './auth/service/auth.service';
@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css']
})
export class AppComponent {
  title = 'frontend';
  constructor(private authService:AuthService){

  }
  isLoggedIn():boolean{
  	return this.authService.isLoggedIn();
  }
}