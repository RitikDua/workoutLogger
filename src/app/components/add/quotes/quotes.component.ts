import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'app-quotes',
  templateUrl: './quotes.component.html',
  styleUrls: ['./quotes.component.css']
})
export class QuotesComponent implements OnInit {
quote:string="“The last three or four reps is what makes the muscle grow. This area of pain divides a champion from someone who is not a champion”";

  quotesArr:string="Arnold Schwarzenegger, seven-time Mr. Olympia";
  
  constructor() { }

  ngOnInit(): void {
  }

}
