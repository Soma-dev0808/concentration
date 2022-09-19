import React from "react";
import HeaderButtons from "./HeaderButtons";
import { bindActionCreators } from '@reduxjs/toolkit';
import { connect } from "react-redux";
import { AppDispatch, RootState } from "../../app/configureStore";
import * as HeaderButtonsActions from '../../actions/headerButtons';

import type { Colors } from "../../feature/cardColorSlice";
import type { Designs } from "../../feature/cardDesignSlice";

// Container for HeaderButtons
const HeaderButtonsContainer = ({
    color,
    design,
    headerButtonsActions,
    run,
}: {
    color: Colors;
    design: Designs,
    headerButtonsActions: typeof HeaderButtonsActions;
    run: boolean,
}) => {
    return (
        <HeaderButtons
            color={color}
            design={design}
            run={run}
            changeColor={headerButtonsActions.changeColor}
            changeDesign={headerButtonsActions.changeDesign}
        />
    );
};

// States of reducer
const mapStateToProps = (state: RootState) => {
    return ({
        color: state.cardColor.color,
        design: state.cardDesign.design,
        run: state.gameState.gameState.run,
    });
};

// Actions to be dispatched
const mapDispatchToProps = (dispatch: AppDispatch) => {
    return ({
        headerButtonsActions: bindActionCreators(HeaderButtonsActions, dispatch),
    });
};



export default connect(
    mapStateToProps,
    mapDispatchToProps
)(HeaderButtonsContainer);