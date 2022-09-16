import React, { FC } from 'react';

import './StartButton.scss';

interface StartButtonProps {
    isRun: boolean,
    gameStart: () => void;
}

const StartButton: FC<StartButtonProps> = ({ isRun, gameStart }) => {
    return (
        <button
            className={`start-button start-button-${isRun && 'started'}`}
            onClick={gameStart}
        >
            Start
        </button>
    );
};

export default StartButton;