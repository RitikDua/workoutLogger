import { Component, OnInit } from '@angular/core';
import {FormControl, FormGroup} from '@angular/forms';
import {Router,ActivatedRoute} from '@angular/router';
interface Food {
  value: string;
  viewValue: string;
}

interface Car {
  value: string;
  viewValue: string;
}
@Component({
  selector: 'app-selection',
  templateUrl: './selection.component.html',
  styleUrls: ['./selection.component.css']
})
export class SelectionComponent implements OnInit {
form: FormGroup;
  foods: Food[] = [
    {value: 'overall', viewValue: 'overall'},
    {value: 'week', viewValue: 'Pizza'},
    {value: 'today', viewValue: 'Tacos'}
  ];
  foodControl = new FormControl(this.foods[2].value);
  
  constructor(private router:Router,private route:ActivatedRoute) {
   this.navigateTo("overall");
      this.form = new FormGroup({
      food: this.foodControl,
   }); }


  ngOnInit(): void {
  }

	navigateTo(value){
	  console.log(value);
	  this.router.navigate([value],{relativeTo:this.route,skipLocationChange: true});
	}

	test(data){
		console.log(data);
	}
}
