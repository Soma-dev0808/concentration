import React from "react";
import ScoreListModal from "./ScoreListModal";
import { bindActionCreators } from '@reduxjs/toolkit';
import { connect } from "react-redux";
import { AppDispatch, CommonActionType, RootState } from "../../app/configureStore";
import * as GameActions from '../../actions/tableActions';
import { toggleScoreListModalExec } from '../../actions/headerButtons';

import type { ScoreListType } from "../../utilities/firebaseConfig";

// Container for ScoreListType
const ScoreListModalContainer = ({
    gameActions,
    userScores,
    isUserScoreFetching,
    userScoresError,
    isShowScoreListModal,
    toggleScoreListModal,
}: {
    gameActions: typeof GameActions,
    toggleScoreListModal: CommonActionType,
    userScores: Array<ScoreListType>,
    isUserScoreFetching: boolean,
    userScoresError: any,
    isShowScoreListModal: boolean,
}) => {
    return (
        <ScoreListModal
            getUserScores={gameActions.handleGetScoreList}
            toggleScoreListModal={toggleScoreListModal}
            userScores={userScores}
            isUserScoreFetching={isUserScoreFetching}
            userScoresError={userScoresError}
            isShowScoreListModal={isShowScoreListModal}
        />
    );
};

// States of reducer
const mapStateToProps = (state: RootState) => {
    return ({
        userScores: state.userScores.scoreList,
        isUserScoreFetching: state.userScores.isFetching,
        userScoresError: state.userScores.error,
        isShowScoreListModal: state.userScores.isShowScoreListModal,
    });
};

// Actions to be dispatched
const mapDispatchToProps = (dispatch: AppDispatch) => {
    return ({
        gameActions: bindActionCreators(GameActions, dispatch),
        toggleScoreListModal: bindActionCreators(toggleScoreListModalExec, dispatch),
    });
};


export default connect(
    mapStateToProps,
    mapDispatchToProps
)(ScoreListModalContainer);
