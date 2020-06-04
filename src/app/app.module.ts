import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';
import {FormBuilder, FormControl, FormGroup} from '@angular/forms';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { environment } from '../environments/environment';
import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import {MaterialModule} from './material-module';
import { ProfileComponent } from './components/profile/profile.component';
import { AddComponent } from './components/add/add.component';
import {BottomNavModule} from 'ngx-bottom-nav';
import { StatsComponent } from './components/stats/stats.component';
import { WeekroutineComponent } from './components/profile/weekroutine/weekroutine.component';
import { AddsetsComponent } from './components/add/addsets/addsets.component';
import { LineChartComponent } from './components/stats/line-chart/line-chart.component';
import { ChartsModule } from 'ng2-charts';
import { DoughnutChartComponent } from './components/stats/doughnut-chart/doughnut-chart.component';
import { BarChartComponent } from './components/stats/bar-chart/bar-chart.component';
import { PieChartComponent } from './components/stats/pie-chart/pie-chart.component';
import { RadarChartComponent } from './components/stats/radar-chart/radar-chart.component';
import { SelectionComponent } from './components/stats/selection/selection.component';

@NgModule({
  declarations: [
    AppComponent,
    ProfileComponent,
    AddComponent,
    StatsComponent,
    WeekroutineComponent,
    AddsetsComponent,
    LineChartComponent,
    DoughnutChartComponent,
    BarChartComponent,
    PieChartComponent,
    RadarChartComponent,
    SelectionComponent,
  ],
  imports: [
    BrowserModule,
    AppRoutingModule,
    BrowserAnimationsModule,
    MaterialModule,
    FormsModule,
    ChartsModule,
    BottomNavModule,
    ReactiveFormsModule
  ],
  providers: [],
  bootstrap: [AppComponent]
})
export class AppModule { }
