import React, { useEffect, useState } from 'react'
import SEOHelmet from '../../../components/SEOHelmet'
import { fetchData } from '../../fetchData';
import '../Menu.css'
import MenuHeader from '../../../components/menu/MenuHeader'
import MenuList from '../../../components/menu/MenuList'


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

  const pageId = 91; // Page ID
  // Fetch data
  useEffect(() => {
    fetchData(['pizza', 'calzones'], pageId, selectedTerm, setPosts, setFilteredPosts, setPageSlug, setPageTitle, setPageContent, setSeoData, setFeaturedImage, setFeaturedImageAlt);
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
          <MenuList filteredPosts={filteredPosts} pageSlug={pageSlug} orderHandler={orderHandler} />
        </div>
      </section>
    </>
  );
};

export default BuildYourOwn;
