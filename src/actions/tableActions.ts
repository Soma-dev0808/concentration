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
import {
    clickCardEvent,
    getDifficulty,
    IndexNumbers,
    initCards
} from '../utilities/utils';
import { fetchUserScores, postUserScore, toggleScoreListModal } from '../feature/userScoreSlice';

import type { AppDispatch, AppGetState } from "../app/configureStore";

const initializeGame = () => {
    return (dispatch: AppDispatch, getState: AppGetState) => {
        const design = getState().cardDesign.design;
        const difficulty = getDifficulty(getState().cardColor.color);
        dispatch(initGame(initCards({ design, difficulty })));
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

const handlePostResult = (username: string, score: number) => {
    return async (dispatch: AppDispatch, getState: AppGetState) => {
        await dispatch(postUserScore({ username, score }));

        dispatch(closeResult());

        if (!getState().userScores.error) {
            setTimeout(() => {
                dispatch(toggleScoreListModal({ isShow: true }));

            }, 500);
        }
    };
};

const handleGetScoreList = () => {
    return async (dispatch: AppDispatch) => {
        dispatch(fetchUserScores());
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
    handleResetMessage,
    handlePostResult,
    handleGetScoreList
};