import { useEffect } from "react";
import { Action, GameActions } from "../reducers";
import { Message } from "../utilities/utils";

const useMessageObserve = (message: Message, dispatch: (value: Action) => void) => {
    useEffect(() => {
        const _message = message as Message;

        if (_message === '') return;

        let resetCards: Action | null = null;
        let resetMessage: Action | null = null;

        if (_message === 'Wrong!') {
            resetCards = {
                type: GameActions.RESET_PICKED_CARDS,
                payload: {}
            };
        }

        if (_message === 'Match!' || _message === 'Wrong!') {
            resetMessage = {
                type: GameActions.RESET_MESSAGE,
                payload: {}
            };
        }

        // Excuete reset functions after 800 millisec
        setTimeout(() => {
            resetCards && dispatch(resetCards);
            resetMessage && dispatch(resetMessage);
        }, 800);
    }, [message]);
};

export default useMessageObserve;