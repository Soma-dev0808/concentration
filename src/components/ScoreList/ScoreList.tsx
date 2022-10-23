import React from 'react';

import './ScoreList.scss';
import type { ScoreObj } from '../../utilities/firebaseConfig';

interface ScoreListProp {
    label: string; scoreList: ScoreObj[];
}

const ScoreList: React.FC<ScoreListProp> = ({ scoreList }) => {

    const getRankIcon = (rank: number) => {
        switch (rank) {
            case 1:
                return '🥇';
            case 2:
                return '🥈';
            case 3:
                return '🥉';
            default:
                return rank + '.';
        }
    };

    return (
        <ul className='score-list'>
            {scoreList.map(({ score, username }, idx) => {
                return (
                    <li className='score-list-item' key={score * idx + username}>
                        <div className='score-list-item-rank'>
                            {getRankIcon(idx + 1)}
                        </div>

                        <div className='score-list-item-score'>
                            Score: {score}s
                        </div>

                        <div>
                            {username}
                        </div>
                    </li>
                );
            })}
        </ul>
    );
};

export default ScoreList;
