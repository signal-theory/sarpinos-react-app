import React from 'react';

const CategorySelector = ({ selectionTitle, availableTerms, selectedTerm, handleTermChange }) => (
  <>
    <h2 className="text-align-center">{selectionTitle}</h2>
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