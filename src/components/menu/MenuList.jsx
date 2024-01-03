import React from 'react';
import MenuList_Thumb from './MenuList_Thumb.jsx';
import MenuList_Label from './MenuList_Label.jsx';

const MenuList = ({ filteredPosts, orderHandler, loading }) => (
  <div className="menupage-list responsive-three-column-container">
    {loading ? (
      <p>Loading...</p>
    ) : filteredPosts && filteredPosts.length > 0 ? (
      filteredPosts.map((post, index) => (
        <div key={index} className="menupage-item">
          <MenuList_Thumb post={post} />
          <MenuList_Label post={post} orderHandler={orderHandler} />
        </div>
      ))
    ) : (
      <p>No pizzas found for the selected category.</p>
    )}
  </div>
);

export default MenuList;