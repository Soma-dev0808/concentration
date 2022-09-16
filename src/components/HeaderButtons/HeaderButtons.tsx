import React, { FC } from 'react';

import './HeaderButtons.scss';

const HeaderButtons: FC<{
    changeCardColor: () => void,
    changeDesign: () => void,
}> = ({
    changeCardColor,
    changeDesign
}) => {
        return (
            <div style={{ marginLeft: 'auto', marginRight: '10px' }}>
                <button
                    onClick={changeCardColor}
                    style={{ width: '150px' }}
                >
                    Change color
                </button>
                <button
                    onClick={changeDesign}
                    style={{ width: '150px' }}
                >
                    Change design
                </button>
            </div>
        );
    };

export default HeaderButtons;