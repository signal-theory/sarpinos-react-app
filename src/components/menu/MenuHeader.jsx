import React from 'react';

const MenuHeader = ({ featuredImage, featuredImageAlt, pageTitle, pageContent }) => {
  return (
    <div className="menupage-header responsive-column-container">
      <div className="menupage-image">
        {featuredImage && <img src={featuredImage} alt={featuredImageAlt} />}
      </div>
      <div className="content flex-align-center">
        <h2 dangerouslySetInnerHTML={{ __html: pageTitle }} />
        <div dangerouslySetInnerHTML={{ __html: pageContent }} />
      </div>
    </div>
  )
}

export default MenuHeader;