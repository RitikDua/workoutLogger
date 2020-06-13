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

const routes: Routes = [
	{path:"",redirectTo:"/profile",pathMatch:'full'},
	{path:'stats',component:StatsComponent,
	children:[
	{path:'overall',component:LineChartComponent},
	{path:'week',component:BarChartComponent},
	{path:'today',component:PieChartComponent},
	]
},
	{path:'profile',component:ProfileComponent},
	{path:'add',component:AddComponent},	
	{path:'register',component:RegisterComponent},
	{path:'login',component:LoginComponent}
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
