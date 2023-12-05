import React, { useEffect, useState } from 'react'
import axios from 'axios'
import '../Menu.css'
import MenuHeader from '../../../components/menu/MenuHeader'
import CategorySelector from '../../../components/CategorySelector'
import MenuList from '../../../components/menu/MenuList'
import { Helmet } from 'react-helmet-async'
import he from 'he';


const Calzones = () => {
  const pageId = 94; // Page ID
  const postType = 'calzones'; // Post type slug
  const orderHandler = (title) => console.log('Order an', title);
  const [posts, setPosts] = useState([]);
  const [filteredPosts, setFilteredPosts] = useState([]);
  const [featuredImage, setFeaturedImage] = useState(null);
  const [featuredImageAlt, setFeaturedImageAlt] = useState(null);
  const [pageTitle, setPageTitle] = useState(null);
  const [pageContent, setPageContent] = useState(null);
  const [pageSlug, setPageSlug] = useState(null);
  const [seoData, setSeoData] = useState({});
  const [selectedTerm, setSelectedTerm] = useState('All Calzones');
  const availableTerms = ['All Calzones', 'Meatless', 'Vegan', 'Sweet', 'Popular'];

  // Fetch Calzone posts with images and SEO data
  useEffect(() => {
    axios.get(`https://sarpinos.mysites.io/wp-json/wp/v2/${postType}`)
      .then(response => {
        const fetches = response.data.map(post => {
          // Fetches for the first image field
          const imageFetch = post.acf.main_image
            ? axios.get(`https://sarpinos.mysites.io/wp-json/wp/v2/media/${post.acf.main_image}`)
              .then(imageResponse => {
                post.imageDetails = imageResponse.data;
              })
            : Promise.resolve();

          const hoverImageFetch = post.acf.hover_image
            ? axios.get(`https://sarpinos.mysites.io/wp-json/wp/v2/media/${post.acf.hover_image}`)
              .then(hoverImageResponse => {
                post.hoverImageDetails = hoverImageResponse.data;
              })
            : Promise.resolve();

          return Promise.all([imageFetch, hoverImageFetch]).then(() => post);
        });
        return Promise.all(fetches);
      })
      .then(postsWithImages => {
        setPosts(postsWithImages); // Set the posts
      })
      .catch(error => console.error(error));
  }, [selectedTerm]);

  if (!posts) {
    return <div>Loading...</div>;
  }

  // Filter posts when the selected term changes
  useEffect(() => {
    const newFilteredPosts = posts.filter(post => post.acf.menu_category.includes(selectedTerm));
    setFilteredPosts(newFilteredPosts);
  }, [selectedTerm, posts]);

  const handleTermChange = (event) => {
    setSelectedTerm(event.target.value);
  };

  // Fetch Page content, Featured image, and SEO data
  useEffect(() => {
    axios.get(`https://sarpinos.mysites.io/wp-json/wp/v2/pages/${pageId}`)
      .then(response => {
        const post = response.data; // Get the post data

        setPageTitle(post.title.rendered); // Set the page title
        setPageContent(post.content.rendered); // Set the page content
        setPageSlug(post.slug); // Set the page slug

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
      <Helmet>
        {seoData && seoData.title && <title>{he.decode(seoData.title)}</title>}
        {seoData && seoData.description && <meta name="description" content={seoData.description} />}
        {seoData && seoData.og_title && <meta property="og:title" content={he.decode(seoData.og_title)} />}
        {seoData && seoData.og_title && <meta property="twitter:title" content={he.decode(seoData.og_title)} />}
        {seoData && seoData.og_description && <meta property="og:description" content={seoData.og_description} />}
        {seoData && seoData.og_description && <meta property="twitter:description" content={seoData.og_description} />}
        {seoData && seoData.og_site_name && <meta property="og:site_name" content={he.decode(seoData.og_site_name)} />}
        {seoData && seoData.og_image && seoData.og_image[0] && seoData.og_image[0].url && <meta property="og:image" content={seoData.og_image[0].url} />}
        {seoData && seoData.og_image && seoData.og_image[0] && seoData.og_image[0].url && <meta property="twitter:image" content={seoData.og_image[0].url} />}
        {seoData && seoData.twitter_card && <meta name="twitter:card" content={seoData.twitter_card} />}
        <meta name="twitter:site" content="@sarpinos_pizza" />
        {seoData && seoData.og_type && <meta property="og:type" content={seoData.og_type} />}
        <meta property="og:URL" content={(`https://www.gosarpinos.com/menu/${pageSlug}`)} />
      </Helmet>
      <div className="page-container">
        <MenuHeader
          featuredImage={featuredImage}
          featuredImageAlt={featuredImageAlt}
          pageTitle={pageTitle}
          pageContent={pageContent}
        />
        <CategorySelector
          selectionTitle="Sort Specialty Pizzas"
          availableTerms={availableTerms}
          selectedTerm={selectedTerm}
          handleTermChange={handleTermChange}
        />
        <MenuList filteredPosts={filteredPosts} pageSlug={pageSlug} orderHandler={orderHandler} />
      </div>
    </>
  );
};

export default Calzones;
