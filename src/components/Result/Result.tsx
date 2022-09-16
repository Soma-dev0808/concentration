import React, { FC } from 'react';
import lang from '../../utilities/lang';

import './Result.scss';

interface ResultProps {
    result: string;
    score: number;
    closeButtonAction: () => void;
}

const Result: FC<ResultProps> = ({
    result,
    score,
    closeButtonAction
}) => {

    const _score: number = lang.GAME_OVER.TITLE === result ? 0 : score;
    const isCongrats: boolean = lang.CONGRATS.TITLE === result;

    const emojiSet = {
        emoji1: isCongrats ? lang.CONGRATS.EMOJI1 : lang.GAME_OVER.EMOJI1,
        emoji2: isCongrats ? lang.CONGRATS.EMOJI2 : lang.GAME_OVER.EMOJI2,
    };

    return (
        <div className='result-container'>
            <div className='result-modal'>
                <button
                    type='button'
                    className='result-close'
                    onClick={closeButtonAction}
                >
                    ✖
                </button>

                <div className='result-text-container'>
                    <span className='result result-text'>
                        {emojiSet.emoji1}
                    </span>
                    <p className={`result result-text result-text${isCongrats && '-congrats'}`}>
                        {result}
                    </p>
                    <span className='result result-text'>
                        {emojiSet.emoji2}
                    </span>
                </div>


                <p className='result result-score'>
                    Score: {_score}s
                </p>

                <button className='result-post-button'>
                    Post score
                </button>
            </div>
        </div>
    );
};

export default Result;