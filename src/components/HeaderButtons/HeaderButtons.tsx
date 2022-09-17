import React, { FC } from 'react';

import './HeaderButtons.scss';
import type { Colors } from '../../feature/cardColorSlice';
import type { CommonActionType } from '../../app/configureStore';
import type { Designs } from '../../feature/cardDesignSlice';

interface HeaderButtonsProps {
    color: Colors,
    design: Designs;
    changeColor: CommonActionType,
    changeDesign: CommonActionType,
}

const HeaderButtons: FC<HeaderButtonsProps> = ({
    color,
    design,
    changeColor,
    changeDesign
}) => {
    const handleChangeColor = () => changeColor();
    const handleChangeDesign = () => changeDesign();

    return (
        <div style={{ marginLeft: 'auto', marginRight: '10px' }}>
            <button
                onClick={handleChangeColor}
                style={{ width: '150px' }}
            >
                Change color {color}
            </button>
            <button
                onClick={handleChangeDesign}
                style={{ width: '150px' }}
            >
                Change design {design}
            </button>
        </div>
    );
};

export default HeaderButtons;