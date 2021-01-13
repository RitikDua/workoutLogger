import { Component, OnInit } from '@angular/core';
import {MainService} from '../../services/main.service'
import {ExerciseList} from '../../interfaces/exercise-list';
import {Exercise} from '../../interfaces/exercise';
import {MatSnackBar} from '@angular/material/snack-bar';
import { Router} from '@angular/router';

@Component({
  selector: 'app-add',
  templateUrl: './add.component.html',
  styleUrls: ['./add.component.css']
})
export class AddComponent implements OnInit {
  loading:boolean=true;
  exerciseList:Exercise[]=[];
 
  constructor(private _snackBar: MatSnackBar,private mainService:MainService,private router:Router) { 
  	// this.loading=this.mainService.todayGoals.length
  }

  ngOnInit(): void {
  
  	if(this.mainService.todayGoals&&this.mainService.todayGoals.length!==0){
  		this.loading=false;
  		  		console.log(this.mainService.todayGoals)
  	}
  	else{
  		this.mainService.getTodaySchedule().then(()=>{
		if(!this.mainService.todayGoals||this.mainService.todayGoals.length===0) this.router.navigate(['/schedule']);
  
  			this.loading=false;}).catch((err)=>console.log(err));
  	}
  }
  
  getTodaySchedule():Exercise[]{
  	return this.mainService.todayGoals;
  }
  async submitExercise(exercise:any){
  	let duration:any=document.getElementById(`duration_${exercise._id}`)
  	if(!duration) duration=0;
  	else duration=duration.value;
  	console.log(exercise);
  	await this.mainService.submitExercise(exercise._id,duration)
  		.then(()=>{
  			this._snackBar.open("exercise", "updated", {
      duration: 2000,
    });
  		})
  		.catch((err)=>{console.log(err)
  				this._snackBar.open("exercise", "ERROR", {
						      duration: 2000,
						    });
  		});
  
  }
}
