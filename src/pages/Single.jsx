import React, { useEffect, useState } from 'react';
import { useParams } from 'react-router-dom';
import axios from 'axios';
import { LazyLoadImage } from 'react-lazy-load-image-component';
import 'react-lazy-load-image-component/src/effects/blur.css';
import { Helmet } from 'react-helmet-async';

const SingleCustomPost = () => {
  const [post, setPost] = useState(null);
  const [imageSrc, setImageSrc] = useState('');
  const [seoData, setSeoData] = useState({});
  const { slug } = useParams();

  useEffect(() => {
    // Fetch the custom post
    axios.get(`https://sarpinos.mysites.io/wp-json/wp/v2/pizza?slug=${slug}`)
      .then(response => {
        const post = response.data[0];
        setPost(post);

        // If there's an image field, fetch its details
        const imageId = post.acf.hover_image; // Replace with your actual ACF field name
        if (imageId) {
          return axios.get(`https://sarpinos.mysites.io/wp-json/wp/v2/media/${imageId}`);
        }
      })
      .then(imageResponse => {
        if (imageResponse && imageResponse.data) {
          setImageSrc(imageResponse.data.source_url); // Set the image source URL
        }

        // Fetch the Yoast SEO data
        return axios.get(`https://sarpinos.mysites.io/wp-json/wp/v2/pizza?slug=${slug}`);
      })
      .then(seoResponse => {
        const post = seoResponse.data[0];
        if (post && post._links['wp:yoast_head'] && post._links['wp:yoast_head'].length > 0) {
          return axios.get(post._links['wp:yoast_head'][0].href);
        }
      })
      .then(seoDataResponse => {
        if (seoDataResponse && seoDataResponse.data) {
          setSeoData(seoDataResponse.data); // Set the SEO data
        }
      })
      .catch(error => console.error(error));
  }, [slug]);

  if (!post) {
    return <div>Loading...</div>;
  }

  return (
    <div>
      <Helmet>
        {seoData && seoData.title && <title>{seoData.title}</title>}
        {seoData && seoData.description && <meta name="description" content={seoData.description} />}
        {/* Add more meta tags as needed */}
      </Helmet>
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