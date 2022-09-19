import {
    initGame,
    startGame,
    finishGame,
    updateCount,
    cardClick,
    closeResult,
    resetPickedCards,
    resetMessage,
} from '../feature/gameSlice';
import { clickCardEvent, IndexNumbers, initCards } from '../utilities/utils';

import type { AppDispatch, AppGetState } from "../app/configureStore";
import type { Designs } from "../feature/cardDesignSlice";

const initializeGame = (design: Designs) => {
    return (dispatch: AppDispatch) => {
        dispatch(initGame(initCards({ design })));
    };
};

const startNewGame = (timer: number | null) => {
    return (dispatch: AppDispatch) => {
        dispatch(startGame({ timer }));
    };
};

const finishCurrGame = () => {
    return (dispatch: AppDispatch) => {
        dispatch(finishGame());
    };
};

const updateGameCount = (time: number) => {
    return (dispatch: AppDispatch) => {
        dispatch(updateCount({ count: time }));
    };
};

const cardClickEvent = (idx: IndexNumbers) => {
    return (dispatch: AppDispatch, getState: AppGetState) => {
        const cardState = getState().gameState.gameState;
        dispatch(cardClick(clickCardEvent(cardState, idx)));
    };
};

const closeResultDialog = () => {
    return (dispatch: AppDispatch) => {
        dispatch(closeResult());
    };
};

const handleResetPickedCards = () => {
    return (dispatch: AppDispatch) => {
        dispatch(resetPickedCards());
    };
};

const handleResetMessage = () => {
    return (dispatch: AppDispatch) => {
        dispatch((resetMessage));
    };
};

export {
    initializeGame,
    startNewGame,
    finishCurrGame,
    updateGameCount,
    cardClickEvent,
    closeResultDialog,
    handleResetPickedCards,
    handleResetMessage
};