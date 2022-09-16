import React, { FC } from 'react';
import lang from '../../utilities/lang';

import './Status.scss';

const Status: FC<{ message: string; }> = ({ message }) => {
    let gameStatus = '';

    switch (message) {
        case lang.STATUS_MESSAGE.MATCH:
            gameStatus = 'status-match';
            break;
        case lang.STATUS_MESSAGE.WRONG:
            gameStatus = 'status-wrong';
            break;
        default:
            break;
    }

    return (
        <div className={`status ${gameStatus}`}>
            {message}
        </div>
    );
};

export default Status;