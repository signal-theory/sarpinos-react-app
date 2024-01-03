import React, { useEffect, useState } from 'react'
import SEOHelmet from '../../../components/SEOHelmet.jsx'
import { fetchData } from '../../fetchData.js';
import '../Menu.css'
import MenuHeader from '../../../components/menu/MenuHeader.jsx'
import MenuList from '../../../components/menu/MenuList.jsx'


const BuildYourOwn = () => {
  const orderHandler = (title) => console.log('Order', title);
  const [posts, setPosts] = useState([]);
  const [filteredPosts, setFilteredPosts] = useState([]);
  const [featuredImage, setFeaturedImage] = useState(null);
  const [featuredImageAlt, setFeaturedImageAlt] = useState(null);
  const [pageTitle, setPageTitle] = useState(null);
  const [pageContent, setPageContent] = useState(null);
  const [pageSlug, setPageSlug] = useState(null);
  const [seoData, setSeoData] = useState({});
  const selectedTerm = '';
  const [loading, setLoading] = useState();

  const pageId = 91; // Page ID
  // Fetch data
  useEffect(() => {
    setLoading(true); // Start loading
    fetchData(['pizza', 'calzones'], pageId, selectedTerm, setPosts, setFilteredPosts, setPageSlug, setPageTitle, setPageContent, setSeoData, setFeaturedImage, setFeaturedImageAlt)
      .then(() => {
        setLoading(false); // End loading after data has been fetched and processed
      });
  }, [pageId, selectedTerm]);

  if (!posts) {
    return <div>Loading...</div>;
  }

  return (
    <>
      <SEOHelmet seoData={seoData} pageSlug={pageSlug} />
      <section className="viewport innerhero">
        <div className="page-container cream-color">
          <MenuHeader
            featuredImage={featuredImage}
            featuredImageAlt={featuredImageAlt}
            pageTitle={pageTitle}
            pageContent={pageContent}
          />
          <MenuList
            filteredPosts={filteredPosts}
            orderHandler={orderHandler}
            loading={loading} />
        </div>
      </section>
    </>
  );
};

export default BuildYourOwn;
