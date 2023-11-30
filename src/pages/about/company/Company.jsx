import React, { useEffect, useState } from 'react'
import './Company.css'
import axios from 'axios'
import { Helmet } from 'react-helmet-async'

const Company = () => {

  const [featuredImage, setFeaturedImage] = useState(null);
  const [featuredImageAlt, setFeaturedImageAlt] = useState(null);
  const [pageTitle, setPageTitle] = useState(null);
  const [pageContent, setPageContent] = useState(null);
  const [seoData, setSeoData] = useState({});

  const pageId = 49;

  // Fetch Page content, Featured image and SEO data
  useEffect(() => {
    axios.get(`https://sarpinos.mysites.io/wp-json/wp/v2/pages?id=${pageId}`)
      .then(response => {
        const post = response.data[0]; // Get the first post

        setPageTitle(post.title.rendered); // Set the page title
        setPageContent(post.content.rendered); // Set the page content

        // If there's a featured image, fetch its details
        if (post.featured_media) {
          axios.get(`https://sarpinos.mysites.io/wp-json/wp/v2/media/${post.featured_media}`)
            .then(imageResponse => {
              if (imageResponse && imageResponse.data) {
                setFeaturedImage(imageResponse.data.source_url); // Set the featured image URL
                setFeaturedImageAlt(imageResponse.data.alt_text); // Set the featured image alt text
              }
            });
        }

        // Fetch the Yoast SEO data
        axios.get(`https://sarpinos.mysites.io/wp-json/wp/v2/pages?id=${pageId}`)
          .then(seoResponse => {
            setSeoData(seoResponse.data[0].yoast_meta); // Set the SEO data
          });
      })
      .catch(error => {
        console.error(error);
        setPageTitle('Page not found'); // Set a default page title
        setPageContent('The page you are looking for does not exist.'); // Set a default page content
      });
  }, [pageId]);


  return (
    <div className="full-page-container">
      <div className="company-hero">
        {featuredImage && <img src={featuredImage} alt={featuredImageAlt} />}
        <div className="content">
          {pageTitle && <h1>{pageTitle}</h1>}
          {pageContent && <div dangerouslySetInnerHTML={{ __html: pageContent }} />}
        </div>
      </div>
    </div>
  )
}

export default Company