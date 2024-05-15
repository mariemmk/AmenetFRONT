import { Injectable } from "@angular/core";
import { CanActivate, Router, ActivatedRouteSnapshot, RouterStateSnapshot, UrlTree } from "@angular/router";
import { Store, select } from "@ngrx/store";
import { Observable, take, map } from "rxjs";

@Injectable({
  providedIn: 'root'
})
export class AuthGuard implements CanActivate {

  constructor(private store: Store<any>, private router : Router) {}

  canActivate(
    next: ActivatedRouteSnapshot,
    state: RouterStateSnapshot): Observable<boolean | UrlTree> {
    return this.store.pipe(
      select('user'),
      take(1),
      map((user) => {
        if (user && user.accessToken) {
          let accessToken = localStorage.getItem("accessToken");
          let userAccessToken = user.accessToken;
          return accessToken === userAccessToken;
        }
        this.router.navigateByUrl("/login"); // Navigate to login if user is not authenticated
        return false;
      })
    );
  }
}


  