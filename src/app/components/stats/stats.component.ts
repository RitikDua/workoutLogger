import { Component, OnInit } from '@angular/core';
import {FormControl, FormGroup} from '@angular/forms';

interface Food {
  value: string;
  viewValue: string;
}

interface Car {
  value: string;
  viewValue: string;
}
@Component({
  selector: 'app-stats',
  templateUrl: './stats.component.html',
  styleUrls: ['./stats.component.css']
})
export class StatsComponent implements OnInit {
 constructor() { 
  		
 
  }

  ngOnInit(): void {
  }

}
