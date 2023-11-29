import React, { useEffect, useState } from 'react';
import { useParams } from 'react-router-dom';
import axios from 'axios';


const BlogSingle = () => {
  const [post, setPost] = useState(null);
  const [featuredImage, setFeaturedImage] = useState(null);
  const { slug } = useParams();

  useEffect(() => {
    axios.get(`https://sarpinos.mysites.io/wp-json/wp/v2/posts?slug=${slug}`)
      .then(response => {
        const post = response.data[0];
        setPost(post);

        // If there's a featured image, fetch its details
        const imageId = post.featured_media;
        if (imageId) {
          return axios.get(`https://sarpinos.mysites.io/wp-json/wp/v2/media/${imageId}`);
        }
      })
      .then(imageResponse => {
        if (imageResponse && imageResponse.data) {
          setFeaturedImage(imageResponse.data.source_url); // Set the featured image URL
        }
      })
      .catch(error => console.error(error));
  }, [slug]);

  if (!post) {
    return <div>Loading...</div>;
  }

  return (
    <div className="page-container">
      <h1>{post.title.rendered}</h1>
      {featuredImage && <img src={featuredImage} alt={post.title.rendered} />}
      <div dangerouslySetInnerHTML={{ __html: post.content.rendered }} />
    </div>
  );
};

export default BlogSingle;