import React from 'react'

import { Routes, Route } from 'react-router-dom';
import Navigation from './components/Nav';
import Home from './pages/Home';
import About from './pages/About';
import Contact from './pages/Contact';
import Blog from './pages/Blog';
import BlogSingle from './pages/BlogSingle';
import Pizza from './pages/Pizza';
import PizzaSingle from './pages/PizzaSingle';
import { LazyLoadComponent } from 'react-lazy-load-image-component';


export default function App() {


  return (
    <>
      <Navigation />
      <main>
        <LazyLoadComponent>
          <Routes>
            <Route path="/" element={<Home />} />
            <Route path="/about" element={<About />} />
            <Route path="/contact" element={<Contact />} />
            <Route path="/blog" element={<Blog />} />
            <Route path="/blog/:slug" element={<BlogSingle />} />
            <Route path="/pizza" element={<Pizza />} />
            <Route path="/pizza/:slug" element={<PizzaSingle />} />
          </Routes>
        </LazyLoadComponent>
      </main>
    </>
  )
}