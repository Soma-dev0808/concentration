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

    const _score: number = lang.GAME_OVER === result ? 0 : score;
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
                <p className="result result-text">
                    {result}
                </p>
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