import React from 'react'
import { Routes, Route } from 'react-router-dom';
import Navigation from './components/Nav';
import Footer from './components/Footer';
import Home from './pages/home/Home';
import Company from './pages/about/company/Company';
import Blog from './pages/about/blog/Blog';
import BlogSingle from './pages/about/blog/BlogSingle';
import Why from './pages/about/why/Why';
import Pizza from './pages/menu/pizza/Pizza';
import PizzaSingle from './pages/menu/pizza/PizzaSingle';
import Catering from './pages/catering/Catering';
import Locations from './pages/locations/Locations';
import Loyalty from './pages/loyalty/Loyalty';
import { LazyLoadComponent } from 'react-lazy-load-image-component';
import './App.css';


export default function App() {


  return (
    <>
      <Navigation />
      <main>
        <LazyLoadComponent>
          <Routes>
            <Route path="/" element={<Home />} />
            <Route path="/about/company" element={<Company />} />
            <Route path="/about/blog" element={<Blog />} />
            <Route path="/about/why-sarpinos" element={<Why />} />
            <Route path="/about/blog/:slug" element={<BlogSingle />} />
            <Route path="/menu/pizza" element={<Pizza />} />
            <Route path="/menu/pizza/:slug" element={<PizzaSingle />} />
            <Route path="/catering" element={<Catering />} />
            <Route path="/locations" element={<Locations />} />
            <Route path="/loyalty" element={<Loyalty />} />
          </Routes>
        </LazyLoadComponent>
      </main>
      <Footer />
    </>
  )
}