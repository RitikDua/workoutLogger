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

@NgModule({
  declarations: [
    AppComponent,
    ProfileComponent,
    AddComponent,
    StatsComponent,
    WeekroutineComponent
  ],
  imports: [
    BrowserModule,
    AppRoutingModule,
    BrowserAnimationsModule,
    MaterialModule,
    FormsModule,
    BottomNavModule,
    ReactiveFormsModule
  ],
  providers: [],
  bootstrap: [AppComponent]
})
export class AppModule { }
