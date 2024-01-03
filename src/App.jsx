import React from 'react'
import { Routes, Route } from 'react-router-dom'
import Navigation from './components/nav/Nav.jsx'
import Footer from './components/Footer.jsx'
import Home from './pages/home/Home.jsx'
import Company from './pages/about/company/Company.jsx'
import Blog from './pages/about/blog/Blog.jsx'
import BlogSingle from './pages/about/blog/BlogSingle.jsx'
import Why from './pages/about/why/Why.jsx'
import BYO from './pages/menu/byo/BYO.jsx'
import VeganMenu from './pages/menu/vegan/VeganMenu.jsx'
import Pizza from './pages/menu/pizza/Pizza.jsx'
import PizzaItem from './pages/menu/pizza/PizzaItem.jsx'
import Calzones from './pages/menu/calzones/Calzones.jsx'
import CalzonesItem from './pages/menu/calzones/CalzonesItem.jsx'
import Specials from './pages/menu/specials/Specials.jsx'
import Catering from './pages/catering/Catering.jsx'
import Locations from './pages/locations/Locations.jsx'
import Loyalty from './pages/loyalty/Loyalty.jsx'
import { LazyLoadComponent } from 'react-lazy-load-image-component'
import './App.css'
import './Animate.css'


const App = () => {
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
};
export default App;