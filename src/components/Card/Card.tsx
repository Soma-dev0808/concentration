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
    let cardStyle = 'card card-back';
    let numStyle = 'front';
    switch (status) {
        case 1:
            numStyle = 'back';
            break;
        case 2:
            numStyle = "back atari";
            break;
        case 3:
            numStyle = "back hazure";
            break;
        default:
            cardStyle = 'card card-front';
            break;
    }
    return (
        <button className={cardStyle} onClick={onClick}>
            <div className={numStyle}><span>{card}</span></div>
        </button>
    );
};

export default Card;