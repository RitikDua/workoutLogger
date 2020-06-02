import {Input,Output,EventEmitter ,Component, OnInit } from '@angular/core';
import {AddsetsComponent} from './addsets/addsets.component';
@Component({
  selector: 'app-add',
  templateUrl: './add.component.html',
  styleUrls: ['./add.component.css']
})
export class AddComponent implements OnInit {
	weeks:String[]=[
  		"Monday","Tuesday","Wednesday","Thursday","Friday","Saturday","Sunday"];

  	exercisesList:String[]=[
  		"Pushups","Running","Pullups"
  	];	
  		
    weekDays:Object[]=[
		{day:"Monday",key:"firstStep"},
		{day:"Tuesday",key:"secondStep"},
		{day:"Wednesday",key:"thirdStep"},
		{day:"Thursday",key:"fourthStep"},
		{day:"Friday",key:"fifthStep"},
		{day:"Saturday",key:"sixthStep"},
		{day:"Sunday",key:"seventhStep"}];

	constructor() { }

  	ngOnInit(): void {
  	}

  changeFromChild(data){
  	console.log(data);
  }



}
