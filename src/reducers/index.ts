
import { gameReducer, GameActions } from './gameReducer';

type Action = {
    type: string,
    payload: any,
};


export { gameReducer, GameActions };
export type { Action };
