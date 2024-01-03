import axios from "axios";
import "./BlogCard.css";

import React, { useEffect, useState } from "react";
import { LazyLoadImage } from 'react-lazy-load-image-component';
import 'react-lazy-load-image-component/src/effects/blur.css';

function BlogCard({ post }) {
  const [featuredImage, setFeaturedImage] = useState();
  const getImage = () => {
    axios
      .get(post?._links["wp:featuredmedia"][0]?.href)
      .then((response) => {
        setFeaturedImage(response.data.source_url);
      });

  };

  useEffect(() => {
    getImage();
  }, []);

  return (
    <div className="container">
      <div className="blog-container">
        <p className="blog-date">
          {new Date(Date.now()).toLocaleDateString("en-US", {
            day: "numeric",
            month: "long",
            year: "numeric",
          })}
        </p>
        <h2 className="blog-title">{post.title.rendered}</h2>
        <p
          className="blog-excerpt"
          dangerouslySetInnerHTML={{ __html: post.excerpt.rendered }}
        />
        {featuredImage && (
          <LazyLoadImage
            alt={post.title.rendered}
            src={featuredImage}
            effect="blur"
            className="mask"
          />
        )}
      </div>
    </div>

  );

}
export default BlogCard;