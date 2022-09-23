import { useEffect } from "react";
import { Message } from "../feature/gameSlice";

const useMessageObserve = (
    message: Message,
    callBack1: () => void,
    callBack2: () => void
) => {
    useEffect(() => {
        const _message = message as Message;

        if (_message === '') return;

        let resetCards: boolean = false;
        let resetMessage: boolean = false;

        if (_message === 'Wrong!') {
            resetCards = true;
        }

        if (_message === 'Match!' || _message === 'Wrong!') {
            resetMessage = true;
        }

        // Excuete reset functions after 800 millisec
        setTimeout(() => {
            resetCards && callBack1();
            resetMessage && callBack2();
        }, 500);
    }, [message]);
};

export default useMessageObserve;