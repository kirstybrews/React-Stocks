import React from 'react';

const SearchBar = ({filterStocks, alphabetically, price, sortAlphabetically, sortByPrice}) => {
  return (
    <div>

      <strong>Sort by:</strong>
      <label>
        <input type="radio" value="alphabetically" checked={alphabetically} onChange={sortAlphabetically}/>
        Alphabetically
      </label>
      <label>
        <input type="radio" value="price" checked={price} onChange={sortByPrice}/>
        Price
      </label>
      <br/>

      <label>
        <strong>Filter:</strong>
        <select onChange={filterStocks}>
          <option value="Tech">Tech</option>
          <option value="Sportswear">Sportswear</option>
          <option value="Finance">Finance</option>
        </select>
      </label>


    </div>
  );
}


export default SearchBar;
