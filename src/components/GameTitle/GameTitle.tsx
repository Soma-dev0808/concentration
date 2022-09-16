import React, { FC } from 'react';
import lang from '../../utilities/lang';

import './GameTitle.scss';

const GameTitle: FC = () => {
    return (
        <div className='game-title-container'>
            <h1 className='game-title'>
                {lang.GAME_TITLE}
            </h1>
        </div>
    );
};

export default GameTitle;