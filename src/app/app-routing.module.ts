import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import {HomeComponent} from './components/home/home.component';
import {AddComponent} from './components/add/add.component';
import {StatsComponent} from './components/stats/stats.component';

import {SignupComponent} from './login/components/signup/signup.component';
import {LoginComponent} from './login/components/login/login.component';
import {AuthGuard} from './login/guards/auth.guard';
import {ClientComponent} from './login/components/client/client.component';

const routes: Routes = [
	{path:"",redirectTo:"/login",pathMatch:'full'},
		{path:'signup',component:SignupComponent},
	{path:'login',component:LoginComponent}
	,{path:'profile',component:HomeComponent,},
	{path:'add',component:AddComponent},
	{path:'stats',component:StatsComponent},
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
