import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';
import {MaterialModule} from './material-module';
import {FormBuilder, FormControl, FormGroup} from '@angular/forms';
import { CalendarModule } from '@syncfusion/ej2-angular-calendars';

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
import { HomeComponent } from './components/home/home.component';
import { AddsetsComponent } from './components/add/addsets/addsets.component';
import { NgxChartsModule } from '@swimlane/ngx-charts';
import { PieComponent } from './components/stats/pie/pie.component';
import { LineComponent } from './components/stats/line/line.component';
import { DateComponent } from './components/stats/date/date.component';
import { DashboardComponent } from './components/dashboard/dashboard.component';
import { SubprofileComponent } from './components/profile/subprofile/subprofile.component';
import { QuotesComponent } from './components/add/quotes/quotes.component';
import { BarComponent } from './components/stats/bar/bar.component';
import { MainNavComponent } from './main-nav/main-nav.component';
import { LayoutModule } from '@angular/cdk/layout';
import { MatToolbarModule } from '@angular/material/toolbar';
import { MatButtonModule } from '@angular/material/button';
import { MatSidenavModule } from '@angular/material/sidenav';
import { MatIconModule } from '@angular/material/icon';
import { MatListModule } from '@angular/material/list';

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
    ModalComponent,
    HomeComponent,
    AddsetsComponent,
    PieComponent,
    LineComponent,
    DateComponent,
    DashboardComponent,
    SubprofileComponent,
    QuotesComponent,
    BarComponent,
    MainNavComponent
  ],
  imports: [CalendarModule,
  HttpClientModule,
    BrowserModule,
    AppRoutingModule,
    BrowserAnimationsModule,
    MaterialModule,  FormsModule,
    ReactiveFormsModule,
    NgxChartsModule,
    BrowserAnimationsModule,
    LayoutModule,
    MatToolbarModule,
    MatButtonModule,
    MatSidenavModule,
    MatIconModule,
    MatListModule 
  

  ] ,
  providers: [AuthGuard,{
    provide:HTTP_INTERCEPTORS,
    useClass:TokenInterceptService,
    multi:true
  }],
  bootstrap: [AppComponent]
})
export class AppModule { }
