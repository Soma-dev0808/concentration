import React, { useEffect, useMemo, useState } from 'react';
import Tab from './Tab';

import './Tabs.scss';

interface TabsProps {
    children: JSX.Element[];
}

// Tabs for user score list
const Tabs: React.FC<TabsProps> = ({ children }) => {

    // Just in case children is empty
    if (!children.length) return null;

    const [activeTab, setActiveTab] = useState<string>(children[0].props.label);

    const onClickTabItem = (tab: string) => setActiveTab(tab);

    const renderTabContent = () => useMemo(() => children?.filter((child) => child.props.label === activeTab), [activeTab]);

    return (
        <div className='score-tab-container'>
            <ul className='score-tab-tabs'>
                {children?.map((child) => {
                    const { label } = child.props;
                    return (
                        <Tab
                            activeTab={activeTab}
                            key={label}
                            label={label}
                            handleTabClicked={onClickTabItem}
                        />
                    );
                })}
            </ul>

            <div className='score-tab-content'>
                <div className='score-tab-content-inner'>
                    {renderTabContent()}
                </div>
            </div>
        </div>
    );
};

export default Tabs;
