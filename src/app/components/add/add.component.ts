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
  	console.log(this.exercisesList);
  }
  	ngOnInit(): void { 

  		setTimeout(()=>{this.exercisesList=this.userService.getExercisesList();
  	console.log(this.exercisesList);
  },3000);
  	}

  changeFromChild(data){
      
     console.log(data);
      let exercise;//:EXERCISE;
      exercise={hrs:null,mins:null,reps:null,sets:null};
     if(data.hrs|| data.mins)
     {
       exercise.hrs=data.hrs;
       exercise.mins=data.mins;
    
       this.userService.addStatsOfOneExercise((new Date()).toString().slice(0,15),data.exercise.toLowerCase(),{"hrs":data.hrs,"mins":data.mins});
     } 
     else{
       exercise.reps=data.reps;
       exercise.sets=data.sets;
       this.userService.addStatsOfOneExercise((new Date()).toString().slice(0,15),data.exercise.toLowerCase(),{"sets":data.sets,"reps":data.reps});
     }

  }



}
