import React, { useEffect, useState } from 'react'
import { Link } from 'react-router-dom'
import axios from 'axios'
import './Pizza.css'
import { LazyLoadImage } from 'react-lazy-load-image-component'
import 'react-lazy-load-image-component/src/effects/blur.css'
import { Helmet } from 'react-helmet-async'


const Pizza = () => {
  const [posts, setPosts] = useState([]);
  const [seoData, setSeoData] = useState({});

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

          // Fetch the Yoast SEO data
          const seoFetch = axios.get(`https://sarpinos.mysites.io/wp-json/yoast/v1/get_head?url=https://sarpinos.mysites.io/pizza/`)
            .then(seoResponse => {
              post.seoData = seoResponse.data.json;
            });

          // Ensure both promises are resolved
          return Promise.all([imageFetch, hoverImageFetch, seoFetch]).then(() => post);
        });

        return Promise.all(fetches);
      })
      .then(postsWithImagesAndSeo => {
        setPosts(postsWithImagesAndSeo);
        // Set the SEO data for the first post as the SEO data for the page
        if (postsWithImagesAndSeo.length > 0) {
          setSeoData(postsWithImagesAndSeo[0].seoData);
        }
      })
      .catch(error => console.error(error));
  }, []);

  if (!posts) {
    return <div>Loading...</div>;
  }

  return (
    <div className='container'>
      <Helmet>
        {seoData && seoData.og_title && <title>{seoData.og_title}</title>}
        {seoData && seoData.og_description && <meta name="description" content={seoData.og_description} />}
        {seoData && seoData.og_image && seoData.og_image[0] && seoData.og_image[0].url && <meta property="og:image" content={seoData.og_image[0].url} />}
        {seoData && seoData.og_site_name && <meta name="site_name" content={seoData.og_site_name} />}
        <meta property="og:type" content="article" />
        <meta property="og:URL" content="https://www.gosarpinos.com/pizza/" />
      </Helmet>
      {posts.map(post => (
        <div key={post.id} className='pizza-container'>
          <h2><Link to={`/pizza/${post.slug}`}>{post.title.rendered}</Link></h2>
          <div dangerouslySetInnerHTML={{ __html: post.acf.caption }} />
          <div className='pizza-thumbnail'>
            <Link to={`/pizza/${post.slug}`}>
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
