import { NgModule } from "@angular/core";
import { FormsModule, ReactiveFormsModule } from "@angular/forms";
import { RouterModule } from "@angular/router";
import { SharedModule } from "../shared/shared.module";
import { RecipeDetailsComponent } from "./recipe-details/recipe-details.component";
import { RecipeEditComponent } from "./recipe-edit/recipe-edit.component";
import { RecipeItemComponent } from "./recipe-list/recipe-item/recipe-item.component";
import { RecipeListComponent } from "./recipe-list/recipe-list.component";
import { RecipeRouting } from "./recipe-routing.module";
import { RecipesComponent } from "./recipes.component";

@NgModule({
    declarations:[
        RecipesComponent,
        RecipeListComponent,
        RecipeDetailsComponent,
        RecipeItemComponent,
        RecipeEditComponent,
    ],
    imports:[
        RouterModule,
        ReactiveFormsModule,
        FormsModule,
        RecipeRouting,
        SharedModule
    ]
})
export class RecipeModule{

}