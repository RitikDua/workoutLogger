import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';
import {MaterialModule} from './material-module';
import {HttpClientModule,HTTP_INTERCEPTORS} from '@angular/common/http';
import {FlexLayoutModule} from '@angular/flex-layout';
import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { LoginComponent } from './auth/components/login/login.component';
import { SignupComponent } from './auth/components/signup/signup.component';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { ProfileComponent } from './components/profile/profile.component';
import {UserComponent}from './components/profile/user/user.component';
import { FormsModule } from '@angular/forms'; 
import { ReactiveFormsModule } from '@angular/forms';
import { ResponsiveToolbarComponent } from './components/responsive-toolbar/responsive-toolbar.component';
import { AddComponent } from './components/add/add.component';
import { ScheduleComponent } from './components/schedule/schedule.component';
import { DialogComponent } from './components/schedule/dialog/dialog.component';
import {LineComponent} from './components/profile/line/line.component';
import {PieComponent} from './components/profile/pie/pie.component';
import {BarComponent} from './components/profile/bar/bar.component';
import { RouterModule } from '@angular/router';
// import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { NgxChartsModule } from '@swimlane/ngx-charts';

@NgModule({
  declarations: [
    AppComponent,LineComponent,
    LoginComponent,PieComponent,BarComponent,
    SignupComponent,UserComponent,
    ProfileComponent,
    ResponsiveToolbarComponent,
    AddComponent,
    ScheduleComponent,
    DialogComponent
  ],
  imports: [
    BrowserModule,  HttpClientModule,NgxChartsModule,
    AppRoutingModule,MaterialModule,
    BrowserAnimationsModule,FlexLayoutModule,RouterModule,
    FormsModule,
    ReactiveFormsModule
  ],
  providers: [],
  bootstrap: [AppComponent]
})
export class AppModule { }
