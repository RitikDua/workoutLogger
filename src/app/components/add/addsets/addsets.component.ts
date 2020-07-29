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

  sets:number=null;
  reps:number=null;
  mins:number=null;
  hrs:number=null;
  constructor(private userService:UserService,private _snackBar: MatSnackBar) { 
 
 
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
  return (this.exercise.toLowerCase()==="running"||this.exercise.toLowerCase()==="rest"||this.exercise.toLowerCase()==="jogging"||this.exercise.toLowerCase()==="yoga")

  }

}
