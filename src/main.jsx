import React from 'react'

import ReactDOM from 'react-dom/client'
import { BrowserRouter } from 'react-router-dom';
import { HelmetProvider } from 'react-helmet-async';
import './main.css'

import App from './App.jsx'

if (typeof window !== 'undefined') {
  ReactDOM.createRoot(document.getElementById('root')).render(

    <React.StrictMode>
      <BrowserRouter>
        <HelmetProvider>
          <App />
        </HelmetProvider>
      </BrowserRouter>
    </React.StrictMode>,

  )
}