import React from 'react';
import './CategorySelector.css';

const CategorySelector = ({ selectionTitle, availableTerms, selectedTerm, handleTermChange }) => (
  <>
    <h4 className="text-align-center" style={{ marginTop: '4rem' }}>{selectionTitle}</h4>
    <div className="category-filter">
      {availableTerms.map((option, index) => (
        <button
          onClick={handleTermChange}
          key={`term${index}`}
          value={option}
          className={selectedTerm === option ? 'active' : ''}
        >
          {option}
        </button>
      ))}
    </div>
  </>
);

export default CategorySelector;