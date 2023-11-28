import React, { useEffect, useState } from 'react';
import { useParams } from 'react-router-dom';
import axios from 'axios';
import { LazyLoadImage } from 'react-lazy-load-image-component';
import 'react-lazy-load-image-component/src/effects/blur.css';
import { Helmet } from 'react-helmet-async';

const PizzaSingle = () => {
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
        return axios.get(`https://sarpinos.mysites.io/wp-json/yoast/v1/get_head?url=https://sarpinos.mysites.io/pizza/${slug}/`);
      })
      .then(seoResponse => {
        if (seoResponse && seoResponse.data) {
          setSeoData(seoResponse.data.json); // Set the SEO data
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
        {seoData && seoData.og_title && <title>{seoData.og_title}</title>}
        {seoData && seoData.og_description && <meta name="description" content={seoData.og_description} />}
        {seoData && seoData.og_image && seoData.og_image[0] && seoData.og_image[0].url && <meta property="og:image" content={seoData.og_image[0].url} />}
        {seoData && seoData.og_site_name && <meta name="site_name" content={seoData.og_site_name} />}
        <meta property="og:type" content="article" />
        <meta property="og:URL" content={(`https://www.gosarpinos.com/pizza/${slug}/`)} />
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

export default PizzaSingle;