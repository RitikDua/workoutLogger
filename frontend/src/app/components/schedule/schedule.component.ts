import { Component, OnInit } from '@angular/core';
import {MatDialog} from '@angular/material/dialog';
// import { MatDialogRef } from '@angular/material';
import {DialogComponent} from './dialog/dialog.component';
@Component({
  selector: 'app-schedule',
  templateUrl: './schedule.component.html',
  styleUrls: ['./schedule.component.css']
})
export class ScheduleComponent implements OnInit {

  constructor(private dialog: MatDialog) {
  		    this.dialog.open(DialogComponent, { disableClose: true });
   }

  ngOnInit(): void {
  }

}
