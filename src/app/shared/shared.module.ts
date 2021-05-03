import { CommonModule } from "@angular/common";
import { NgModule } from "@angular/core";
import { AlertComponent } from "./alert/alert.component";
import { DropDownDirective } from "./dropdown.directive";
import { LoadingSpinner } from "./loading-spinner/loading-spineer.component";
import { PlaceHolderDirective } from "./placeholder/placeholder.directive";

@NgModule({
    declarations:[
        DropDownDirective,
        LoadingSpinner,
        AlertComponent,
        PlaceHolderDirective
    ],
    imports:[
        CommonModule,
    ],
    exports:[
        DropDownDirective,
        LoadingSpinner,
        AlertComponent,
        PlaceHolderDirective,
        CommonModule
    ]
})
export class SharedModule{

}