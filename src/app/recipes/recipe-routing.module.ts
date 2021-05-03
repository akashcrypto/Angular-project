import { NgModule } from "@angular/core";
import { RouterModule, Routes } from "@angular/router";
import { AuthGaurd } from "../auth/auth.gaurd";
import { RecipeDetailsComponent } from "./recipe-details/recipe-details.component";
import { RecipeEditComponent } from "./recipe-edit/recipe-edit.component";
import { RecipeResolverService } from "./recipe-resolver.service";
import { RecipesComponent } from "./recipes.component";

const reciperouting : Routes =  [
    {path:'',
        component:RecipesComponent,
        canActivate:[AuthGaurd],
        children:[
            {path:'new',component:RecipeEditComponent},
            {path:':id/edit',component:RecipeEditComponent},
            {path:':id',component:RecipeDetailsComponent},
        ],
        resolve:[RecipeResolverService]
    },
]

@NgModule({
    imports:[
        RouterModule.forChild(reciperouting)
    ],
    exports:[
        RouterModule
    ]
})
export class RecipeRouting{

}