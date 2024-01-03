import React, { useState, useEffect } from 'react'
import axios from 'axios'
import SEOHelmet from '../../components/SEOHelmet.jsx'
import Loading from '../../components/Loading.jsx'
import './Home.css'
import '../menu/specials/Specials.css'
import { Link } from 'react-router-dom';
import { LazyLoadImage } from 'react-lazy-load-image-component'
import { useSnapCarousel } from 'react-snap-carousel';

import olivesImg from '../../assets/olives.svg'
import tomatoesCutImg from '../../assets/tomatoes-cut.svg'
import garlicImg from '../../assets/garlic-bulb.svg'
import heroPizzaImg from '../../assets/Pizza.png'
import onionsImg from '../../assets/onions-sliced.png'
import heartGreenOutlineImg from '../../assets/heart-green-outline.svg'
import peppercornsImg from '../../assets/peppercorns-two.svg'
import heartTanOutlineImg from '../../assets/heart-tan-outline.svg'
import tomatoesFreshCutImg from '../../assets/tomatoes-cut.png'
import heartGreenFill from '../../assets/heart-green-fill.svg'
import basilImg_1 from '../../assets/basil-leaf-1.png'
import tomatoWholeSliceImg from '../../assets/tomato-whole-and-slice.svg'
import basilImg_2 from '../../assets/basil-leaf-2.png'
import basilImg_3 from '../../assets/basil-leaf-3.png'

import heartSolid from '../../assets/heart-solid.svg'
import specialsBKG from '../../assets/circle-outline-1.svg'

import Car from '../../components/svgs/drawing-car.jsx'
import Moon from '../../components/svgs/drawing-moon.jsx'
import Calendar from '../../components/svgs/drawing-calendar.jsx'



const Home = () => {
  const {
    scrollRef,
    activePageIndex,
    pages,
    goTo,
  } = useSnapCarousel();

  const [isLoading, setIsLoading] = useState(true);

  const pageId = 149; // Page ID
  const [pageTitle, setPageTitle] = useState(null);
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
    setPageTitle(response.data.title.rendered); // Set the page title
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
        const hoverImageResponse = await axios.get(`https://sarpinos.mysites.io/wp-json/wp/v2/media/${item.hover_image}`);
        return {
          ...item,
          image: {
            source_url: imageResponse.data.source_url,
            alt_text: imageResponse.data.alt_text,
          },
          hover_image: {
            source_url: hoverImageResponse.data.source_url,
            alt_text: hoverImageResponse.data.alt_text,
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
        <div className="hero-container">
          <div className="homepage-pizza-animation">
            <img className="olives" src={olivesImg} />
            <img className="tomatoes-cut" src={tomatoesCutImg} />
            <img className="garlic-bulb" src={garlicImg} />
            <LazyLoadImage
              src={heroPizzaImg}
              alt="sarpinos pizza"
              effect="blur"
              className="pizza"
            />
            <img className="onions" src={onionsImg} />
            <img className="heart-green-outline-1" src={heartGreenOutlineImg} />
            <img className="peppercorns" src={peppercornsImg} />
            <img className="heart-tan-outline" src={heartTanOutlineImg} />
            <img className="tomatoes-fresh-cut" src={tomatoesFreshCutImg} />
            <img className="heart-green-fill" src={heartGreenFill} />
            <img className="basil-leaf-1" src={basilImg_1} />
            <img className="heart-green-outline-2" src={heartGreenOutlineImg} />
            <img className="tomato-whole-and-slice" src={tomatoWholeSliceImg} />
            <img className="basil-leaf-2" src={basilImg_2} />
            <img className="basil-leaf-3" src={basilImg_3} />
          </div>
          <div className="homepage-content">
            <div dangerouslySetInnerHTML={{ __html: pageContent }} style={{ margin: '4rem 0 2rem' }} />
            <Link to="" className="btn tertiary-btn glow"><span>Order Online</span></Link>
          </div>
        </div>
      </section>
      <section className="viewport homepage-items" style={{ padding: 0 }}>
        <div className="page-container cream-color text-align-center">
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
                        {post.hover_image && (
                          <LazyLoadImage
                            src={post.hover_image.source_url}
                            alt={post.hover_image.alt_text}
                            effect="blur"
                            className="mask hover-image"
                          />
                        )}
                        {post.image && (
                          <LazyLoadImage
                            src={post.image.source_url}
                            alt={post.image.alt_text}
                            effect="blur"
                            className="mask main-image"
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
                      <img src={specialsBKG} className="specials-bkg" />
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
              <Link to="/catering" className="btn primary-btn"><span>Catering Info</span></Link>
            </div>
          </div>
        </div>
      </section>
      <section className="viewport nighttime-background-color" style={{ paddingTop: 0 }}>
        <div className="page-container cream-outline text-align-center">
          <h2 style={{ margin: '3rem 0' }}>WHY SARPINO'S?</h2>
          <div className="responsive-three-column-container" style={{ margin: '3rem 0 0' }}>
            <div className="grid-item">
              <Car />
              <h2 style={{ padding: '1.5rem 0' }}>Free <br />Delivery</h2>
            </div>
            <div className="grid-item">
              <Moon />
              <h2 style={{ padding: '1.5rem 0' }}>Open <br />Late</h2>
            </div>
            <div className="grid-item">
              <Calendar />
              <h2 style={{ padding: '1.5rem 0' }}>Open <br />365 Days</h2>
            </div>
          </div>
          <Link to="/about/why-sarpinos" className="btn primary-btn" style={{ marginBottom: '2rem' }}><span>About Us</span></Link>
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