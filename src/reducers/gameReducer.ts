// Reducer for game control
import { Action } from '.';
import type { ConcentrationCore } from '../utilities/utils';

enum GameActions {
    INIT = 'INIT', // Initialize or reset game
    START_GAME = 'START_GAME', // Start game
    FINISH_GAME = 'FINISH_GAME', // Finish game
    UPDATE_COUNTDOWN = 'UPDATE_COUNTDOWN', // Update current count down
    RESET_PICKED_CARDS = 'RESET_PICKED_CARDS', // Reset pciked cards when got wrong match
    RESET_MESSAGE = 'RESET_MESSAGE', // Reset message
}


const gameReducer = (state: ConcentrationCore, action: Action) => {
    const { type, payload } = action;
    switch (type) {
        case GameActions.INIT:
            return {
                ...payload
            };
        case GameActions.START_GAME:
            return {
                ...state,
                ...payload
            };
        case GameActions.FINISH_GAME:
            return {
                ...state,
                ...payload,
            };
        case GameActions.UPDATE_COUNTDOWN:
            return {
                ...state,
                count: payload.count,
            };
        case GameActions.RESET_PICKED_CARDS:
            const { firstPick, secondPick } = state.stsRollBackIdx;
            const newStatus = state.status.slice();

            if (firstPick === -1 || secondPick === -1) return state;

            newStatus[firstPick] = 0;
            newStatus[secondPick] = 0;

            return {
                ...state,
                status: newStatus,
                ready: -1
            };
        case GameActions.RESET_MESSAGE:
            return {
                ...state,
                message: ''
            };
        default:
            return state;
    }
};

export { GameActions, gameReducer };
