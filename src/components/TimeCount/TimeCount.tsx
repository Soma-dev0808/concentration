import React, { FC } from 'react';

import './TimeCount.scss';

const TimeCount: FC<{ count: number; }> = ({ count }) => {
    return (
        <div className="count-number">
            Time left : {count}s
        </div>
    );
};

export default TimeCount;