import { configureStore } from '@reduxjs/toolkit';
import cardColorReducer from '../feature/cardColorSlice';

const store = configureStore({
    reducer: {
        cardColor: cardColorReducer,
    }
});

export { store };
export type RootState = ReturnType<typeof store.getState>;
export type AppDispatch = typeof store.dispatch;