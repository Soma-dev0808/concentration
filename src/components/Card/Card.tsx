import React, { FC } from 'react';
import type { CardStatuses } from '../../utilities/utils';

import './Card.scss';

interface CartProps {
    card: string,
    status: CardStatuses,
    onClick: () => void;
    color: string;
}

// Card component
const Card: FC<CartProps> = ({ card, status, onClick, color }) => {
    let cardStyle = 'card card-back';
    let numStyle = 'front';
    switch (status) {
        case 1:
            numStyle = 'back';
            break;
        case 2:
            numStyle = "back match";
            break;
        case 3:
            numStyle = "back wrong";
            break;
        default:
            cardStyle = `card card-front card-front-${color}`;
            break;
    }
    return (
        <button className={cardStyle} onClick={onClick}>
            <div className={numStyle}><span>{card}</span></div>
        </button>
    );
};

export default Card;