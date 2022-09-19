import { createSlice, PayloadAction } from '@reduxjs/toolkit';
import lang from '../utilities/lang';

import type { RootState } from '../app/configureStore';
import type { Designs } from './cardDesignSlice';

const GAME_MODE = {
    EASY: 'easy',
    HARD: 'hard',
} as const;
type GameModeType = typeof GAME_MODE[keyof typeof GAME_MODE];

interface GameSetting {
    mode?: GameModeType;
    design: Designs;
}
type Cards = Array<string>;
// 0: unpicked. 1: picked. 2: matched. 3: unmatched.
type CardStatuses = 0 | 1 | 2 | 3;
type CardStatusesArray = Array<CardStatuses>;
type Overlay = "" | "overlay" | "overlay overlay-start" | "overlay overlay-end";
type Result = string;
type MessageKeys = keyof typeof lang.STATUS_MESSAGE;
type Message = typeof lang.STATUS_MESSAGE[MessageKeys];

type RollbackObj = {
    firstPick: RollbackStatus,
    secondPick: RollbackStatus;
};
interface ConcentrationCore {
    cards: Cards,
    status: CardStatusesArray,
    stsRollBackIdx: RollbackObj, // temp status for rollback status
    ready: ReadyStatus,
    count: number,
    timer: number | null,
    run: boolean,
    result: Result,
    message: Message,
    overlay: Overlay;
}

interface CardClickEventResult {
    status: CardStatusesArray,
    stsRollBackIdx: RollbackObj,
    ready: ReadyStatus,
    message: Message,
    run: boolean,
    result: Result,
    overlay: Overlay;
}

type ReadyStatus = -2 | -1 | 0 | 1 | 2 | 3 | 4 | 5 | 6 | 7 | 8 | 9; // -2: disable card pick. -1: 1 card pciked. 0 ~ 9: card number.
type RollbackStatus = -1 | 0 | 1 | 2 | 3 | 4 | 5 | 6 | 7 | 8 | 9; // -1: No idx set(default). 0 ~ 9 card idx.

interface ConcentrationCore {
    cards: Cards,
    status: CardStatusesArray,
    stsRollBackIdx: RollbackObj, // temp status for rollback status
    ready: ReadyStatus,
    count: number,
    timer: number | null,
    run: boolean,
    result: Result,
    message: Message,
    overlay: Overlay;
}

const _count = 15;
const initialState: ConcentrationCore = {
    cards: [],
    status: [],
    stsRollBackIdx: { 'firstPick': -1, 'secondPick': -1 },
    ready: -1,
    count: _count,
    timer: null,
    run: false,
    result: '',
    message: lang.STATUS_MESSAGE.NO_STATUS,
    overlay: 'overlay'
};

export const gameSlice = createSlice({
    name: 'cardDesign',
    initialState: {
        gameState: initialState
    },
    reducers: {
        initGame: (state, action: PayloadAction<ConcentrationCore>) => {
            state.gameState = { ...action.payload };
        },
        startGame: (state, action: PayloadAction<{ timer: number | null; }>) => {
            state.gameState = {
                ...state.gameState,
                timer: action.payload.timer,
                run: true,
                overlay: 'overlay overlay-start',
            };
        },
        finishGame: (state) => {
            state.gameState = {
                ...state.gameState,
                message: '',
                count: 0,
                run: false,
                result: lang.GAME_OVER.TITLE,
                overlay: 'overlay overlay-end',
            };
        },
        updateCount: (state, action: PayloadAction<{ count: number; }>) => {
            state.gameState.count = action.payload.count;
        },
        cardClick: (state, action: PayloadAction<CardClickEventResult | undefined>) => {
            if (action.payload) {
                state.gameState = {
                    ...state.gameState,
                    ...action.payload,
                };
            }
        },
        closeResult: (state) => {
            state.gameState.result = '';
        },
        resetPickedCards: (state) => {
            const { firstPick, secondPick } = state.gameState.stsRollBackIdx;
            const newStatus = state.gameState.status.slice();

            if (firstPick === -1 || secondPick === -1) return state;

            newStatus[firstPick] = 0;
            newStatus[secondPick] = 0;

            state.gameState = {
                ...state.gameState,
                status: newStatus,
                ready: -1
            };
        },
        resetMessage: (state) => {
            state.gameState.result = '';
        }
    }
});


const {
    initGame,
    startGame,
    finishGame,
    updateCount,
    cardClick,
    closeResult,
    resetPickedCards,
    resetMessage,
} = gameSlice.actions;

type InitGame = typeof initGame;
type StartGame = typeof startGame;
type FinishGame = typeof finishGame;
type UpdateCount = typeof updateCount;
type CardClick = typeof cardClick;
type CloseResult = typeof closeResult;
type ResetPickedCards = typeof resetPickedCards;
type ResetMessage = typeof resetMessage;

const selectGameState = (state: RootState) => state.gameState.gameState;

export {
    initGame,
    startGame,
    finishGame,
    updateCount,
    cardClick,
    closeResult,
    resetPickedCards,
    resetMessage,
    selectGameState
};
export type {
    Designs,
    InitGame,
    StartGame,
    FinishGame,
    UpdateCount,
    CardClick,
    CloseResult,
    ResetPickedCards,
    ResetMessage,
    GameSetting,
    ConcentrationCore,
    Cards,
    CardStatuses,
    CardStatusesArray,
    Overlay,
    MessageKeys,
    Message,
    ReadyStatus,
    RollbackStatus
};
export default gameSlice.reducer;