import React, { useState, useEffect } from "react";
import Card from "./Card";
import Button from "./Button";
import Search from "./Search";

const CardList = ({ data }) => {
  const limit = 10; 
  const defaultDataset = data.slice(0, limit);

  const [offset, setOffset] = useState(0); 
  const [products, setProducts] = useState(defaultDataset); 
  const [filteredData, setFilteredData] = useState(data); 


  const handlePagination = (direction) => {
    const newOffset = offset + direction;
    setOffset(newOffset);
  };

  const filterTags = (term) => {
    const filteredProducts = data.filter((product) =>
      product.tags.some((tag) =>
        typeof tag.title === 'string' && tag.title.toLowerCase().includes(term.toLowerCase())
      )
    );
    setFilteredData(filteredProducts);
    setOffset(0); 
  };

 
  useEffect(() => {
    setProducts(filteredData.slice(offset, offset + limit));
  }, [offset, filteredData]);

  const isNextDisabled = offset + limit >= filteredData.length;

  return (
    <div className="cf pa2">
      <Search handleSearch={filterTags} />

      {/* Display products */}
      <div className="mt2 mb2">
        {products.map((product) => (
          <Card key={product.id} {...product} />
        ))}
      </div>

      {/* Pagination Buttons */}
      <div className="flex items-center justify-center pa4">
        <Button text="Previous" handleClick={() => handlePagination(-10)} />
        <Button
          text="Next"
          handleClick={() => handlePagination(10)}
          disabled={isNextDisabled}
        />
      </div>
    </div>
  );
};

export default CardList;
