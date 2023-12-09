import React from 'react';
import MenuList_Thumb from './MenuList_Thumb';
import MenuList_Label from './MenuList_Label';

const MenuList = ({ filteredPosts, pageSlug, orderHandler }) => (
  <div className="menupage-list">
    {filteredPosts && filteredPosts.length > 0 ? (
      filteredPosts.map((post, index) => (
        <div key={index} className="menupage-item">
          <MenuList_Thumb pageSlug={pageSlug} post={post} />
          <MenuList_Label pageSlug={pageSlug} post={post} orderHandler={orderHandler} />
        </div>
      ))
    ) : (
      <p>No pizzas found for the selected category.</p>
    )}
  </div>
);

export default MenuList;