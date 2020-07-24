
import { Component, OnInit,Input } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';

@Component({
  selector: 'app-date',
  templateUrl: './date.component.html',
  styleUrls: ['./date.component.css']
})
export class DateComponent implements OnInit {
public dateValues: Date[] = [new Date("7/7/2020")];//new Date('1/1/2020'), new Date('1/15/2020'), new Date('1/3/2020'), new Date('1/25/2020')];
    public multiSelect: Boolean = true;
    @Input() dates;
    constructor() {
    }
    ngOnInit(){
      for(let i=0;i<this.dates.length;i++)
      {
        this.dateValues.push(new Date(this.dates[i]));
      }
    }

  }

