import { createAction, props } from "@ngrx/store";
import { Client } from "src/app/core/models/Client";

export interface User {
    user : Client,
    accessToken : string
}

export const LOGIN = '[USER] LOGIN';
export const LOGIN_SUCCESS = '[USER] LOGIN SUCCESS'
export const LOGOUT = '[USER] LOGOUT'
export const SIGNUP = '[USER] SIGNUP'
export const SIGNUP_SUCCESS = '[USER] SIGNUP SUCCESS'
export const SIGNUP_FAILURE = '[USER] SIGNUP FAILURE'
export const UPDATE = '[USER] UPDATE'
export const VERIFY = '[USER] VERIFY'
export const CURRENT_USER = '[USER] CURRENT USER'
export const UPDATE_ADMIN = '[USER] UPDATE ADMIN'

export const login = createAction(LOGIN, props<{email : string, password: string}>());
export const loginSucces = createAction(LOGIN_SUCCESS, props<{payload : User}>());
export const logout = createAction(LOGOUT);
export const signup = createAction(SIGNUP, props<Client>());
export const signupSuccess = createAction(SIGNUP_SUCCESS, props<{ result: User }>());
export const signupFailure = createAction(SIGNUP_FAILURE, props<{ error: any }>());
export const update = createAction(UPDATE, props<Client>());
export const verify = createAction(VERIFY);
export const currentUser = createAction(CURRENT_USER, props<User>());
export const update_admin = createAction(UPDATE_ADMIN, props<Client>());
