import React from 'react';

const TabContent = ({ activeTab, content }) => {
  const activeContent = content.find(item => item.id === activeTab);
  return (
    <div className="tab-content">
      {activeContent && activeContent.component}
    </div>
  );
};

export default TabContent;