import { Component, OnInit } from '@angular/core';
import {MenuItem} from '../../interfaces/menu-item';
import {Router} from '@angular/router';


@Component({
  selector: 'app-responsive-toolbar',
  templateUrl: './responsive-toolbar.component.html',
  styleUrls: ['./responsive-toolbar.component.css']
})
export class ResponsiveToolbarComponent implements OnInit {
	menuItems:MenuItem[]=[
		{label:'Add',icon:'add',route:'add'},
		{label:'Stats',icon:'insights',route:'profile'},
		{label:'Create',icon:"create",route:"schedule"}
	]
	item=this.menuItems[0];
  constructor(private route:Router) { }

  ngOnInit(): void {
  }
  public navigate(item:MenuItem):void{
  	console.log(item);
  	this.route.navigate([item.route]);
  }
}
