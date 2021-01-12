import { Component, OnInit } from '@angular/core';
import {MainService} from '../../services/main.service'
import {ExerciseList} from '../../interfaces/exercise-list';
@Component({
  selector: 'app-add',
  templateUrl: './add.component.html',
  styleUrls: ['./add.component.css']
})
export class AddComponent implements OnInit {
  loading:boolean=true;
  exerciseList:ExerciseList[]=[];
 
  constructor(private mainService:MainService) { 
  	// this.loading=this.mainService.todayGoals.length
  }

  ngOnInit(): void {
  
  	if(this.mainService.todayGoals&&this.mainService.todayGoals.length!==0){
  		this.loading=false;
  		  		console.log(this.mainService.todayGoals)
  	}
  	else{
  		this.mainService.getTodaySchedule().then(()=>this.loading=false).catch((err)=>console.log(err));

  	}
  }

  getTodaySchedule(){
  	return this.mainService.todayGoals;
  }
  async submitExercise(exercise:any){
  	let duration:any=document.getElementById(`duration_${exercise._id}`)
  	if(!duration) duration=0;
  	else duration=duration.value;
  	console.log(exercise);
  	await this.mainService.submitExercise(exercise._id,duration)
  		.catch((err)=>console.log(err));
  
  }
}
