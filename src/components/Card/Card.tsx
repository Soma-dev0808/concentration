import React, { FC } from 'react';
import type { CardStatuses } from '../../utilities/utils';

import './Card.scss';

interface CartProps {
    card: string,
    status: CardStatuses,
    onClick: () => void;
}

// Card component
const Card: FC<CartProps> = ({ card, status, onClick }) => {
    let cardStyle = 'card card-ura';
    let numStyle = 'omote';
    switch (status) {
        case 1:
            numStyle = 'ura';
            break;
        case 2:
            numStyle = "ura atari";
            break;
        case 3:
            numStyle = "ura hazure";
            break;
        default:
            cardStyle = 'card card-omote';
            break;
    }
    return (
        <button className={cardStyle} onClick={onClick}>
            <div className={numStyle}><span>{card}</span></div>
        </button>
    );
};

export default Card;