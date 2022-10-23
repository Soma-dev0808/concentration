import React from "react";
import Result from "./Result";
import { bindActionCreators } from '@reduxjs/toolkit';
import { connect } from "react-redux";
import { AppDispatch, RootState } from "../../app/configureStore";
import * as GameActions from '../../actions/tableActions';

// Container for HeaderButtons
const ResultContainer = ({
    result,
    score,
    tableActions,
    isLoading
}: {
    result: string;
    score: number;
    tableActions: typeof GameActions,
    isLoading: boolean,
}) => {
    return (
        <Result
            result={result}
            score={score}
            closeButtonAction={tableActions.closeResultDialog}
            postResult={tableActions.handlePostResult}
            isLoading={isLoading}
        />
    );
};

// States of reducer
const mapStateToProps = (state: RootState, { score }: { score: number; }) => {
    return ({
        result: state.gameState.gameState.result,
        isLoading: state.userScores.isFetching,
        score,
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
)(ResultContainer);