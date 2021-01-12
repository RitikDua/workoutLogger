import { Component, OnInit } from '@angular/core';
import {MenuItem} from '../../interfaces/menu-item';
@Component({
  selector: 'app-responsive-toolbar',
  templateUrl: './responsive-toolbar.component.html',
  styleUrls: ['./responsive-toolbar.component.css']
})
export class ResponsiveToolbarComponent implements OnInit {
	menuItems:MenuItem[]=[
		{label:'Add',icon:'add',route:'add'},
		{label:'Stats',icon:'insights',route:'stats'}
	]
  constructor() { }

  ngOnInit(): void {
  }
  public navigate(item:MenuItem):void{
  	console.log(item);
  }
}
