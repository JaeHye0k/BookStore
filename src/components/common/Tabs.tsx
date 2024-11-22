import React, { FC, ReactElement, useState } from "react";
import { styled } from "styled-components";

interface TabProps {
    title: string;
    children: React.ReactNode;
}

const Tab: FC<TabProps> = ({ children, title }) => {
    return <div>{children}</div>;
};

interface TabsProps {
    children: React.ReactNode;
}

const Tabs: FC<TabsProps> = ({ children }) => {
    const [activeIndex, setActiveIndex] = useState(0);

    const tabs = React.Children.toArray(children) as ReactElement<TabProps>[];

    return (
        <TabsStyle>
            <div className="tab-header">
                {tabs.map((tab, index) => (
                    <button
                        onClick={() => setActiveIndex(index)}
                        className={index === activeIndex ? "active" : undefined}
                    >
                        {tab.props.title}
                    </button>
                ))}
            </div>
            <div className="tab-content">{tabs[activeIndex]}</div>
        </TabsStyle>
    );
};

const TabsStyle = styled.div`
    .tab-header {
        display: flex;
        gap: 2px;
        border-bottom: 1px solid #ddd;

        button {
            padding: 12px 24px;
            border: none;
            background: #ddd;
            cursor: pointer;
            font-size: 1.25rem;
            font-weight: bold;
            color: ${({ theme }) => theme.color.text};
            border-radius: ${({ theme }) => theme.borderRadius.default}
                ${({ theme }) => theme.borderRadius.default} 0 0;
            &.active {
                color: #fff;
                background: ${({ theme }) => theme.color.primary};
            }
        }
    }

    .tab-content {
        padding: 24px 0;
    }
`;

export { Tabs, Tab };
