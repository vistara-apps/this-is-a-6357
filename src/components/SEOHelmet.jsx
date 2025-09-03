import React from 'react'
import { Helmet } from 'react-helmet-async'

function SEOHelmet({ 
  title, 
  description, 
  image, 
  url, 
  type = 'website',
  twitterCard = 'summary_large_image'
}) {
  const siteTitle = 'Critter Cards'
  const fullTitle = title ? `${title} | ${siteTitle}` : siteTitle
  
  return (
    <Helmet>
      {/* Basic meta tags */}
      <title>{fullTitle}</title>
      <meta name="description" content={description} />
      
      {/* Open Graph meta tags */}
      <meta property="og:title" content={title || siteTitle} />
      <meta property="og:description" content={description} />
      <meta property="og:type" content={type} />
      {url && <meta property="og:url" content={url} />}
      {image && <meta property="og:image" content={image} />}
      <meta property="og:site_name" content={siteTitle} />
      
      {/* Twitter Card meta tags */}
      <meta name="twitter:card" content={twitterCard} />
      <meta name="twitter:title" content={title || siteTitle} />
      <meta name="twitter:description" content={description} />
      {image && <meta name="twitter:image" content={image} />}
    </Helmet>
  )
}

export default SEOHelmet

