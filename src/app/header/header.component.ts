import { Component, OnInit, Output , EventEmitter, OnDestroy } from '@angular/core';
import { DataStorageService } from '../shared/data-storage.service';
import { Subscription } from 'rxjs';
import { AuthService } from '../auth/auth.service';
import { Router } from '@angular/router';
 
@Component({
  selector: 'app-header',
  templateUrl: './header.component.html',
  styleUrls: ['./header.component.css']
})
export class HeaderComponent implements OnInit ,OnDestroy {
  private userSub: Subscription;
  isAuthentication = false;
  constructor(private dataStorageService:DataStorageService,
              private authService: AuthService,
              private router: Router) { }

  ngOnInit(): void {
    this.authService.user.subscribe(user =>{
      this.isAuthentication = !!user;
    })
  }

  onSaveData(){
    this.dataStorageService.storeRecipe();
  }

  onFetch(){
    this.dataStorageService.fetchRecipes().subscribe();
  }

  onlogout(){
    this.authService.logout();
    this.router.navigate(['/auth']);
  }

  ngOnDestroy(){

  }

}
