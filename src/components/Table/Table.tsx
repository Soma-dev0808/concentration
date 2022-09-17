import React, { FC, useEffect, useReducer, useState } from 'react';
import { useAppSelector } from '../../app/hooks';
import { selectCardColor } from '../../feature/cardColorSlice';
import Card from '../Card';
import Status from '../Status';
import TimeCount from '../TimeCount';
import StartButton from '../StartButton';
import Result from '../Result';
import { gameReducer, GameActions, Action } from '../../reducers';
import { ConcentrationCore, initCards, clickCardEvent, IndexNumbers } from '../../utilities/utils';
import useMessageObserve from '../../customHooks/useMessageObserve';
import lang from '../../utilities/lang';

import './Table.scss';

const countLimit = 15;

// Table for concentration.
const Table: FC = () => {
    const [time, setTime] = useState(countLimit);
    const color = useAppSelector(selectCardColor);

    const [state, dispatch]: [ConcentrationCore, React.Dispatch<Action>] = useReducer(gameReducer, initCards());
    useMessageObserve(state.message, dispatch);

    // Initialization
    useEffect(() => {
        dispatch({
            type: GameActions.INIT,
            payload: initCards()
        });
    }, []);

    // start
    const gameStart = () => {
        if (state.run) return;

        // Initialization
        dispatch({
            type: GameActions.INIT,
            payload: initCards()
        });
        setTime(countLimit);

        const timer = setInterval(() => {
            setTime(prev => prev - 1);
        }, 1000);
        // Strat game
        dispatch({
            type: GameActions.START_GAME, payload: {
                timer,
                run: true,
                overlay: 'overlay overlay-start'
            }
        });
    };

    // When game is started this will work.
    useEffect(() => {
        if (!state.run) return;

        if (time < 1) {
            // Reset setInterval
            state.timer && clearInterval(state.timer);

            // Time up! and finish game
            dispatch({
                type: GameActions.FINISH_GAME,
                payload: {
                    message: '',
                    count: 0,
                    run: false,
                    result: lang.GAME_OVER.TITLE,
                    overlay: 'overlay overlay-end',
                }
            });
            return;
        }

        // Update count(count down)
        dispatch({
            type: GameActions.UPDATE_COUNTDOWN,
            payload: {
                count: time
            }
        });

    }, [time]);

    // Update a card status after clicking it.
    const handleCardClick = (idx: IndexNumbers) => {
        dispatch({
            type: GameActions.UPDATE_CARD,
            payload: clickCardEvent(state, idx)
        });
    };

    // Close dialog
    const handleCloseResultClick = () => {
        dispatch({
            type: GameActions.CLOSE_RESULT,
            payload: {}
        });
    };

    return (
        <>
            <div className='main'>
                <div>
                    {/* Start button */}
                    <StartButton
                        isRun={state.run}
                        gameStart={gameStart}
                    />

                    <div className='game-info'>
                        {/* Show match or wrong status */}
                        <Status message={state.message} />
                        {/* Show time left */}
                        <TimeCount count={state.count} />
                    </div>

                    <div className="table">
                        {[...Array(10).keys()].map((_, idx) =>
                            <Card
                                key={idx}
                                card={state.cards[idx]}
                                status={state.status[idx]}
                                onClick={() => handleCardClick(idx as IndexNumbers)}
                                color={color}
                            />)
                        }
                    </div>

                    <div className={state.overlay}></div>
                </div>
            </div>

            {
                state.result !== '' && (
                    <Result
                        result={state.result}
                        score={countLimit - state.count}
                        closeButtonAction={handleCloseResultClick}
                    />
                )
            }
        </>
    );
};

export default Table;