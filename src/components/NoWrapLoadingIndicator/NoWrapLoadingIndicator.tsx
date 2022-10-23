import React from 'react';

import './NoWrapLoadingIndicator.scss';

interface NoWrapLoadingIndicatorProps {
    isCentred?: boolean;
}

const NoWrapLoadingIndicator: React.FC<NoWrapLoadingIndicatorProps> = ({ isCentred = true }) => (
    <div className={isCentred ? 'nowrapp-loading-indicator-centered' : ''}>
        <div className="nowrapp-loading-indicator" />
    </div>
);

export default NoWrapLoadingIndicator;