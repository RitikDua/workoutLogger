import { Injectable } from '@angular/core';
import { CanActivate, ActivatedRouteSnapshot, Router,RouterStateSnapshot } from '@angular/router';
import { Observable } from 'rxjs';

import { AuthService } from './service/auth.service';

@Injectable({
  providedIn: 'root'
})
export class AuthGuard implements CanActivate {

  constructor(private authService: AuthService,private router: Router){}

  canActivate(
    next: ActivatedRouteSnapshot,
    state: RouterStateSnapshot): Observable<boolean> | Promise<boolean> | any{
      if(this.authService.isLoggedIn())
      return this.authService.isLoggedIn();
		else
		return this.router.navigate(['/login'])

 	 }
}
