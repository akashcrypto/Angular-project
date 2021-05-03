import { Component, OnInit } from '@angular/core';
import { Recipe } from '../recipe.model';
import { ActivatedRoute, Params , Router} from '@angular/router';
import { RecipeService } from '../recipe.service';


@Component({
  selector: 'app-recipe-details',
  templateUrl: './recipe-details.component.html',
  styleUrls: ['./recipe-details.component.css']
})
export class RecipeDetailsComponent implements OnInit {
  recipe:Recipe;
  index:number;
  constructor(private route:ActivatedRoute,
              private recipeService:RecipeService,
              private router: Router,) {
   }

  ngOnInit(): void {
    this.route.params.subscribe(
      (params:Params)=>{
        this.index = +params['id'];
        this.recipe = this.recipeService.getRecipe(+params['id']);
      }
    )
  }

  onAddToShoppingList() {
    this.recipeService.addIngredientsToShoppingList(this.recipe.ingredients);
  }

  onDeleteRecipe(){
    this.recipeService.deleteRecipe(this.index);
    this.router.navigate(['/recipe']);
  }
}
