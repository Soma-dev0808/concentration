import React, { FC, useEffect, useReducer, useState } from 'react';
import Card from '../Card';
import Status from '../Status';
import { gameReducer, GameActions, Action } from '../../reducers';
import { ConcentrationCore, initCards, clickCardEvent, IndexNumbers } from '../../utilities/utils';
import useMessageObserve from '../../customHooks/useMessageObserve';
import lang from '../../utilities/lang';

import './Table.scss';
import Result from '../Result';

const countLimit = 10000;

// Table for concentration.
const Table: FC<{ color: string; }> = ({ color }) => {
    const [time, setTime] = useState(countLimit);
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

    useEffect(() => {
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
                    result: lang.GAME_OVER,
                    overlay: 'overlay overlay-end',
                }
            });
        }

        if (state.run) {
            // Update count(count down)
            dispatch({
                type: GameActions.UPDATE_COUNTDOWN,
                payload: {
                    count: time
                }
            });
        }

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
                    <button
                        className={`start-button start-button-${state.run && 'started'}`}
                        onClick={gameStart}
                    >
                        Start
                    </button>

                    <div className="count-number">
                        Time left : {state.count}s
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

                    <Status message={state.message} />

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