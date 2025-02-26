import React, { useState, useEffect } from "react";
import Card from "./Card";
import Button from "./Button";
import Search from "./Search";

const CardList = ({ data }) => {
  const limit = 10;
  const [offset, setOffset] = useState(0);
  const [products, setProducts] = useState(data.slice(0, limit));
  const [filteredProducts, setFilteredProducts] = useState(data);

  // Function to handle filtering by tags
  const filterTags = (searchTerm) => {
    const filtered = data.filter((product) =>
      product.tags.some((tag) => tag.toLowerCase().includes(searchTerm.toLowerCase()))
    );
    setFilteredProducts(filtered);
    setOffset(0); // Reset pagination when filtering
    setProducts(filtered.slice(0, limit));
  };

  // Function to handle pagination
  const handlePagination = (direction) => {
    const newOffset = direction === "next" ? offset + limit : offset - limit;
    setOffset(newOffset);
  };

  // Update products when offset or filtering changes
  useEffect(() => {
    setProducts(filteredProducts.slice(offset, offset + limit));
  }, [offset, filteredProducts]);

  return (
    <div className="cf pa2">
      {/* Search Bar */}
      <Search handleSearch={filterTags} />

      <div className="mt2 mb2">
        {products.length > 0 ? (
          products.map((product) => <Card key={product.id} {...product} />)
        ) : (
          <p>No products found</p>
        )}
      </div>

      {/* Pagination Buttons */}
      <div className="flex items-center justify-center pa4">
        <Button text="Previous" handleClick={() => handlePagination("prev")} disabled={offset === 0} />
        <Button
          text="Next"
          handleClick={() => handlePagination("next")}
          disabled={offset + limit >= filteredProducts.length}
        />
      </div>
    </div>
  );
};

export default CardList;
