import { Recipe } from './recipe.model';
import { Injectable } from '@angular/core';
import { Ingredient } from '../shared/ingredient.model';
import { ShoppingService } from '../shopping-list/shopping.service';
import { Subject } from 'rxjs';

@Injectable()
export class RecipeService{
    recipechanged = new Subject<Recipe[]>();
    private recipes: Recipe[] = [];
      
      constructor(private slService:ShoppingService){}

      setRecipes(recipes:Recipe[]){
          this.recipes = recipes;
          this.recipechanged.next(this.recipes.slice());
      }

      getRecipes(){
          return this.recipes.slice();
      }

      getRecipe(index:number){
          return this.recipes[index];
      }

      addIngredientsToShoppingList(ingredients: Ingredient[]) {
        //  console.log(ingredients);
         this.slService.addIngredients(ingredients);
      }

      updateRecipe(index:number,newRecipe:Recipe){
          this.recipes[index] = newRecipe;
          this.recipechanged.next(this.recipes.slice());
      }

      addNewRecipe(newRecipe:Recipe){
        this.recipes.push(newRecipe);
        this.recipechanged.next(this.recipes.slice());
      }

      deleteRecipe(index:number){
          this.recipes.splice(index,1);
          this.recipechanged.next(this.recipes.slice());
      }
}