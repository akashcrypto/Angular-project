import { Component, OnInit } from '@angular/core';
import { FormArray, FormControl, FormGroup, Validators } from '@angular/forms';
import { ActivatedRoute, Params ,Router} from '@angular/router';
import { Recipe } from '../recipe.model';
import { RecipeService } from '../recipe.service';

@Component({
  selector: 'app-recipe-edit',
  templateUrl: './recipe-edit.component.html',
  styleUrls: ['./recipe-edit.component.css']
})
export class RecipeEditComponent implements OnInit {
  editMode = false;
  id:number;
  recipeForm:FormGroup;
  recipe:Recipe;
  constructor(private route:ActivatedRoute,
              private router:Router,
              private recipeservice:RecipeService) { }

  ngOnInit(): void {
    this.route.params.subscribe(
      (params:Params)=>{
        this.id = params['id'];
        this.editMode = this.id != null ? true : false;
        this.initForm();
      }
    )
  }

  private initForm(){
    let recipeName = '';
    let recipedesc = '';
    let recipeimage = '';
    let recipeIngredient = new FormArray([]);

    if(this.editMode){
      this.recipe = this.recipeservice.getRecipe(this.id);
      recipeName = this.recipe.name;
      recipedesc = this.recipe.description;
      recipeimage = this.recipe.imagePath;
      for(let ingredient of this.recipe.ingredients){
        recipeIngredient.push(
          new FormGroup({
            'name' :new FormControl(ingredient.name,[Validators.required]),
            'amount':new FormControl(ingredient.amount,[Validators.required,Validators.pattern(/^[1-9]+[0-9]*$/)])
          })
        )
      } 
    }
    this.recipeForm  = new FormGroup({
      'name':new FormControl(recipeName,Validators.required),
      'description': new FormControl(recipedesc, Validators.required),
      'imagePath': new FormControl(recipeimage, Validators.required),
      'ingredients': recipeIngredient
    })
  }

  getControls() {
    return (this.recipeForm.get('ingredients') as FormArray).controls;
  }

  onSubmit(){
    if(this.editMode){
      this.recipeservice.updateRecipe(this.id , this.recipeForm.value);
      this.editMode=false;
      this.onCancle();
    }
    else{
      this.recipeservice.addNewRecipe(this.recipeForm.value);
    }
  }

  onAddIngredient(){
    (<FormArray>this.recipeForm.get('ingredients')).push(
      new FormGroup({
      "name": new FormControl(null,Validators.required),
      "amount": new FormControl(null,[Validators.required,Validators.pattern(/^[1-9]+[0-9]*$/)])
      })
    )
  }

  onDeleteIndredient(index:number){
    (<FormArray>this.recipeForm.get('ingredients')).removeAt(index);
  }

  onCancle(){
    this.router.navigate(['../'],{relativeTo:this.route});
  }

}
