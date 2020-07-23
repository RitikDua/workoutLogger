import { Component, OnInit } from '@angular/core';
import  {Router} from '@angular/router';
import {STEPPER_GLOBAL_OPTIONS} from '@angular/cdk/stepper';
import {UserService} from '../../services/user.service';
import {ExerciseList} from '../../interfaces/exerciseList';
import {FormBuilder, FormGroup, Validators} from '@angular/forms';
import {WeekroutineComponent} from './weekroutine/weekroutine.component';
import {ThemePalette} from '@angular/material/core';
import {ProgressSpinnerMode} from '@angular/material/progress-spinner';

export interface PeriodicElement {
  name: string;
  position: number;
  weight: number;
  symbol: string;
}

const ELEMENT_DATA: PeriodicElement[] = [

];

@Component({
  selector: 'app-profile',
  templateUrl: './profile.component.html',
  styleUrls: ['./profile.component.css'],
  providers: [{
    provide: STEPPER_GLOBAL_OPTIONS, useValue: {showError: true}
  }],
})


export class ProfileComponent implements OnInit {
  username:string;
  email:string;
  weeks:string[]=[
  "sunday","monday","tuesday","wednesday","thursday","friday","saturday"];

  exercisesList:ExerciseList[];
  userExerciseList:ExerciseList[];
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
  isChecked = false;
  isLoad = false;

 displayedColumns: string[] = ['day', 'exercises'];
  dataSource = [];

 color: ThemePalette = 'primary';
  mode: ProgressSpinnerMode = 'determinate';
  value = 50;

  constructor(private router:Router,private userService:UserService,private _formBuilder: FormBuilder) { 
    const {email,name}=this.userService.getCurrentUser();
    this.username=name;
    this.email=email;
    this.userService.createUser();

  		
  }
  editComponent(){
  	this.isChecked=!this.isChecked;
  	console.log(this.isChecked)
  }

  isTable():boolean{
  	return this.dataSource.length>0;
  }
  
  setExercisesList(){
  	this.dataSource=[];
 		this.exercisesList=this.userService.getProfileExercisesList();
 		
 		for(let i=0;i<this.weeks.length;i++)
 		{
 			if(this.weeks[i] in this.exercisesList)
 			{
 				this.dataSource.push({
 					day:this.weeks[i],
 					exercises:this.exercisesList[this.weeks[i]].join(",")
 				})
 			}
 			else{
 				this.dataSource.push({
 					day:this.weeks[i],
 					exercises:"NA"
 				})	
 			}
 		}
 		console.log(this.dataSource);
 	}

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
  let day:string=data.day.toLowerCase();
  this.exercisesList[day]=x;
  this.setExercisesList();
  }
  

  logout(){

    let start=async()=>{this.userService.logout()}
    start().then(()=>this.router.navigateByUrl("/login"));
  }
  loadTable(){

setTimeout(()=>{    

  	this.setExercisesList();
  	this.isLoad=true;
 }, 3000);
 
  }
  ngOnInit(): void {
  	this.loadTable(); }

}