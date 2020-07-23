import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import {ProfileComponent} from './components/profile/profile.component';

import {SignupComponent} from './login/components/signup/signup.component';
import {LoginComponent} from './login/components/login/login.component';
import {AuthGuard} from './login/guards/auth.guard';
import {ClientComponent} from './login/components/client/client.component';

const routes: Routes = [
	{path:"",redirectTo:"/login",pathMatch:'full'},
		{path:'signup',component:SignupComponent},
	{path:'login',component:LoginComponent}
	,{path:'profile',component:ProfileComponent}

];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
