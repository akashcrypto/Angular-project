import { Component, ComponentFactoryResolver, OnDestroy, OnInit, ViewChild } from '@angular/core';
import { NgForm } from '@angular/forms';
import { Router } from '@angular/router';
import { Observable, Subscription } from 'rxjs';
import { AuthService , AuthResponseData } from './auth.service';
import { AlertComponent } from '../shared/alert/alert.component';
import { PlaceHolderDirective } from '../shared/placeholder/placeholder.directive';

@Component({
  selector: 'app-auth',
  templateUrl: './auth.component.html',
  styleUrls: ['./auth.component.css']
})
export class AuthComponent implements OnInit , OnDestroy {
  isLoggedIn = true;
  isLoading = false;
  error = false;
  errorMessage = '';
  @ViewChild(PlaceHolderDirective) alertHost: PlaceHolderDirective;
  closeAlert :Subscription;
  constructor(private auth:AuthService,
              private router:Router,
              private componentFectoryResolver:ComponentFactoryResolver) { }

  ngOnInit(): void {
    
  }

  onSwitchMode(){
    this.isLoggedIn = !this.isLoggedIn;
  }

  onSubmit(form : NgForm){
    this.isLoading = true;
    let authObs: Observable<AuthResponseData>;
    if(this.isLoggedIn){
      authObs = this.auth.logIn(form.value.email ,form.value.password)
    }
    else{
      authObs = this.auth.signUp(form.value.email ,form.value.password)
    }

    authObs.subscribe(resData=>{
      console.log(resData)
      this.isLoading = false;
      this.router.navigate(['/recipe'])
    },error=>{
      this.error = true;
      this.errorMessage = error;
      this.showErrorAlert(error);
      this.isLoading = false;
    })
    form.reset();
  }

  closeEvent(){
    this.error = null;
  }

  private showErrorAlert(message:string){
    const alertCmp = this.componentFectoryResolver.resolveComponentFactory(AlertComponent);
    const hostViewContainerRef = this.alertHost.viewContainerRef;
    hostViewContainerRef.clear();
    const componentRef = hostViewContainerRef.createComponent(alertCmp);
    componentRef.instance.message = message;
    this.closeAlert = componentRef.instance.close.subscribe(() => {
      this.closeAlert.unsubscribe();
      hostViewContainerRef.clear();
    })
  }

  ngOnDestroy(){
    if(this.closeAlert){
      this.closeAlert.unsubscribe();
    }
  }
}
