import React, { useEffect, useState } from 'react'
import SEOHelmet from '../../../components/SEOHelmet'
import { fetchData } from '../../fetchData';
import '../Menu.css'
import MenuHeader from '../../../components/menu/MenuHeader'
import CategorySelector from '../../../components/CategorySelector'
import MenuList from '../../../components/menu/MenuList'


const Pizza = () => {
  const orderHandler = (title) => console.log('Order', title);
  const [posts, setPosts] = useState([]);
  const [filteredPosts, setFilteredPosts] = useState([]);
  const [featuredImage, setFeaturedImage] = useState(null);
  const [featuredImageAlt, setFeaturedImageAlt] = useState(null);
  const [pageTitle, setPageTitle] = useState(null);
  const [pageContent, setPageContent] = useState(null);
  const [pageSlug, setPageSlug] = useState(null);
  const [seoData, setSeoData] = useState({});
  const [selectedTerm, setSelectedTerm] = useState('Specialty');
  const availableTerms = ['Specialty', 'Meatless', 'Vegan', 'Popular'];

  const pageId = 34; // Page ID
  // Fetch data
  useEffect(() => {
    fetchData(['pizza'], pageId, selectedTerm, setPosts, setFilteredPosts, setPageSlug, setPageTitle, setPageContent, setSeoData, setFeaturedImage, setFeaturedImageAlt);
  }, [pageId, selectedTerm]);

  if (!posts) {
    return <div>Loading...</div>;
  }
  const handleTermChange = (event) => {
    setSelectedTerm(event.target.value);
  };

  return (
    <>
      <SEOHelmet seoData={seoData} pageSlug={pageSlug} />
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

export default Pizza;
