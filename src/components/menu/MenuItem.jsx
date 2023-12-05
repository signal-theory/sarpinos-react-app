import React, { useEffect, useState } from 'react';
import { useParams } from 'react-router-dom';
import axios from 'axios';
import { LazyLoadImage } from 'react-lazy-load-image-component';
import 'react-lazy-load-image-component/src/effects/blur.css';
import { Helmet } from 'react-helmet-async';
import he from 'he';
import TabList from '../TabList';
import TabContent from '../TabContent';

const MenuItem = ({ itemType, activeTab, tabs, content, orderHandler }) => {
  const [post, setPost] = useState(null);
  const [imageSrc, setImageSrc] = useState('');
  const [seoData, setSeoData] = useState({});
  const { slug } = useParams();



  useEffect(() => {
    // Fetch the custom post
    axios.get(`https://sarpinos.mysites.io/wp-json/wp/v2/${itemType}?slug=${slug}`)
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
        return axios.get(`https://sarpinos.mysites.io/wp-json/yoast/v1/get_head?url=https://sarpinos.mysites.io/${itemType}/${slug}/`);
      })
      .then(seoResponse => {
        if (seoResponse && seoResponse.data) {
          setSeoData(seoResponse.data.json); // Set the SEO data
        }
      })
      .catch(error => console.error(error));
  }, [slug, itemType]);

  if (!post) {
    return <div className="page-container">Loading...</div>;
  }

  return (
    <div className="page-container">
      <Helmet>
        {seoData && seoData.title && <title>{he.decode(seoData.title)}</title>}
        {seoData && seoData.description && <meta name="description" content={seoData.description} />}
        {seoData && seoData.og_title && <meta property="og:title" content={he.decode(seoData.og_title)} />}
        {seoData && seoData.og_title && <meta property="twitter:title" content={he.decode(seoData.og_title)} />}
        {seoData && seoData.og_description && <meta property="og:description" content={seoData.og_description} />}
        {seoData && seoData.og_description && <meta property="twitter:description" content={seoData.og_description} />}
        {seoData && seoData.og_url && <meta property="og:url" content={seoData.og_url} />}
        {seoData && seoData.og_site_name && <meta property="og:site_name" content={he.decode(seoData.og_site_name)} />}
        {seoData && seoData.og_image && seoData.og_image[0] && seoData.og_image[0].url && <meta property="og:image" content={seoData.og_image[0].url} />}
        {seoData && seoData.og_image && seoData.og_image[0] && seoData.og_image[0].url && <meta property="twitter:image" content={seoData.og_image[0].url} />}
        {seoData && seoData.twitter_card && <meta name="twitter:card" content={seoData.twitter_card} />}
        <meta name="twitter:site" content="@sarpinos_pizza" />
        {seoData && seoData.og_type && <meta property="og:type" content={seoData.og_type} />}
        <meta property="og:URL" content={(`https://www.gosarpinos.com/sarpinos-specialty-pizza/${slug}/`)} />
      </Helmet>
      <div className="menupage-header responsive-column-container">
        <div className="menupage-image">
          {imageSrc && (
            <LazyLoadImage
              alt={post.title.rendered + ' pictured from side angle'}
              src={imageSrc}
              effect="blur"
              className="mask"
            />
          )}
        </div>
        <div className="content">
          <h1>{post.title.rendered}</h1>
          <div dangerouslySetInnerHTML={{ __html: post.content.rendered }} />
          <button onClick={orderHandler}>ORDER ONLINE</button>
          <TabList activeTab={activeTab} tabs={tabs} />
          <TabContent activeTab={activeTab} content={content} />
        </div>
      </div>
    </div>
  );
};

export default MenuItem;