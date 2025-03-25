import React from 'react';
import { Divider } from 'semantic-ui-react';
import ProductList from './ProductList';
import "./Recommendations.css";

const Recommendations = ({ similarProducts }) => {
  return (
    <div className="recommendations">
      <h2 className='title'>YOU MIGHT ALSO LIKE</h2>
      <Divider />
      <ProductList products={similarProducts} />
    </div>
  );
};

export default Recommendations;
