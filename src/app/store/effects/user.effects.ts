import { Injectable } from "@angular/core";
import { Actions, createEffect, ofType } from "@ngrx/effects";
import { UserService } from "src/app/Services/user.service";
import { CURRENT_USER, LOGIN, LOGIN_SUCCESS, LOGOUT, SIGNUP, signupFailure, signupSuccess } from "../actions/user.action";
import { catchError, exhaustMap, map, of } from "rxjs";
import { Router } from "@angular/router";
import { Client } from "src/app/core/models/Client";

@Injectable()
export class UserEffects {
  
  login$ = createEffect(() =>
    this.actions$.pipe(
      ofType(LOGIN),
      exhaustMap((action: { email: string, password: string, type: string }) => 
        this.authService.login({ email: action.email, password: action.password }).pipe(
          map(response => ({ type: LOGIN_SUCCESS, payload: response })),
          catchError(error => of({ type: 'LOGIN_FAILURE', error }))
        )
      )
    )
  );

  loginSuccess$ = createEffect(() =>
    this.actions$.pipe(
      ofType(LOGIN_SUCCESS),
      map((payload: { payload: { accessToken: string, user: Client } }) => {
        localStorage.setItem("accessToken", payload.payload.accessToken);
        localStorage.setItem("user", JSON.stringify(payload.payload.user));
        this.router.navigateByUrl("/client");
        return { type: 'NO_ACTION' };
      })
    )
  );

  logout$ = createEffect(() =>
    this.actions$.pipe(
      ofType(LOGOUT),
      map(() => {
        localStorage.removeItem("accessToken");
        localStorage.removeItem("user");
        this.router.navigateByUrl("/login");
        return { type: 'NO_ACTION' };
      })
    )
  );

  signup$ = createEffect(() =>
    this.actions$.pipe(
      ofType(SIGNUP),
      exhaustMap((payload: Client) =>
        this.authService.signup(payload).pipe(
          map(response => {
            const { user, accessToken } = response;
            return signupSuccess({ result: { user, accessToken } });
          }),
          catchError(error => of(signupFailure({ error })))
        )
      )
    )
  );

  constructor(
    private actions$: Actions,
    private authService: UserService,
    private router: Router
  ) {}
}
