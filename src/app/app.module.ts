import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';
import {MaterialModule} from './material-module';
import {FormBuilder, FormControl, FormGroup} from '@angular/forms';

import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { LoginComponent } from './login/components/login/login.component';
import { SignupComponent } from './login/components/signup/signup.component';
import { ClientComponent } from './login/components/client/client.component';
import {AuthGuard} from './login/guards/auth.guard';
import {TokenInterceptService} from './login/services/token-intercept.service';
import {HttpClientModule,HTTP_INTERCEPTORS} from '@angular/common/http';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { ProfileComponent } from './components/profile/profile.component';
import { StatsComponent } from './components/stats/stats.component';
import { AddComponent } from './components/add/add.component';
import { WeekroutineComponent } from './components/profile/weekroutine/weekroutine.component';
import { ModalComponent } from './components/profile/modal/modal.component';

@NgModule({
  declarations: [
    AppComponent,
    LoginComponent,
    SignupComponent,
    ClientComponent,
    ProfileComponent,
    StatsComponent,
    AddComponent,
    WeekroutineComponent,
    ModalComponent
  ],
  imports: [
  HttpClientModule,
    BrowserModule,
    AppRoutingModule,
    BrowserAnimationsModule,
    MaterialModule,  FormsModule,
    ReactiveFormsModule,
  

  ],
  providers: [AuthGuard,{
    provide:HTTP_INTERCEPTORS,
    useClass:TokenInterceptService,
    multi:true
  }],
  bootstrap: [AppComponent]
})
export class AppModule { }
