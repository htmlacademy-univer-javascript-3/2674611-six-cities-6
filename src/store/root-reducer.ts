import {combineReducers} from '@reduxjs/toolkit';
import {userProcess} from './user-process/user-process.ts';
import {NameSpace} from '../const.ts';
import {reducer} from './reducer.ts';
import {offersData} from './offers-data/offers-data.ts';
import {reviewsData} from './reviews-data/reviews-data.ts';

export const rootReducer = combineReducers({
  [NameSpace.User]: userProcess.reducer,
  [NameSpace.Offers]: offersData.reducer,
  [NameSpace.Other]: reducer,
  [NameSpace.Reviews]: reviewsData.reducer,
});
