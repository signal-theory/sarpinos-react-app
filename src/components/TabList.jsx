import React from 'react';

const TabList = ({ activeTab, tabs }) => (
  <ul className="tab-list">
    {tabs.map((tab, index) => (
      <li
        key={index}
        className={activeTab === tab.id ? "active" : ""}
        onClick={tab.handler}
      >
        {tab.label}
      </li>
    ))}
  </ul>
);

export default TabList;