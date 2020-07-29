import { Component, OnInit ,Input} from '@angular/core';


@Component({
  selector: 'app-bar',
  templateUrl: './bar.component.html',
  styleUrls: ['./bar.component.css']
})

export class BarComponent implements OnInit {
	@Input() bar;

 single: any[];
  multi: any[];
weeks:string[]=[
  "sunday","monday","tuesday","wednesday","thursday","friday","saturday"
  ];
  view = [window.screen.width-Number(window.screen.width/3), window.screen.height-Number(10+window.screen.height/2)-100];
  
  // options
  showXAxis = true;
  showYAxis = true;
  gradient = false;
  showLegend = true;
  showXAxisLabel = true;
  xAxisLabel = 'WeekDays';
  showYAxisLabel = true;
  yAxisLabel = 'Values';
colorScheme = {
    domain: ['#5AA454', '#A10A28', '#C7B42C', '#AAAAAA',"#c1414a","#dd9933","#263246","#d3d6da","#7cc640","	#c7d70e","#b15a9f","#5ab16c"]
  };


  constructor() {

this.view = [window.screen.width-Number(window.screen.width/3), window.screen.height-Number(10+window.screen.height/2)-100];
  
  }

  onSelect(event) {
    console.log(event);
  }


  onActivate(data): void {
    console.log('Activate', JSON.parse(JSON.stringify(data)));
  }

  onDeactivate(data): void {
    console.log('Deactivate', JSON.parse(JSON.stringify(data)));
  }
 

  ngOnInit(): void {
 this.single=this.bar;

  this.view = [window.screen.width-Number(window.screen.width/3), window.screen.height-Number(window.screen.height/2)-100];
	}
}
