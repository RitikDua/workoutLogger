import { Component } from '@angular/core';
import {BottomNavItem} from 'ngx-bottom-nav';
import {UserService} from './services/user.service';
@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css']
})
export class AppComponent {
  title = 'workoutLogger';
  items: BottomNavItem[] = [
    {icon: 'bar_chart', label: 'stats', routerLink: 'stats'},
    {icon: 'add', label: 'Add', routerLink: 'add'},
    {icon: 'account_circle', label: 'Profile', routerLink: 'profile'},
  ];
  
}
