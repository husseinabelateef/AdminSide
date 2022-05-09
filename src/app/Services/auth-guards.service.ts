import { Injectable } from '@angular/core';
import {
  CanActivate, Router,
  ActivatedRouteSnapshot,
  RouterStateSnapshot,
  CanActivateChild,
  UrlTree
} from '@angular/router';
import { checkServerIdentity } from 'tls';
import { AuthServicesService } from './auth-services.service';
@Injectable({
  providedIn: 'root',
})
export class AuthGuard implements CanActivate, CanActivateChild {
  constructor(private authService: AuthServicesService, private router: Router) {}

  canActivate(
    route: ActivatedRouteSnapshot,
    state: RouterStateSnapshot): true|UrlTree {
    const url: string = state.url;

    return this.checkLogin(url);
  }

  canActivateChild(
    route: ActivatedRouteSnapshot,
    state: RouterStateSnapshot): true|UrlTree {
    return this.canActivate(route, state);
  }

checkLogin(url:):true|UrlTree{
  var islog:boolean = false
let su = this.authService.isLoggin().subscribe(x=>islog=x);

if(islog){
  return true;
}
return url

}
}
