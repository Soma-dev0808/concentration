import { configureStore } from '@reduxjs/toolkit';
import cardColorReducer from '../feature/cardColorSlice';
import cardDesignReducer from '../feature/cardDesignSlice';

const store = configureStore({
    reducer: {
        cardColor: cardColorReducer,
        cardDesign: cardDesignReducer,
    }
});

export { store };
export type RootState = ReturnType<typeof store.getState>;
export type AppGetState = typeof store.getState;
export type AppDispatch = typeof store.dispatch;
export type CommonActionType = () => (dispatch: AppDispatch, getState: AppGetState) => void;