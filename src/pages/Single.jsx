import React, { useEffect, useState } from 'react';
import { useParams } from 'react-router-dom';
import axios from 'axios';
import { LazyLoadImage } from 'react-lazy-load-image-component';
import 'react-lazy-load-image-component/src/effects/blur.css';

const SingleCustomPost = () => {
  const [post, setPost] = useState(null);
  const [imageSrc, setImageSrc] = useState('');
  const { postId } = useParams();

  useEffect(() => {
    // Fetch the custom post
    axios.get(`https://sarpinos.mysites.io/wp-json/wp/v2/pizza/${postId}`)
      .then(response => {
        setPost(response.data);

        // If there's an image field, fetch its details
        const imageId = response.data.acf.hover_image; // Replace with your actual ACF field name
        if (imageId) {
          return axios.get(`https://sarpinos.mysites.io/wp-json/wp/v2/media/${imageId}`);
        }
      })
      .then(imageResponse => {
        if (imageResponse && imageResponse.data) {
          setImageSrc(imageResponse.data.source_url); // Set the image source URL
        }
      })
      .catch(error => console.error(error));
  }, [postId]);

  if (!post) {
    return <div>Loading...</div>;
  }

  return (
    <div>
      <h1>{post.title.rendered}</h1>
      <div dangerouslySetInnerHTML={{ __html: post.content.rendered }} />
      {imageSrc && (
        <LazyLoadImage
          alt={post.title.rendered + ' pictured from side angle'}
          src={imageSrc}
          effect="blur"
          className="mask"
        />
      )}
      {/* Display other custom post details as needed */}
    </div>
  );
};

export default SingleCustomPost;
