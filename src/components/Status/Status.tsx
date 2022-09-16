import React, { FC } from 'react';

import './Status.scss';

const Status: FC<{ message: string; }> = ({ message }) => {
    return (
        <div className="status">
            {message}
        </div>
    );
};

export default Status;