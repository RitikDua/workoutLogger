import { Injectable } from '@angular/core';
import { CanActivate, ActivatedRouteSnapshot,Router, RouterStateSnapshot, UrlTree } from '@angular/router';
import { Observable } from 'rxjs';
import {AuthenticationService} from '../services/authentication.service'
@Injectable({
  providedIn: 'root'
})
export class AuthGuard implements CanActivate {
  constructor(private authService:AuthenticationService,private router:Router){

  }
  
  canActivate( ): boolean{
    // if(this.authService.isLoggedIn())
    // {
    //   return true;
    // }  
    // this.router.navigateByUrl("/login");
    return this.authService.isLoggedIn();
  }
  
}
