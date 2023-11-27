import React, { useEffect, useState } from 'react';
import { Link } from 'react-router-dom';
import axios from 'axios';
import './Pizza.css';
import { LazyLoadImage } from 'react-lazy-load-image-component';
import 'react-lazy-load-image-component/src/effects/blur.css';


const Pizza = () => {
  const [posts, setPosts] = useState([]);

  useEffect(() => {
    axios.get('https://sarpinos.mysites.io/wp-json/wp/v2/pizza')
      .then(response => {
        const fetches = response.data.map(post => {
          // Fetches for the first image field
          const imageFetch = post.acf.main_image
            ? axios.get(`https://sarpinos.mysites.io/wp-json/wp/v2/media/${post.acf.main_image}`)
              .then(imageResponse => {
                post.imageDetails = imageResponse.data;
              })
            : Promise.resolve();

          // Fetches for the second image field
          const hoverImageFetch = post.acf.hover_image
            ? axios.get(`https://sarpinos.mysites.io/wp-json/wp/v2/media/${post.acf.hover_image}`)
              .then(hoverImageResponse => {
                post.hoverImageDetails = hoverImageResponse.data;
              })
            : Promise.resolve();

          // Ensure both promises are resolved
          return Promise.all([imageFetch, hoverImageFetch]).then(() => post);
        });

        return Promise.all(fetches);
      })
      .then(postsWithImages => {
        setPosts(postsWithImages);
      })
      .catch(error => console.error(error));
  }, []);


  return (
    <div className='container'>
      {posts.map(post => (
        <div key={post.id} className='pizza-container'>
          <h2><Link to={`/pizza/${post.id}`}>{post.title.rendered}</Link></h2>
          <div dangerouslySetInnerHTML={{ __html: post.acf.caption }} />
          <div className='pizza-thumbnail'>
            <Link to={`/pizza/${post.id}`}>
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
        </div>
      ))}
    </div>
  );
};

export default Pizza;
