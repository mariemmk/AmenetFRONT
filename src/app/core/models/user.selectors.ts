import { createSelector, createFeatureSelector } from '@ngrx/store';
import { User } from 'src/app/store/actions/user.action';


export const selectUserState = createFeatureSelector<User>('user');

export const selectCurrentUser = createSelector(
  selectUserState,
  (state: User) => state.user
);

export const selectAccessToken = createSelector(
  selectUserState,
  (state: User) => state.accessToken
);
