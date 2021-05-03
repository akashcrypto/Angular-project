import { HttpClient , HttpErrorResponse} from '@angular/common/http';
import { Injectable } from '@angular/core';
import { catchError, tap } from 'rxjs/operators';
import { throwError , BehaviorSubject } from 'rxjs';
import { User } from './user.model';

export interface AuthResponseData{
    idToken:string;	
    email:string;
    refreshToken:string;	
    expiresIn:string;
    localId:string;
    registered?: boolean;
}

@Injectable({providedIn:'root'})
export class AuthService{
     user = new BehaviorSubject<User>(null);
    constructor(private http:HttpClient){

    }

    signUp(email , password){
        return this.http.post<AuthResponseData>('https://identitytoolkit.googleapis.com/v1/accounts:signUp?key=AIzaSyB1HRtkWTenrvjXV_XI5zupEISvU-jbt1A',
            {
                email:email,
                password:password,
                returnSecureToken:true
            }
        ).pipe(catchError(this.handleError))
    }

    logIn(email , password){
        return this.http.post<AuthResponseData>('https://identitytoolkit.googleapis.com/v1/accounts:signInWithPassword?key=AIzaSyB1HRtkWTenrvjXV_XI5zupEISvU-jbt1A',
            {
                email:email,
                password:password,
                returnSecureToken:true
            }
        ).pipe(catchError(this.handleError) , tap(resData => {
           this.handleAuthentication(resData.email , resData.localId , resData.idToken , +resData.expiresIn);
        }))
    }

    autoLogin(){
        const userData:{
            email: string,
            id: string,
            _token: string,
            _tokenExpirationDate: string
        } = JSON.parse(localStorage.getItem('userData'));
        if(!userData)
            return;

        const loadedUser = new User(
            userData.email,
            userData.id,
            userData._token,
            new Date(userData._tokenExpirationDate)
        );

        if(loadedUser.token){
            this.user.next(loadedUser);
        }
    }

    logout(){
        this.user.next(null);
        localStorage.removeItem('userData');    
    }

    private handleAuthentication(email:string , usrId:string , token:string , expiresIn: number){
        const expirationDate = new Date(new Date().getTime() + expiresIn *1000);
        const user = new User(email , usrId , token , expirationDate);
        this.user.next(user);
        localStorage.setItem('userData' , JSON.stringify(user));
    }

    private handleError(errorRes: HttpErrorResponse){
        let errorMessage = "An unknown error occured!";
            console.log(errorRes);
            if(!errorRes.error || !errorRes.error.error){
                return throwError(errorMessage);
            }
            switch(errorRes.error.error.message){
            case 'EMAIL_NOT_FOUND':
                errorMessage =  'The email address is not exists';
                break;
            case 'INVALID_PASSWORD':
                errorMessage = 'Invalid Password';
                break;
            case 'EMAIL_EXISTS':
                errorMessage =  'The email address is already in use by another account.';
                break;
            }
            return throwError(errorMessage);
    }

}