import { Input,Output,EventEmitter,Component, OnInit } from '@angular/core';
import {MatSnackBar} from '@angular/material/snack-bar';

@Component({
  selector: 'app-addsets',
  templateUrl: './addsets.component.html',
  styleUrls: ['./addsets.component.css'],
})
export class AddsetsComponent implements OnInit {
  @Output() notify:EventEmitter<Object>=new EventEmitter<Object>();;
  @Input() exercise:String;

  sets:Number;
  reps:Number;
  mins:Number;
  hrs:Number;
  constructor(private _snackBar: MatSnackBar) { 
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
  	if(this.exercise.toLowerCase()==="running"||this.exercise.toLowerCase()==="walking"||this.exercise.toLowerCase()==="jogging")
  		return true;
  	return false;
  }

}
