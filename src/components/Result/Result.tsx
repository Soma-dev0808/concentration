import React, { FC, useEffect, useRef, useState } from 'react';
import lang from '../../utilities/lang';

import type { CommonActionType, GenericCommonActionType } from '../../app/configureStore';
import './Result.scss';
import NoWrapLoadingIndicator from '../NoWrapLoadingIndicator';

interface ResultProps {
    result: string;
    score: number;
    closeButtonAction: CommonActionType;
    postResult: GenericCommonActionType;
    isLoading: boolean,
}

const Result: FC<ResultProps> = ({
    result,
    score,
    closeButtonAction,
    postResult,
    isLoading
}) => {
    const [isPostResult, setIsPostResult] = useState<boolean>(false);
    const [hasInputError, setHasInputError] = useState<boolean>(false);
    const inputRef = useRef<HTMLInputElement>(null);

    const _score: number = lang.GAME_OVER.TITLE === result ? 0 : score;
    const isCongrats: boolean = lang.CONGRATS.TITLE === result;

    const emojiSet = {
        emoji1: isCongrats ? lang.CONGRATS.EMOJI1 : lang.GAME_OVER.EMOJI1,
        emoji2: isCongrats ? lang.CONGRATS.EMOJI2 : lang.GAME_OVER.EMOJI2,
    };

    useEffect(() => {
        return () => setIsPostResult(false);
    }, []);

    const handlePost = () => {
        if (!inputRef.current?.value) {
            setHasInputError(true);
        }
        else {
            setHasInputError(false);
            postResult(inputRef.current.value, _score);
        }
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
                <div className={`result-content${isPostResult ? '-hide' : ''}`}>

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

                    {
                        isCongrats && <button
                            className='result-post-button'
                            type='button'
                            onClick={() => setIsPostResult(prev => !prev)}
                        >
                            Post score
                        </button>
                    }
                </div>

                <div className={`result-post${isPostResult ? '-show' : ''}`}>

                    <div className='result-text-container'>
                        <p className={`result result-text`}>
                            {lang.POST_RESULT.EMOJI1}
                            {lang.POST_RESULT.TITLE}
                            {lang.POST_RESULT.EMOJI2}
                        </p>
                    </div>

                    {
                        isLoading
                            ? <NoWrapLoadingIndicator isCentred />
                            : <>
                                <input
                                    ref={inputRef}
                                    type="text"
                                    className={`result-post-username ${hasInputError ? 'result-post-error' : ''}`}
                                    name="username"
                                    placeholder='User Name'
                                    maxLength={14}
                                />
                                {hasInputError && <span className='error-message'> Please input username </span>}

                                <button
                                    className='result-post-button mt-16'
                                    type='button'
                                    onClick={handlePost}
                                >
                                    Post
                                </button>
                            </>
                    }
                </div>
            </div>
        </div>
    );
};

export default Result;