import { configureStore } from '@reduxjs/toolkit';
import gameReducer from '../feature/gameSlice';
import cardColorReducer from '../feature/cardColorSlice';
import cardDesignReducer, { Designs } from '../feature/cardDesignSlice';

const store = configureStore({
    reducer: {
        gameState: gameReducer,
        cardColor: cardColorReducer,
        cardDesign: cardDesignReducer,
    }
});

export { store };
export type RootState = ReturnType<typeof store.getState>;
export type AppGetState = typeof store.getState;
export type AppDispatch = typeof store.dispatch;
export type GenericCommonActionType = (...args: Array<any>) => (dispatch: AppDispatch, getState: AppGetState) => void;
export type CommonActionType = () => (dispatch: AppDispatch, getState: AppGetState) => void;