import {Input,Output,EventEmitter ,Component, OnInit } from '@angular/core';
import {AddsetsComponent} from './addsets/addsets.component';
import {UserService} from '../../services/user.service';
import {ExerciseList} from '../../interfaces/exerciseList';
import {EXERCISE} from '../../interfaces/exercise';

@Component({
  selector: 'app-add',
  templateUrl: './add.component.html',
  styleUrls: ['./add.component.css']
})
export class AddComponent implements OnInit {
  username:string;
  weeks:string[]=[
  "sunday","monday","tuesday","wednesday","thursday","friday","saturday"];
  	exercisesList:ExerciseList;	
    
	constructor(private userService:UserService) { 
    this.exercisesList=this.userService.getExercisesList();
  }
  	ngOnInit(): void {
  	}

  changeFromChild(data){
      let exercise:EXERCISE;
      exercise={hrs:null,mins:null,reps:null,sets:null};
     if(this.userService.isTime(data.exercise))
     {
       exercise.hrs=data.hrs;
       exercise.mins=data.mins;
       this.userService.addStatsOfOneExercise((new Date()).toString().slice(0,15),data.exercise.toLowerCase(),exercise);
     } 
     else{
       exercise.reps=data.reps;
       exercise.sets=data.sets;
       this.userService.addStatsOfOneExercise((new Date()).toString().slice(0,15),data.exercise.toLowerCase(),exercise);
     }
  }



}
