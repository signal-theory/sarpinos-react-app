import React, { useEffect, useState } from 'react'
import './Why.css'
import axios from 'axios'
import SEOHelmet from '../../../components/SEOHelmet'
import Loading from '../../../components/Loading'

const Why = () => {

  const [featuredImage, setFeaturedImage] = useState(null);
  const [featuredImageAlt, setFeaturedImageAlt] = useState(null);
  const [pageSlug, setPageSlug] = useState(null);
  const [pageTitle, setPageTitle] = useState(null);
  const [pageContent, setPageContent] = useState(null);
  const [seoData, setSeoData] = useState({});

  const [isLoading, setIsLoading] = useState(true);
  const pageId = 60;
  // Fetch Page content, Featured image, and SEO data
  useEffect(() => {
    setIsLoading(true);
    axios.get(`https://sarpinos.mysites.io/wp-json/wp/v2/pages/${pageId}`)
      .then(response => {
        const post = response.data; // Get the post data

        setPageSlug(post.slug);
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

        setIsLoading(false);
      })
      .catch(error => {
        console.error(error);
        setPageTitle('Page not found'); // Set a default page title
        setPageContent('The page you are looking for does not exist.'); // Set a default page content
      });
  }, [pageId]);

  if (isLoading) {
    return <Loading />;
  }
  return (
    <>
      <SEOHelmet seoData={seoData} pageSlug={pageSlug} />
      <section className="viewport innerhero cream-color">
        <div className="page-container">
          <div className="content text-align-center">
            {pageContent && <div dangerouslySetInnerHTML={{ __html: pageContent }} />}
          </div>
          <div className="responsive-column-container">
            <div className="featured-image">
              {featuredImage && <img src={featuredImage} alt={featuredImageAlt} />}
            </div>
          </div>
        </div>
      </section>
    </>
  )
}

export default Why