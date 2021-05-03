import { Component, OnInit , ViewChild , ElementRef, OnDestroy} from '@angular/core';
import { NgForm } from '@angular/forms';
import { Ingredient } from 'src/app/shared/ingredient.model';
import { ShoppingService } from '../shopping.service';
import { Subscription } from 'rxjs';
import { formatCurrency } from '@angular/common';

@Component({
  selector: 'app-shopping-edit',
  templateUrl: './shopping-edit.component.html',
  styleUrls: ['./shopping-edit.component.css']
})
export class ShoppingEditComponent implements OnInit , OnDestroy {
  @ViewChild('f') slForm : NgForm;
  editMode = false;
  subscription:Subscription;
  editIndex:number;
  editItem:Ingredient;
  constructor(private shoppingService:ShoppingService) { }

  ngOnInit(): void {
    this.subscription = this.shoppingService.startEdit.subscribe((index:number)=>{
      this.editIndex = index;
      this.editMode = true;
      this.editItem = this.shoppingService.getIngredient(index);
      this.slForm.setValue({
        name: this.editItem.name,
        amount: this.editItem.amount
      })
    })
  }

  ngOnDestroy(){
    this.subscription.unsubscribe();
  }

  onSubmit(form:NgForm){
    if(this.editMode){
      this.shoppingService.updateIngredient(this.editIndex , new Ingredient(form.value.name , form.value.amount));
      this.editMode = false;
    }
    else{
      this.shoppingService.addIngredient(new Ingredient(form.value.name , form.value.amount));
    }
    form.reset();
  }

  onDelete(){
    this.shoppingService.deleteIngredient(this.editIndex);
    this.slForm.reset();
    this.editMode = false;
  }

  onClear(){
    this.slForm.reset();
    this.editMode=false;
  }
}
