import React, { FC } from 'react';

import './HeaderButtons.scss';
import type { Colors } from '../../feature/cardColorSlice';
import type { CommonActionType } from '../../app/configureStore';
import type { Designs } from '../../feature/cardDesignSlice';
import { getButtonColor, getButtonEmoji } from '../../utilities/utils';

interface HeaderButtonsProps {
    color: Colors,
    design: Designs,
    run: boolean,
    changeColor: CommonActionType,
    changeDesign: CommonActionType,
}

const HeaderButtons: FC<HeaderButtonsProps> = ({
    color,
    design,
    run,
    changeColor,
    changeDesign
}) => {
    const handleChangeColor = () => changeColor();
    const handleChangeDesign = () => changeDesign();

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
                Card Color {color}
            </button>
            <button
                onClick={handleChangeDesign}
                className={`header-button ${run && 'header-button-disabled'}`}
                disabled={run}
            >
                Card Design {getButtonEmoji(design)}
            </button>
        </div>
    );
};

export default HeaderButtons;