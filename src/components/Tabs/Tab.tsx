import React from 'react';

import './Tabs.scss';

interface TabProps {
    activeTab: string;
    label: string;
    handleTabClicked: (tab: string) => void;
}

// Tab for user score list
const Tab: React.FC<TabProps> = ({ activeTab, label, handleTabClicked }) => {

    const handleClicked = () => handleTabClicked(label);

    let className = `score-tab-list-item score-tab-${label.toLowerCase()}`;

    if (activeTab === label) {
        className += ' score-tab-list-active';
    }

    return (
        <li
            className={className}
            onClick={handleClicked}
        >
            {label}
        </li>
    );
};

export default Tab;
