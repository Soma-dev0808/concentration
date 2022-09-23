import React, { FC, useEffect, useState } from 'react';
import Card from '../Card';
import Status from '../Status';
import TimeCount from '../TimeCount';
import StartButton from '../StartButton';
import Result from '../Result';
import useMessageObserve from '../../customHooks/useMessageObserve';
import { GAME_COUNT } from '../../utilities/gameSetting';

import './Table.scss';

import { getDifficulty, IndexNumbers } from '../../utilities/utils';
import type { ConcentrationCore } from '../../feature/gameSlice';
import type { Colors } from '../../feature/cardColorSlice';
import type { GenericCommonActionType, CommonActionType } from '../../app/configureStore';

interface TableProps extends ConcentrationCore {
    color: Colors,
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
    // Get game count based on game difficulty.
    const difficulty = getDifficulty(color);
    const gameCount = GAME_COUNT[difficulty];
    const [time, setTime] = useState(gameCount);

    const isHardMode = difficulty === 'hard';

    useMessageObserve(message, resetPickedCards, resetMessage);

    // Initialization
    useEffect(() => {
        initializeGame();
    }, [color]);

    // start
    const gameStart = () => {
        if (run) return;

        // Initialization
        initializeGame();

        setTime(gameCount);

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
            <div className={`main ${isHardMode && 'main-hard'}`}>
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
                        {cards.map((card, idx) =>
                            <Card
                                key={idx}
                                card={card}
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
                        score={gameCount - count}
                        closeButtonAction={closeResultDialog}
                    />
                )
            }
        </>
    );
};

export default Table;