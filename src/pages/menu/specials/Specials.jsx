import React, { useEffect, useState } from 'react'
//import './Specials.css'
import axios from 'axios'
import SEOHelmet from '../../../components/SEOHelmet.jsx'

const Specials = () => {

  const [featuredImage, setFeaturedImage] = useState(null);
  const [featuredImageAlt, setFeaturedImageAlt] = useState(null);
  const [pageTitle, setPageTitle] = useState(null);
  const [pageContent, setPageContent] = useState(null);
  const [pageSlug, setPageSlug] = useState(null);
  const [seoData, setSeoData] = useState({});

  const pageId = 88;
  // Fetch Page content, Featured image, and SEO data
  useEffect(() => {
    axios.get(`https://sarpinos.mysites.io/wp-json/wp/v2/pages/${pageId}`)
      .then(response => {
        const post = response.data; // Get the post data

        setPageTitle(post.title.rendered); // Set the page title
        setPageContent(post.content.rendered); // Set the page content

        // Set the SEO data
        if (post.yoast_head_json) {
          setSeoData(post.yoast_head_json);
        }

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

      })
      .catch(error => {
        console.error(error);
        setPageTitle('Page not found'); // Set a default page title
        setPageContent('The page you are looking for does not exist.'); // Set a default page content
      });
  }, [pageId]);

  return (
    <>
      <SEOHelmet seoData={seoData} pageSlug={pageSlug} />
      <section className="viewport innerhero">
        <div className="full-page-container specials-page">
          <div className="container text-align-center">
            <div className="content">
              {pageTitle && <h1 dangerouslySetInnerHTML={{ __html: pageTitle }} />}
              {pageContent && <div dangerouslySetInnerHTML={{ __html: pageContent }} />}
            </div>
          </div>
        </div>
      </section>
    </>
  )
}

export default Specials