import { Component, HostBinding } from '@angular/core';
import {
  trigger,
  state,
  style,
  animate,
  transition,
} from '@angular/animations';

import { RouterOutlet } from '@angular/router';
import { slideInAnimation } from './animations/animations';
import {UserService} from './services/user.service';
@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css'],
  animations: [
    slideInAnimation
    // animation triggers go here
  ]
})
export class AppComponent {
  title = 'workoutLogger';
  @HostBinding('@.disabled')
  public animationsDisabled = false;
  constructor(private userService:UserService)
  {

  }
  prepareRoute(outlet: RouterOutlet) {
    return outlet && outlet.activatedRouteData && outlet.activatedRouteData['animation'];
  }

  check():boolean{
  	return this.userService.isLoggedIn();
  }
  toggleAnimations() {
    this.animationsDisabled = !this.animationsDisabled;
  }
}
