import { Component, OnInit } from '@angular/core';
import {FormBuilder, FormGroup, Validators} from '@angular/forms';
import {STEPPER_GLOBAL_OPTIONS} from '@angular/cdk/stepper';
import {WeekroutineComponent} from './weekroutine/weekroutine.component';

@Component({
  selector: 'app-profile',
  templateUrl: './profile.component.html',
  styleUrls: ['./profile.component.css'],
  providers: [{
    provide: STEPPER_GLOBAL_OPTIONS, useValue: {showError: true}
  }]
})
export class ProfileComponent implements OnInit {
  //for testing
	username:String="Ritik";
	weight:Number;
	height:Number;
	

  weeks:String[]=[
  "Monday","Tuesday","Wednesday","Thursday","Friday","Saturday","Sunday"];

  weekDays:Object[]=[
	{day:"Monday",key:"firstStep"},
	{day:"Tuesday",key:"secondStep"},
	{day:"Wednesday",key:"thirdStep"},
	{day:"Thursday",key:"fourthStep"},
	{day:"Friday",key:"fifthStep"},
	{day:"Saturday",key:"sixthStep"},
	{day:"Sunday",key:"seventhStep"}];
 
  exerciseMap=new Map();
  firstFormGroup: FormGroup;
  secondFormGroup: FormGroup;

 isLinear = false;

  constructor(private _formBuilder: FormBuilder) {}

  ngOnInit() {
 	}
}
