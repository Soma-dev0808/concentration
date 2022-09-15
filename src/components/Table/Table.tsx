import React, { FC, useEffect, useReducer, useState } from 'react';
import Card from '../Card';
import { gameReducer, GameActions, Action } from '../../reducers';
import { ConcentrationCore, initCards, clickCardEvent, IndexNumbers } from '../../utilities/utils';

import type { Message } from '../../utilities/utils';
import './Table.scss';

// Table for concentration.
const Table: FC = () => {
    const [time, setTime] = useState(15);
    const [state, dispatch]: [ConcentrationCore, React.Dispatch<Action>] = useReducer(gameReducer, initCards());

    useEffect(() => {
        dispatch({
            type: GameActions.INIT,
            payload: initCards()
        });
    }, []);

    useEffect(() => {
        const message = state.message as Message;

        if (message === '') return;

        let resetCards: Action | null = null;
        let resetMessage: Action | null = null;

        if (message === 'Wrong!') {
            resetCards = {
                type: GameActions.RESET_PICKED_CARDS,
                payload: {}
            };
        }

        if (message === 'Match!' || message === 'Wrong!') {
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
    }, [state.message]);

    // start
    const gameStart = () => {
        if (state.run) return;
        dispatch({
            type: GameActions.INIT,
            payload: initCards()
        });
        const timer = setInterval(() => {
            setTime(prev => prev - 1);
        }, 1000);
        // Strat game
        dispatch({
            type: GameActions.START_GAME, payload: {
                timer,
                run: true,
                overlay: ''
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
                    title: 'Game over....',
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

    const handleCardClick = (idx: IndexNumbers) => {
        clickCardEvent(state, idx);
    };

    const renderCard = (i: IndexNumbers) => {
        return (
            <Card
                key={i}
                card={state.cards[i]}
                status={state.status[i]}
                onClick={() => handleCardClick(i)}
            />
        );
    };


    return (
        <div>
            <button
                className="start-button"
                onClick={gameStart}
            >
                Start
            </button>

            <div className="count-number">
                Time left : {state.count}s
            </div>

            <div className="table">
                {[...Array(10).keys()].map((_, idx) => renderCard(idx as IndexNumbers))}
            </div>

            <div className="status">
                {state.message}
            </div>

            <div className={state.overlay}>
                <p className="title">
                    {state.title}
                </p>
            </div>
        </div>
    );
};

export default Table;