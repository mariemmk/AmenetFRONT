import { Injectable } from '@angular/core';
import { CanActivate, ActivatedRouteSnapshot, RouterStateSnapshot, Router } from '@angular/router';
import { Observable, of } from 'rxjs';
import { catchError, first, mapTo, switchMap } from 'rxjs/operators';
import { UserService } from 'src/app/Services/user.service';
import { Client } from 'src/app/core/models/Client';


@Injectable({
  providedIn: 'root'
})
export class DataUserGuard implements CanActivate {

  constructor(private authService: UserService, private router: Router) {}

  canActivate(): Observable<boolean> {
    return this.authService.user$.pipe(
      first(),
      switchMap((user: Client | null): Observable<boolean> => {
        if (!user) {
          return this.authService.getCurrentUser().pipe(
            mapTo(true),
            catchError((error) => {
              console.error('Error in canActivate:', error);
              this.router.navigate(['/login']);
              return of(false);
            })
          );
        } else {
          return of(true);
        }
      })
    );
  }
}
