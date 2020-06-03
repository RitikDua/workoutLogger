import { Input,Output,EventEmitter,Component, OnInit } from '@angular/core';
import {MatSnackBar} from '@angular/material/snack-bar';
import {UserService} from '../../../services/user.service';

@Component({
  selector: 'app-addsets',
  templateUrl: './addsets.component.html',
  styleUrls: ['./addsets.component.css'],
})
export class AddsetsComponent implements OnInit {
  @Output() notify:EventEmitter<Object>=new EventEmitter<Object>();;
  @Input() exercise:string;

  sets:number;
  reps:number;
  mins:number;
  hrs:number;
  constructor(private userService:UserService,private _snackBar: MatSnackBar) { 
  	this.sets=this.reps=this.mins=this.hrs=0;
  }

  ngOnInit(): void {
  }

   openSnackBar(message: string, action: string) {
    this._snackBar.open(message, action, {
      duration: 2000,
    });
  }

  _sendToParent():void{
	this.openSnackBar(this.exercise.toString(),"Done");
	if(this.isTime()) {
		this.notify.emit({"exercise":this.exercise,"hrs":this.hrs,"mins":this.mins});
  	}else {

  		this.notify.emit({"exercise":this.exercise,"sets":this.sets,"reps":this.reps});
  	}
  }	  
  isTime():boolean{
    return this.userService.isTime(this.exercise);
  }

}
