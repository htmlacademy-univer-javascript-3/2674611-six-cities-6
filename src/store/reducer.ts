import {createReducer} from '@reduxjs/toolkit';
import {changeCity} from './action.ts';

export interface AppState {
  city: string;
}

const initialState: AppState = {
  city: 'Paris',
};

const reducer = createReducer(initialState, (builder) => {
  builder
    .addCase(changeCity, (state, action) => {
      state.city = action.payload;
    });
});

export {reducer};
