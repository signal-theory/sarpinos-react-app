import React from 'react';
import { Link } from 'react-router-dom';

const MenuList_Label = ({ pageSlug, post, orderHandler }) => (
  <div className="menupage-label">
    <h3><Link to={`/menu/${pageSlug}/${post.slug}`}>{post.title.rendered}</Link></h3>
    <div className="menupage-caption" dangerouslySetInnerHTML={{ __html: post.acf.caption }} />
    <p>
      <button onClick={() => orderHandler(post.title.rendered)}>ORDER ONLINE</button>
      <Link style={{ marginLeft: '2rem' }} to={`/menu/${pageSlug}/${post.slug}`}>More Info</Link>
    </p>
  </div>
);

export default MenuList_Label;