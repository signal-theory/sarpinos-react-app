import React, { useEffect, useState } from 'react'
import SEOHelmet from '../../../components/SEOHelmet'
import './Company.css'
import axios from 'axios'
import { Link } from 'react-router-dom';
import Loading from '../../../components/Loading'
import basilImg_1 from '../../../assets/basil-leaf-1.png'
import basilImg_2 from '../../../assets/basil-leaf-2.png'
import basilImg_3 from '../../../assets/basil-leaf-3.png'
import basilImg_4 from '../../../assets/basil-leaf-4.png'

const Company = () => {

  const [featuredImage, setFeaturedImage] = useState(null);
  const [featuredImageAlt, setFeaturedImageAlt] = useState(null);
  const [pageSlug, setPageSlug] = useState(null);
  const [pageContent, setPageContent] = useState(null);
  const [gourmetHeadline, setGourmetHeadline] = useState(null);
  const [gourmetParagraph, setGourmetParagraph] = useState(null);
  const [historyHeadline, setHistoryHeadline] = useState(null);
  const [gourmetIngredients1, setGourmetIngredients1] = useState(null);
  const [gourmetIngredients2, setGourmetIngredients2] = useState(null);
  const [gourmetIngredients3, setGourmetIngredients3] = useState(null);
  const [seoData, setSeoData] = useState({});

  const [isLoading, setIsLoading] = useState(true);
  const pageId = 49;
  // Fetch Page content, Featured image, and SEO data
  useEffect(() => {
    setIsLoading(true);
    axios.get(`https://sarpinos.mysites.io/wp-json/wp/v2/pages/${pageId}`)
      .then(response => {
        const post = response.data; // Get the post data

        setPageSlug(post.slug);
        setPageContent(post.content.rendered); // Set the page content
        setGourmetHeadline(post.acf.gourmet_headline); // Set the gourmet headline
        setGourmetParagraph(post.acf.gourmet_paragraph); // Set the gourmet paragraph
        setHistoryHeadline(post.acf.history_headline); // Set the history headline
        setGourmetIngredients1(post.acf.gourmet_ingredients_1); // Set the gourmet ingredients 1
        setGourmetIngredients2(post.acf.gourmet_ingredients_2); // Set the gourmet ingredients 2
        setGourmetIngredients3(post.acf.gourmet_ingredients_3); // Set the gourmet ingredients 3

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
        <div className="full-page-container company-page inner-hero">
          <div className="responsive-column-container">
            <div className="featured-image">
              <div className="basil-animation">
                {featuredImage && <img src={featuredImage} alt={featuredImageAlt} />}
                <img src={basilImg_1} className="parallax basil-leaf-1" alt="basil leaf" />
                <img src={basilImg_2} className="parallax basil-leaf-2" alt="basil leaf" />
                <img src={basilImg_3} className="parallax basil-leaf-3" alt="basil leaf" />
                <img src={basilImg_4} className="parallax basil-leaf-4" alt="basil leaf" />
                <img src={basilImg_1} className="parallax basil-leaf-5" alt="basil leaf" />
                <img src={basilImg_2} className="parallax basil-leaf-6" alt="basil leaf" />
              </div>
            </div>
            <div className="content">
              {pageContent && <div dangerouslySetInnerHTML={{ __html: pageContent }} />}
              <Link to="" className="btn primary-btn"><span>Order Online</span></Link>
            </div>
          </div>
        </div>
      </section>
      <section className="viewport cream-color">
        <div className="page-container gourmet-specials red-color inner-hero text-align-center">
          <div className="specials-container" style={{ padding: '5rem 2rem' }}>
            {gourmetHeadline && <h2>{gourmetHeadline}</h2>}
            {gourmetParagraph && <div dangerouslySetInnerHTML={{ __html: gourmetParagraph }} style={{ maxWidth: '500px', margin: '0 auto 2rem' }} />}
            <hr />
            <div className="responsive-three-column-container">
              <div className="content">
                {gourmetIngredients1 && <div dangerouslySetInnerHTML={{ __html: gourmetIngredients1 }} />}
              </div>
              <div className="content">
                {gourmetIngredients2 && <div dangerouslySetInnerHTML={{ __html: gourmetIngredients2 }} />}
              </div>
              <div className="content">
                {gourmetIngredients3 && <div dangerouslySetInnerHTML={{ __html: gourmetIngredients3 }} />}
              </div>
            </div>
          </div>
        </div>
      </section>
      <section className="viewport innerhero cream-color">
        <div className="full-page-container company-page inner-hero">
          <div className="history-container" style={{ padding: '5rem 2rem' }}>
            {historyHeadline && <h2>{historyHeadline}</h2>}
            <div className="responsive-column-container">
              <div className="timeline">
                // timeline
              </div>
              <div className="pizza">
                //pizza
              </div>
            </div>
          </div>
        </div>
      </section>
    </>
  )
}

export default Company