import React from 'react';
import { bindActionCreators } from '@reduxjs/toolkit';
import { connect } from 'react-redux';
import Table from './Table';
import * as GameActions from '../../actions/tableActions';

import type { AppDispatch, RootState } from '../../app/configureStore';
import type { Colors } from '../../feature/cardColorSlice';
import type { Designs } from '../../feature/cardDesignSlice';
import { ConcentrationCore } from '../../feature/gameSlice';

interface TableContainerProps extends ConcentrationCore {
    color: Colors,
    tableActions: typeof GameActions,
}

const TableContainer = ({
    color,
    cards,
    status,
    stsRollBackIdx,
    ready,
    count,
    timer,
    run,
    result,
    message,
    overlay,
    tableActions,
}: TableContainerProps) => {
    return (
        <Table
            color={color}
            cards={cards}
            status={status}
            stsRollBackIdx={stsRollBackIdx}
            ready={ready}
            count={count}
            timer={timer}
            run={run}
            result={result}
            message={message}
            overlay={overlay}
            initializeGame={tableActions.initializeGame}
            startNewGame={tableActions.startNewGame}
            finishCurrGame={tableActions.finishCurrGame}
            updateGameCount={tableActions.updateGameCount}
            cardClickEvent={tableActions.cardClickEvent}
            closeResultDialog={tableActions.closeResultDialog}
            resetPickedCards={tableActions.handleResetPickedCards}
            resetMessage={tableActions.handleResetMessage}
        />
    );
};

// States of reducer
const mapStateToProps = (state: RootState) => {
    return ({
        color: state.cardColor.color,
        cards: state.gameState.gameState.cards,
        status: state.gameState.gameState.status,
        stsRollBackIdx: state.gameState.gameState.stsRollBackIdx,
        ready: state.gameState.gameState.ready,
        count: state.gameState.gameState.count,
        timer: state.gameState.gameState.timer,
        run: state.gameState.gameState.run,
        result: state.gameState.gameState.result,
        message: state.gameState.gameState.message,
        overlay: state.gameState.gameState.overlay,
    });
};

// Actions to be dispatched
const mapDispatchToProps = (dispatch: AppDispatch) => {
    return ({
        tableActions: bindActionCreators(GameActions, dispatch),
    });
};

export default connect(
    mapStateToProps,
    mapDispatchToProps
)(TableContainer);