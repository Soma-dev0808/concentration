import React, { FC, useEffect, useState } from 'react';
import Card from '../Card';
import Status from '../Status';
import TimeCount from '../TimeCount';
import StartButton from '../StartButton';
import Result from '../Result';
import useMessageObserve from '../../customHooks/useMessageObserve';

import './Table.scss';

import type { IndexNumbers } from '../../utilities/utils';
import type { ConcentrationCore } from '../../feature/gameSlice';
import type { Colors } from '../../feature/cardColorSlice';
import type { Designs } from '../../feature/cardDesignSlice';
import type { GenericCommonActionType, CommonActionType } from '../../app/configureStore';

const countLimit = 15;

interface TableProps extends ConcentrationCore {
    color: Colors,
    design: Designs;
    initializeGame: GenericCommonActionType,
    startNewGame: GenericCommonActionType,
    finishCurrGame: CommonActionType,
    updateGameCount: GenericCommonActionType,
    cardClickEvent: GenericCommonActionType,
    closeResultDialog: CommonActionType,
    resetPickedCards: CommonActionType;
    resetMessage: CommonActionType;
}

// Table for concentration.
const Table: FC<TableProps> = ({
    color,
    design,
    cards,
    status,
    count,
    timer,
    run,
    result,
    message,
    overlay,
    initializeGame,
    startNewGame,
    finishCurrGame,
    updateGameCount,
    cardClickEvent,
    closeResultDialog,
    resetPickedCards,
    resetMessage
}) => {
    const [time, setTime] = useState(countLimit);

    useMessageObserve(message, resetPickedCards, resetMessage);

    // Initialization
    useEffect(() => {
        initializeGame(design);
    }, []);

    // start
    const gameStart = () => {
        if (run) return;

        // Initialization
        initializeGame(design);

        setTime(countLimit);

        const timer = setInterval(() => {
            setTime(prev => prev - 1);
        }, 1000);
        // Start game
        startNewGame(timer);
    };

    // When game is started this will work.
    useEffect(() => {
        if (!run) return;

        if (time < 1) {
            // Reset setInterval
            timer && clearInterval(timer);

            // Time up! and finish game
            finishCurrGame();
            return;
        }

        // Update count(count down)
        updateGameCount(time);

    }, [time]);

    return (
        <>
            <div className='main'>
                <div>
                    {/* Start button */}
                    <StartButton
                        isRun={run}
                        gameStart={gameStart}
                    />

                    <div className='game-info'>
                        {/* Show match or wrong status */}
                        <Status message={message} />
                        {/* Show time left */}
                        <TimeCount count={count} />
                    </div>

                    <div className="table">
                        {[...Array(10).keys()].map((_, idx) =>
                            <Card
                                key={idx}
                                card={cards[idx]}
                                status={status[idx]}
                                onClick={() => cardClickEvent(idx as IndexNumbers)} //  // Update a card status after clicking it.
                                color={color}
                            />)
                        }
                    </div>

                    <div className={overlay}></div>
                </div>
            </div>

            {
                result !== '' && (
                    <Result
                        result={result}
                        score={countLimit - count}
                        closeButtonAction={closeResultDialog}
                    />
                )
            }
        </>
    );
};

export default Table;