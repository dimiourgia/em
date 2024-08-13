import React from "react";
import "./ProductCard.css";
import { useNavigate } from "react-router-dom";

const ProductCard = ({ product, defaultImageIndex=0 }) => {
  const navigate = useNavigate();
  return (
    <>
      <div
        onClick={() => navigate(`/product/${product._id}`)}
        className="productCard w-[15rem] m-3 transition-all cursor-pointer rounded-md hover:shadow-xl"
      >
        <div className="h-[15rem] rounded">
          <img
            className="h-[350px] w-full object-cover mx-auto flex justify-center items-center rounded"
            src={`${product?.imageUrl[product.defaultImageIndex]}@mq`}
            alt="ss"
          />
        </div>
        <div className="mt-[100px] h-[100px] p-3 rounded-md">
          <div>
          {/* <p className="font-text text-red-700 opacity-70 mt-2 text-sm">{product.brand}</p> */}
            <p className="font-sans text-sm text-neutral-700 mt-1">
              {product.title}
            </p>
          </div>
          <div className="flex items-center mt-1 space-x-2">
            <p className="text-md font-text text-neutral-600">{"₹" + product.discountedPrice}</p>
            {product.price != product.discountedPrice && <div className="flex space-x-2">
              <p className="font-text line-through opacity-70 text-sm text-gray-500">
                {"₹" + product.price}
              </p>
              <p className="text-blue-500 text-sm font-text">
                {((1 - product.discountedPrice / product.price) * 100).toFixed(0) + "% off"}
              </p>
            </div>}
          </div>
          <div className="flex gap-4 text-xs text-neutral-500 my-1">
            {product.sizes.map(size=><p className={`${size.quantity < 1 && 'line-through'}`}>{size.name}</p>)}
          </div>
        </div>
      </div>
    </>
  );
};

export default ProductCard;
