import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import {ProfileComponent} from './components/profile/profile.component';
// import {AddComponent} from './components/add/add.component';
// import {StatsComponent} from './components/stats/stats.component';

import {SignupComponent} from './auth/components/signup/signup.component';
import {LoginComponent} from './auth/components/login/login.component';
import {AuthGuard} from './auth/auth.guard';
// import {ClientComponent} from './login/components/client/client.component';

const routes: Routes = [
	{path:"",redirectTo:"/login",pathMatch:'full'},
		{path:'signup',component:SignupComponent},
	{path:'login',component:LoginComponent}
	,{path:'profile',component:ProfileComponent, canActivate: [AuthGuard]},
	// {path:'add',component:AddComponent},
	// {path:'stats',component:StatsComponent},
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
