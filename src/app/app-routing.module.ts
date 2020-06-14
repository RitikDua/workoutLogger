import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import {AddComponent} from './components/add/add.component';
import {StatsComponent} from './components/stats/stats.component';
import {ProfileComponent} from './components/profile/profile.component';
import { LineChartComponent } from './components/stats/line-chart/line-chart.component';
import { DoughnutChartComponent } from './components/stats/doughnut-chart/doughnut-chart.component';
import { BarChartComponent } from './components/stats/bar-chart/bar-chart.component';
import { PieChartComponent } from './components/stats/pie-chart/pie-chart.component';
import { RadarChartComponent } from './components/stats/radar-chart/radar-chart.component';
import {RegisterComponent} from './login/components/register/register.component';
import {LoginComponent} from './login/components/login/login.component';
import {AuthGuard} from './login/guard/auth.guard';
const routes: Routes = [
	{path:"",redirectTo:"/login",pathMatch:'full'},
	{path:'stats',component:StatsComponent,
	canActivate:[AuthGuard],
	children:[
	{path:'overall',component:LineChartComponent,
	canActivate:[AuthGuard]},
	{path:'week',component:BarChartComponent,
	canActivate:[AuthGuard]},
	{path:'today',component:PieChartComponent,
	canActivate:[AuthGuard]},
	]
},
	{path:'profile',component:ProfileComponent,
	canActivate:[AuthGuard]},
	{path:'add',component:AddComponent,
	canActivate:[AuthGuard]},	
	{path:'register',component:RegisterComponent},
	{path:'login',component:LoginComponent,}
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
