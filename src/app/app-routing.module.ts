import { NgModule } from '@angular/core';
import { Routes , RouterModule } from '@angular/router';


const approuting:Routes = [
    {path:'',redirectTo:'/recipe',pathMatch:'full'},
    {path:'recipe', loadChildren:'./recipes/recipe.module#RecipeModule'},
    {path:'shopping-list', loadChildren:'./shopping-list/shopping-list.module#ShoppingListModule'},
    {path:'auth', loadChildren:'./auth/auth.module#AuthModule'}
];

@NgModule({
    imports:[RouterModule.forRoot(approuting)],
    exports:[RouterModule]
})

export class AppRouting{

}