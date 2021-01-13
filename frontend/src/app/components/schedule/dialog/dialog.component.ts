import { Component, OnInit } from '@angular/core';
import {MatDialog, MatDialogRef} from '@angular/material/dialog';
import { FormGroup, FormControl, FormArray, FormBuilder } from '@angular/forms'
import {MainService} from '../../../services/main.service';
import {Router} from '@angular/router';
@Component({
  selector: 'app-dialog',
  templateUrl: './dialog.component.html',
  styleUrls: ['./dialog.component.css']
})
export class DialogComponent implements OnInit {
  name = 'Angular';
  productForm: FormGroup;

   
  constructor(
    public dialogRef: MatDialogRef<DialogComponent>,private fb:FormBuilder,private mainService:MainService,private router:Router) { 
  	    this.productForm = this.fb.group({

      name: '',

      todayGoals: this.fb.array([this.newQuantity()]) ,

    });
  }

  ngOnInit(): void {
  	
  }

  onSubmitClik():void{
  	this.dialogRef.close();
  }
    todayGoals() : FormArray {

    return this.productForm.get("todayGoals") as FormArray

  }

   

  newQuantity(): FormGroup {

    return this.fb.group({

      name: '',

      reqDuration: '',

    })

  }

   

  addQuantity() {

    this.todayGoals().push(this.newQuantity());

  }

   

  removeQuantity(i:number) {

    this.todayGoals().removeAt(i);

  }

   

  async onSubmit() {
    
    console.log(this.productForm.value.todayGoals);
   await this.mainService.submitSchedule(this.productForm.value.todayGoals)
  	.then(()=>{
  		this.dialogRef.close();
  		window.location.href="http://localhost:4200/add"
  	})
  	.catch((err)=>console.log(err));

  }

}
