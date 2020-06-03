import { Component, OnInit } from '@angular/core';
import {FormBuilder, FormGroup, Validators} from '@angular/forms';
import {STEPPER_GLOBAL_OPTIONS} from '@angular/cdk/stepper';
import {WeekroutineComponent} from './weekroutine/weekroutine.component';
import {UserService} from '../../services/user.service';
import {ExerciseList} from '../../interfaces/exerciseList';

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
	
  exercisesList:ExerciseList[];

  weeks:string[]=[
  "sunday","monday","tuesday","wednesday","thursday","friday","saturday"];

  weekDays:Object[]=[
	{day:"monday",key:"firstStep"},
	{day:"tuesday",key:"secondStep"},
	{day:"wednesday",key:"thirdStep"},
	{day:"thursday",key:"fourthStep"},
	{day:"friday",key:"fifthStep"},
	{day:"saturday",key:"sixthStep"},
	{day:"sunday",key:"seventhStep"}];
 
  exerciseMap=new Map();
  firstFormGroup: FormGroup;
  secondFormGroup: FormGroup;

 isLinear = false;

  constructor(private userService:UserService,private _formBuilder: FormBuilder) {}

  changeFromChild(data){
  	console.log(data);
  	let removeDuplicates=new Set();
  	let arr=data.exercises;
  	arr.forEach(i=>removeDuplicates.add(i.toLowerCase()));
        // this.exercisesList[data.day.toLowerCase()]= Array.from(removeDuplicates);
    let x:string[]=[];
    Array.from(removeDuplicates).map(i=>x.push(i.toString().toLowerCase()));

    this.userService.addExercises(data.day.toLowerCase(),x);
  console.log(this.exerciseMap);
  }

  ngOnInit() {
 	}
}
