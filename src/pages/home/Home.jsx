import React, { useState, useEffect } from 'react'
import axios from 'axios'
import SEOHelmet from '../../components/SEOHelmet'
import './Home.css'
import { Link } from 'react-router-dom';
import { LazyLoadImage } from 'react-lazy-load-image-component';
import heroPizzaImg from '../../assets/homepage-hero-pizza.png'


const Home = () => {

  const [isLoading, setIsLoading] = useState(true);

  const pageId = 149; // Page ID
  const [pageContent, setPageContent] = useState(null);
  const [pageSlug, setPageSlug] = useState(null);
  const [seoData, setSeoData] = useState({});

  const [popularMenuItems, setPopularMenuItems] = useState([]);

  // Fetch data
  const fetchHomePageData = async (pageId) => {
    setIsLoading(true);
    const response = await axios.get(`https://sarpinos.mysites.io/wp-json/wp/v2/pages/${pageId}`);

    setPageSlug(response.data.slug); // Set the page slug
    setPageContent(response.data.content.rendered); // Set the page content

    // Fetch image data for each popular menu item
    const popularMenuItemsWithImages = await Promise.all(
      response.data.acf.popular_menu_items.map(async (item) => {
        const imageResponse = await axios.get(`https://sarpinos.mysites.io/wp-json/wp/v2/media/${item.image}`);
        return {
          ...item,
          image: {
            source_url: imageResponse.data.source_url,
            alt_text: imageResponse.data.alt_text,
          },
        };
      })
    );

    setPopularMenuItems(popularMenuItemsWithImages); // Set the popular menu items


    // Set the SEO data
    if (response.data.yoast_head_json) {
      setSeoData(response.data.yoast_head_json);
    }

    setIsLoading(false);
  };

  useEffect(() => {
    fetchHomePageData(pageId);
  }, [pageId]);

  if (isLoading) {
    return <div>Loading...</div>;
  }


  return (
    <>
      <SEOHelmet seoData={seoData} pageSlug={pageSlug} />
      <div className="page-container homepage-hero">
        <div className="menupage-header responsive-column-container">
          <div className="menupage-image">
            <img src={heroPizzaImg} />
          </div>
          <div className="content text-align-center flex-align-center">
            <div dangerouslySetInnerHTML={{ __html: pageContent }} />
          </div>
        </div>
      </div>
      <div className="page-container homepage-items text-align-center">
        <h2 style={{ marginTop: '2rem' }}>Popular Menu Items</h2>
        <div className="menupage-list">
          {popularMenuItems && popularMenuItems.length > 0 ? (

            popularMenuItems.map((post, index) => {
              const url = new URL(post.link.url);
              const path = url.pathname;

              return (
                <div key={index} className="menupage-item">
                  <div className="menupage-thumbnail">
                    <Link to={path}>
                      {post.image && (
                        <LazyLoadImage
                          src={post.image.source_url}
                          alt={post.image.alt_text}
                          effect="blur"
                          className="mask hover-image"
                        />
                      )}

                    </Link>
                  </div>
                  <div className="menupage-label">
                    <h3><Link to={path}>{post.title}</Link></h3>
                    <div className="menupage-caption" dangerouslySetInnerHTML={{ __html: post.description }} />
                    <Link className="primary-btn" to={path}>{post.title}</Link>
                  </div>
                </div>)
            })
          ) : (
            <p>No items found.</p>
          )}
        </div>
      </div>
    </>
  )
};

export default Home;