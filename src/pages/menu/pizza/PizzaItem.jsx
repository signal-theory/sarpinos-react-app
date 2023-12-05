import React, { useState } from 'react'
import MenuItem from '../../../components/menu/MenuItem'

const PizzaItem = () => {
  const itemType = 'pizza';
  const orderHandler = () => console.log('Order a', itemType);

  const [activeTab, setActiveTab] = useState("tab1");
  //  Functions to handle Tab Switching
  const handleTab1 = () => {
    // update the state to tab1
    setActiveTab("tab1");
  };
  const handleTab2 = () => {
    // update the state to tab2
    setActiveTab("tab2");
  };

  const tabs = [
    { id: 'tab1', label: 'Tab 1', handler: handleTab1 },
    { id: 'tab2', label: 'Tab 2', handler: handleTab2 },
    // Add more tabs as needed
  ];

  const content = [
    { id: 'tab1', component: <p>TAB 1</p> },
    { id: 'tab2', component: <p>TAB 2</p> },
    // Add more content as needed
  ];

  return (
    <MenuItem
      itemType={itemType}
      activeTab={activeTab}
      tabs={tabs}
      content={content}
      orderHandler={orderHandler} />
  );
};

export default PizzaItem;