import { HttpClient, HttpErrorResponse, HttpHeaders } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { BehaviorSubject, catchError, map, Observable, throwError } from 'rxjs';
import { environment } from 'src/environments/environment';
import { AuthViewModel } from '../ViewModels/authViewModel';
import { LoginView } from '../ViewModels/LoginView';

@Injectable({
  providedIn: 'root'
})
export class AuthServicesService {
  isLoggenSubject = new BehaviorSubject<boolean>(this.hasTokken())
  currentUser = new BehaviorSubject<string>("NotFound")
   private httpOptions;
   constructor(private httpClient: HttpClient) {
     this.httpOptions={
       headers: new HttpHeaders({
         'Content-Type': 'application/json'
       })
   }
 }
 hasTokken():boolean{
   return !!localStorage.getItem('tokken');
 }
 login(data?:LoginView):Observable<AuthViewModel>
 {
   return this.httpClient.post<AuthViewModel>(`${environment.APIBaseURL}/api/Account/login`,JSON.stringify(data),this.httpOptions).pipe(
     map(n=>{
       console.log(data)
       localStorage.setItem('tokken', n.token);
       this.isLoggenSubject.next(true);
       this.currentUser.next(n.username);
       return n})
 );
       // store user details and jwt token in local storage to keep user logged in between page refreshes
       // localStorage.setItem('tokken', JSON.stringify(user._id));
       // this.isLoggenSubject.next(true);
       // return user;

 // console.error('An error occurred:', err.error.message);
 }
 logout():void{
   localStorage.removeItem('tokken');
   this.isLoggenSubject.next(false);
 }
 isLoggin(): Observable<boolean>
 {
  return  this.isLoggenSubject.asObservable();
 }
 private getServerErrorMessage({ error }: { error: HttpErrorResponse; }): string {
   switch (error.status) {
     case 400:{
      return `Bad Request: ${error.message}`;
     }
       case 404: {
           return `Not Found: ${error.message}`;
       }
       case 403: {
           return `Access Denied: ${error.message}`;
       }
       case 500: {
           return `Internal Server Error: ${error.message}`;
       }
       default: {
           return `Unknown Server Error: ${error.message}${error.status}`;
       }

   }
 }
 }

