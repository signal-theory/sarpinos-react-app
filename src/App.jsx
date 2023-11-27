import React from 'react'

import { Routes, Route } from 'react-router-dom';
import Navigation from './components/Nav';
import Home from './pages/Home';
import About from './pages/About';
import Contact from './pages/Contact';
import Blog from './pages/Blog';
import Pizza from './pages/Pizza';
import Single from './pages/Single';
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
            <Route path="/pizza" element={<Pizza />} />
            <Route path="/pizza/:slug" element={<Single />} /> {/* Route for single post */}
          </Routes>
        </LazyLoadComponent>
      </main>
    </>
  )
}