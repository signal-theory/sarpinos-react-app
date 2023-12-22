import React from 'react'
import { Routes, Route } from 'react-router-dom'
import Navigation from './components/nav/Nav'
import Footer from './components/Footer'
import Home from './pages/home/Home'
import Company from './pages/about/company/Company'
import Blog from './pages/about/blog/Blog'
import BlogSingle from './pages/about/blog/BlogSingle'
import Why from './pages/about/why/Why'
import BYO from './pages/menu/byo/BYO'
import VeganMenu from './pages/menu/vegan/VeganMenu'
import Pizza from './pages/menu/pizza/Pizza'
import PizzaItem from './pages/menu/pizza/PizzaItem'
import Calzones from './pages/menu/calzones/Calzones'
import CalzonesItem from './pages/menu/calzones/CalzonesItem'
import Specials from './pages/menu/specials/Specials'
import Catering from './pages/catering/Catering'
import Locations from './pages/locations/Locations'
import Loyalty from './pages/loyalty/Loyalty'
import { LazyLoadComponent } from 'react-lazy-load-image-component'
import './App.css'
import './Animate.css'
import WebFont from 'webfontloader';


export default function App() {
  WebFont.load({
    typekit: {
      id: 'nqr0nlo'
    }
  });

  return (
    <>
      <Navigation />
      <main className="daytime-background-color">
        <LazyLoadComponent>
          <Routes>
            <Route path="/" element={<Home />} />
            <Route path="/about/company" element={<Company />} />
            <Route path="/about/blog" element={<Blog />} />
            <Route path="/about/why-sarpinos" element={<Why />} />
            <Route path="/about/blog/:slug" element={<BlogSingle />} />
            <Route path="/menu/build-your-own" element={<BYO />} />
            <Route path="/menu/vegan-menu" element={<VeganMenu />} />
            <Route path="/menu/sarpinos-specialty-pizza" element={<Pizza />} />
            <Route path="/menu/sarpinos-specialty-pizza/:slug" element={<PizzaItem />} />
            <Route path="/menu/calzones" element={<Calzones />} />
            <Route path="/menu/calzones/:slug" element={<CalzonesItem />} />
            <Route path="/menu/national-specials" element={<Specials />} />
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