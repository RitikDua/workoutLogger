import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import {AddComponent} from './components/add/add.component';
import {StatsComponent} from './components/stats/stats.component';
import {ProfileComponent} from './components/profile/profile.component';

const routes: Routes = [
	{path:"",redirectTo:"/add",pathMatch:'full'},
	{path:'stats',component:StatsComponent},
	{path:'profile',component:ProfileComponent},
	{path:'add',component:AddComponent},	
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
