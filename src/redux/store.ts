import { configureStore, ThunkAction, Action } from '@reduxjs/toolkit';
import reservationSlice from './slices/reservationSlice';

export const store = configureStore({
  reducer: {
    reservations: reservationSlice,
  }
});

export type AppDispatch = typeof store.dispatch;
export type RootState = ReturnType<typeof store.getState>;
export type AppThunk<ReturnType = void> = ThunkAction<
  ReturnType,
  RootState,
  unknown,
  Action<string>
>;
