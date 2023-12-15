import React, { useState, useEffect } from 'react'
import axios from 'axios'
import SEOHelmet from '../../components/SEOHelmet'
import Loading from '../../components/Loading'
import './Home.css'
import '../menu/specials/Specials.css'
import { Link } from 'react-router-dom';
import { LazyLoadImage } from 'react-lazy-load-image-component'
import { useSnapCarousel } from 'react-snap-carousel';

import heroPizzaImg from '../../assets/pizza.png'
import onionsImg from '../../assets/onions-sliced.png'
import heartGreenOutlineImg from '../../assets/heart-green-outline.svg'

import { Car } from '../../components/svgs/drawing-car'
import { Moon } from '../../components/svgs/drawing-moon'
import { Calendar } from '../../components/svgs/drawing-calendar'



const Home = () => {
  const {
    scrollRef,
    activePageIndex,
    pages,
    goTo,
  } = useSnapCarousel();

  const [isLoading, setIsLoading] = useState(true);

  const pageId = 149; // Page ID
  const [pageContent, setPageContent] = useState(null);
  const [pageSlug, setPageSlug] = useState(null);
  const [seoData, setSeoData] = useState({});
  const [popularItemsHeadline, setPopularItemsHeadline] = useState(null);
  const [popularMenuItems, setPopularMenuItems] = useState([]);
  const [nationalSpecialsHeadline, setNationalSpecialsHeadline] = useState(null);
  const [nationalSpecialsParagraph, setNationalSpecialsParagraph] = useState(null);
  const [nationalSpecials, setNationalSpecials] = useState(null);
  const [cateringSectionHeadline, setCateringSectionHeadline] = useState(null);
  const [cateringSectionParagraph, setCateringSectionParagraph] = useState(null);
  const [cateringSectionImage, setCateringSectionImage] = useState(null);



  // Fetch Home Page data
  const fetchHomePageData = async (pageId) => {
    setIsLoading(true);
    const response = await axios.get(`https://sarpinos.mysites.io/wp-json/wp/v2/pages/${pageId}`);

    setPageSlug(response.data.slug); // Set the page slug
    setPageContent(response.data.content.rendered); // Set the page content
    setPopularItemsHeadline(response.data.acf.popular_items_headline); // Set the popular items headline
    setNationalSpecialsHeadline(response.data.acf.national_specials_headline); // Set the national specials headline
    setNationalSpecialsParagraph(response.data.acf.national_specials_paragraph); // Set the national specials paragraph
    setCateringSectionHeadline(response.data.acf.catering_headline); // Set the catering section headline
    setCateringSectionParagraph(response.data.acf.catering_paragraph); // Set the catering section paragraph

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

    // Fetch the ACF Catering Section image
    const imageId = response.data.acf.catering_image; // Replace with your ACF image field key
    if (imageId) {
      const imageResponse = await axios.get(`https://sarpinos.mysites.io/wp-json/wp/v2/media/${imageId}`);
      setCateringSectionImage({
        source_url: imageResponse.data.source_url,
        alt_text: imageResponse.data.alt_text,
      });
    }

    // Set the SEO data
    if (response.data.yoast_head_json) {
      setSeoData(response.data.yoast_head_json);
    }

    setIsLoading(false);
  };

  useEffect(() => {
    fetchHomePageData(pageId);
  }, [pageId]);

  // Fetch National Specials
  const fetchNationalSpecials = async () => {
    const response = await axios.get('https://sarpinos.mysites.io/wp-json/wp/v2/specials');
    setNationalSpecials(response.data);
  };

  useEffect(() => {
    fetchNationalSpecials();
  }, []);

  if (isLoading) {
    return <Loading />;
  }

  return (
    <>
      <SEOHelmet seoData={seoData} pageSlug={pageSlug} />
      <section className="homepage-hero">
        <div className="page-container">
          <div className="menupage-header responsive-column-container">
            <div className="homepage-pizza-animation">
              <img className="pizza" src={heroPizzaImg} />
              <img className="onions" src={onionsImg} />
              <img className="heart-green-outline" src={heartGreenOutlineImg} />
            </div>
            <div className="content text-align-center flex-align-center">
              <div dangerouslySetInnerHTML={{ __html: pageContent }} />
            </div>
          </div>
        </div>
      </section>
      <section className="viewport" style={{ paddingBottom: 0 }}>
        <div className="page-container cream-color homepage-items text-align-center">
          <h2 style={{ marginTop: '2rem' }}>{popularItemsHeadline}</h2>
          <div className="responsive-three-column-container">
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
                    <div className="menupage-label" style={{ alignItems: 'center' }}>
                      <h3><Link to={path}>{post.title}</Link></h3>
                      <div className="menupage-caption" dangerouslySetInnerHTML={{ __html: post.description }} />
                      <Link className="btn primary-btn" to={path}><span>{post.title}</span></Link>
                    </div>
                  </div>)
              })
            ) : (
              <p>No items found.</p>
            )}
          </div>
        </div>
      </section>
      <section className="viewport red-color homepage-specials text-align-center" style={{ padding: '7rem 0' }}>
        <div className="full-page-container">
          <h2>{nationalSpecialsHeadline}</h2>
          <p style={{ maxWidth: '540px', margin: '0 auto' }}>{nationalSpecialsParagraph}</p>
          <div className="carousel-wrapper">
            <div className="carousel-container full">
              <ul className="special-carousel" ref={scrollRef} style={{ gridTemplateColumns: `repeat(${nationalSpecials.length}, 1fr)` }}>
                {nationalSpecials && nationalSpecials.length > 0 ? (
                  nationalSpecials.map((post, index) => (
                    <li className="carousel-item" key={index}>
                      <div className="item">
                        <h3 className="item-title" dangerouslySetInnerHTML={{ __html: post.acf.title_of_special }} />
                        <p>with code</p>
                        <h3 className="item-code">{post.title.rendered}</h3>
                      </div>
                    </li>
                  ))
                ) : (
                  <p>No specials found.</p>
                )}
              </ul>
            </div>
          </div>
          <div style={{ margin: '2rem 0' }}>
            {pages.map((_, i) => (
              <button
                className={`carousel-dot ${activePageIndex === i ? 'active' : ''}`}
                key={i}
                onClick={() => goTo(i)}
              />
            ))}
          </div>
          <Link to="/menu/national-specials" className="btn secondary-btn"><span>See More Specials</span></Link>
        </div>
      </section>
      <section className="viewport green-color">
        <div className="page-container cream-color">
          <div className="responsive-twothirds-column-container">
            <div>
              <LazyLoadImage
                src={cateringSectionImage.source_url}
                alt={cateringSectionImage.alt_text}
                effect="blur"
                className="mask hover-image"
              />
            </div>
            <div className="content flex-align-center" style={{ alignItems: 'flex-start' }}>
              <h2>{cateringSectionHeadline}</h2>
              <p>{cateringSectionParagraph}</p>
              <Link to="/catering" className="btn primary-btn" style={{ marginBottom: '4rem' }}><span>Catering Info</span></Link>
            </div>
          </div>
        </div>
      </section>
      <section className="viewport nighttime-background-color" style={{ paddingTop: 0 }}>
        <div className="page-container cream-outline text-align-center">
          <h2 style={{ marginBottom: '3rem' }}>WHY SARPINO'S?</h2>
          <div className="responsive-three-column-container" style={{ margin: '3rem 0' }}>
            <div className="grid-item">
              <Car />
              <h2 style={{ padding: '2rem 0' }}>Free <br />Delivery</h2>
            </div>
            <div className="grid-item">
              <Moon />
              <h2 style={{ padding: '2rem 0' }}>Open <br />Late</h2>
            </div>
            <div className="grid-item">
              <Calendar />
              <h2 style={{ padding: '2rem 0' }}>Open <br />365 Days</h2>
            </div>
          </div>
          <Link to="/about/why-sarpinos" className="btn primary-btn"><span>About Us</span></Link>
        </div>
        <div className="page-container text-align-center" style={{ marginTop: '2rem' }}>
          <h2>Sarpino's On Social</h2>
          <p style={{ maxWidth: '347px', margin: '0 auto' }}>Pizza pics, cheesy captions and saucy posts. Follow us on Instagram and Facebook.</p>
          <div className="social-feed" style={{ margin: '6rem 0' }}>
            // INSTAGRAM FEED //
          </div>
        </div>
      </section>
    </>
  )
};

export default Home;