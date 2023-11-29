import React, { useEffect, useState } from 'react'
import { Link } from 'react-router-dom'
import axios from 'axios'
import './Pizza.css'
import { LazyLoadImage } from 'react-lazy-load-image-component'
import 'react-lazy-load-image-component/src/effects/blur.css'
import { Helmet } from 'react-helmet-async'


const Pizza = () => {

  const [posts, setPosts] = useState([]);
  const [filteredPosts, setFilteredPosts] = useState([]);
  const [featuredImage, setFeaturedImage] = useState(null);
  const [featuredImageAlt, setFeaturedImageAlt] = useState(null);
  const [pageTitle, setPageTitle] = useState(null);
  const [pageContent, setPageContent] = useState(null);
  const [seoData, setSeoData] = useState({});
  const [selectedTerm, setSelectedTerm] = useState('Specialty');
  const availableTerms = ['Specialty', 'Meatless', 'Vegan', 'Popular'];

  // Fetch custom posts when component mounts
  useEffect(() => {
    axios.get(`https://sarpinos.mysites.io/wp-json/wp/v2/pizza`)
      .then(response => {
        setPosts(response.data);
      })
      .catch(error => console.error(error));
  }, []);

  // Filter posts when the selected term changes
  useEffect(() => {
    console.log('selectedTerm:', selectedTerm); // Log the selected term

    const newFilteredPosts = posts.filter(post => {
      const condition = post.acf.menu_category.includes(selectedTerm);
      console.log('post.acf.menu_category:', post.acf.menu_category); // Log the categories for each post
      console.log('condition:', condition); // Log the result of the filter condition
      return condition;
    });

    setFilteredPosts(newFilteredPosts);
  }, [selectedTerm, posts]);

  // Fetch the featured image for the page
  useEffect(() => {
    axios.get(`https://sarpinos.mysites.io/wp-json/wp/v2/pages?slug=pizza`)
      .then(response => {
        const post = response.data[0];
        setPageTitle(post.title.rendered); // Set the page title
        setPageContent(post.content.rendered); // Set the page content

        // If there's a featured image, fetch its details
        const imageId = post.featured_media;
        if (imageId) {
          return axios.get(`https://sarpinos.mysites.io/wp-json/wp/v2/media/${imageId}`);
        }
      })
      .then(imageResponse => {
        if (imageResponse && imageResponse.data) {
          setFeaturedImage(imageResponse.data.source_url); // Set the featured image URL
          setFeaturedImageAlt(imageResponse.data.alt_text); // Set the featured image alt text
        }
      })
      .catch(error => console.error(error));
  }, []);

  // Fetch posts with images and SEO data
  useEffect(() => {
    axios.get(`https://sarpinos.mysites.io/wp-json/wp/v2/pizza`)
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
  }, [selectedTerm]);

  if (!posts) {
    return <div>Loading...</div>;
  }

  const handleTermChange = (event) => {
    setSelectedTerm(event.target.value);
  };

  return (
    <div className="page-container">
      <Helmet>
        {seoData && seoData.og_title && <title>{seoData.og_title}</title>}
        {seoData && seoData.og_description && <meta name="description" content={seoData.og_description} />}
        {seoData && seoData.og_image && seoData.og_image[0] && seoData.og_image[0].url && <meta property="og:image" content={seoData.og_image[0].url} />}
        {seoData && seoData.og_site_name && <meta name="site_name" content={seoData.og_site_name} />}
        <meta property="og:type" content="article" />
        <meta property="og:URL" content={window.location.href} />
      </Helmet>
      <div className="pizza-header">
        {featuredImage && <img src={featuredImage} alt={featuredImageAlt} />}
        <div className="content">
          <h1>{pageTitle}</h1>
          <div dangerouslySetInnerHTML={{ __html: pageContent }} />
        </div>
      </div>
      <h2 className="text-align-center">Sort Specialty Pizzas</h2>
      <div className="pizza-categories">
        {availableTerms.map((option, index) => (
          <button onClick={handleTermChange} key={`term${index}`} value={option}>{option}</button>
        ))}
      </div>
      <div className="pizza-list">
        {filteredPosts && filteredPosts.length > 0 ? (
          filteredPosts.map(post => {
            console.log(post); // Log each post
            return (
              <div key={post.id} className="pizza-item">
                <div className="pizza-thumbnail">
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
                <div className="pizza-label">
                  <h2><Link to={`/pizza/${post.slug}`}>{post.title.rendered}</Link></h2>
                  <div dangerouslySetInnerHTML={{ __html: post.acf.caption }} />
                  <button>ORDER ONLINE</button>
                </div>
              </div>
            );
          })
        ) : (
          <p>No pizzas found for the selected category.</p>
        )}
      </div>
    </div>
  );
};

export default Pizza;
