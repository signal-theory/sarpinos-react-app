import React from 'react';
import { Link } from 'react-router-dom';
import { LazyLoadImage } from 'react-lazy-load-image-component';

const MenuList_Thumb = ({ post }) => (
  <div className="menupage-thumbnail">
    <Link to={`/menu/${post.pageSlug}/${post.slug}`}>
      {post.hoverImageDetails && (
        <LazyLoadImage
          src={post.hoverImageDetails.source_url}
          alt={post.hoverImageDetails.alt_text}
          effect="blur"
          className="mask hover-image"
        />
      )}
      {post.imageDetails && (
        <LazyLoadImage
          src={post.imageDetails.source_url}
          alt={post.imageDetails.alt_text}
          effect="blur"
          className="mask main-image"
        />
      )}
    </Link>
  </div>
);

export default MenuList_Thumb;