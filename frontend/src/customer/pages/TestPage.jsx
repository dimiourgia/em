import React, { useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { findProducts } from '../../State/Product/Action';

const TestPage = () => {
  const products = useSelector(state => state.products.products);
  const dispatch = useDispatch();

  useEffect(() => {
    dispatch(findProducts());
  }, [dispatch]);

  return (
    <>
      <div>TestPage</div>
      {products && products.map((product) => (
        <div key={product._id}>
          <h2>{product.discountedPrice}</h2>
          <p>{product.price}</p>
        </div>
      ))}
    </>
  );
};

export default TestPage;
