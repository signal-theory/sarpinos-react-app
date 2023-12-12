import React from 'react';
import { Helmet } from 'react-helmet-async';
import he from 'he';

const SEOHelmet = ({ seoData, pageSlug }) => (
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
    <meta property="og:URL" content={`https://www.gosarpinos.com/menu/${pageSlug}`} />
  </Helmet>
);

export default SEOHelmet;