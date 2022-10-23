import React, { FC, useMemo } from 'react';

import { getButtonColor, getButtonEmoji, getDifficulty } from '../../utilities/utils';

import './HeaderButtons.scss';
import type { Colors } from '../../feature/cardColorSlice';
import type { CommonActionType } from '../../app/configureStore';
import type { Designs } from '../../feature/cardDesignSlice';

interface HeaderButtonsProps {
    color: Colors,
    design: Designs,
    run: boolean,
    changeColor: CommonActionType,
    changeDesign: CommonActionType,
    toggleScoreListModal: CommonActionType,
}

const HeaderButtons: FC<HeaderButtonsProps> = ({
    color,
    design,
    run,
    changeColor,
    changeDesign,
    toggleScoreListModal,
}) => {
    const handleChangeColor = () => changeColor();
    const handleChangeDesign = () => changeDesign();
    const handleShowScore = () => toggleScoreListModal();
    const difficulty = useMemo(() => getDifficulty(color), [color]);

    return (
        <div className='header-buttons'>
            <button
                onClick={handleChangeColor}
                className={
                    `header-button 
                    header-button-${getButtonColor(color)} 
                    ${run && 'header-button-disabled'}`
                }
                disabled={run}
            >
                Difficulty: {difficulty}
            </button>
            <button
                onClick={handleChangeDesign}
                className={`header-button ${run && 'header-button-disabled'}`}
                disabled={run}
            >
                Card Design {getButtonEmoji(design)}
            </button>
            <button
                onClick={handleShowScore}
                className={`header-button ${run && 'header-button-disabled'}`}
                disabled={run}
            >
                Show Score
            </button>
        </div>
    );
};

export default HeaderButtons;