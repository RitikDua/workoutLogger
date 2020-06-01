import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'app-profile',
  templateUrl: './profile.component.html',
  styleUrls: ['./profile.component.css']
})
export class ProfileComponent implements OnInit {
  //for testing
	userName:String="Ritik";
	weight:Number;
	height:Number;
	

  weeks:String[]=[
  "Monday","Tuesday","Wednesday","Thursday","Friday","Saturday","Sunday"];

  weekDays:Object[]=[
	{day:"Monday",key:"firstStep"},
	{day:"Tuesday",key:"secondStep"},
	{day:"Wednesday",key:"thirdStep"},
	{day:"Thursday",key:"fourthStep"},
	{day:"Friday",key:"fifthStep"},
	{day:"Saturday",key:"sixthStep"},
	{day:"Sunday",key:"seventhStep"}];
 
  exerciseMap=new Map();
  constructor() { }

  ngOnInit(): void {
  }

}
