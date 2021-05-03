import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';
import { HttpClientModule, HTTP_INTERCEPTORS } from '@angular/common/http';

import { AppComponent } from './app.component';
import { HeaderComponent } from './header/header.component';
import { AppRouting } from './app-routing.module';
import { RecipeService } from './recipes/recipe.service';
import { ShoppingService } from './shopping-list/shopping.service';
import { AuthService } from './auth/auth.service';
import { AuthInterceptorService } from './auth/auth-interceptor.service';
import { AlertComponent } from './shared/alert/alert.component';
import { RecipeModule } from './recipes/recipe.module';
import { ShoppingListModule } from './shopping-list/shopping-list.module';
import { SharedModule } from './shared/shared.module';
import { AuthModule } from './auth/auth.module';

@NgModule({
  declarations: [
    AppComponent,
    HeaderComponent,
  ],
  imports: [
    BrowserModule,
    HttpClientModule,
    AppRouting,
    SharedModule,
  ],
  providers: [
    ShoppingService,
    RecipeService,
    AuthService,
    {
      provide: HTTP_INTERCEPTORS,
      useClass:AuthInterceptorService,
      multi:true
    }
  ],
  bootstrap: [AppComponent],
  entryComponents:[AlertComponent]
})
export class AppModule { }
