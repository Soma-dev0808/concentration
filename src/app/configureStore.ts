import { configureStore } from '@reduxjs/toolkit';
import gameReducer from '../feature/gameSlice';
import cardColorReducer from '../feature/cardColorSlice';
import cardDesignReducer from '../feature/cardDesignSlice';
import apiStatusReducer from '../feature/apiStatusSlice';
import userScoresReducer from '../feature/userScoreSlice';

const store = configureStore({
    reducer: {
        gameState: gameReducer,
        cardColor: cardColorReducer,
        cardDesign: cardDesignReducer,
        apiStatus: apiStatusReducer,
        userScores: userScoresReducer,
    }
});

export { store };
export type RootState = ReturnType<typeof store.getState>;
export type AppGetState = typeof store.getState;
export type AppDispatch = typeof store.dispatch;
export type GenericCommonActionType = (...args: Array<any>) => (dispatch: AppDispatch, getState: AppGetState) => void;
export type CommonActionType = () => (dispatch: AppDispatch, getState: AppGetState) => void;