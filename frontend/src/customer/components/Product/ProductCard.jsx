import React from "react";
import "./ProductCard.css";
import { useNavigate } from "react-router-dom";

const ProductCard = ({ product }) => {
  const navigate = useNavigate();
  return (
    <>
      <div
        onClick={() => navigate(`/product/${product._id}`)}
        className="productCard w-[15rem] m-3 transition-all cursor-pointer rounded-md"
      >
        <div className="h-[15rem] rounded-t-md">
          <img
            className="h-[350px] w-full object-cover mx-auto flex justify-center items-center rounded-t-md"
            src={product?.imageUrl}
            alt="ss"
          />
        </div>
        <div className="textPart mt-[100px] bg-white p-3 rounded-b-md">
          <div>
            <p className="tracking-widest font-abc font-light text-md">
              {product.title}
            </p>
            <p className="font-abc text-sm">{product.brand}</p>
          </div>
          <div className="flex items-center space-x-2">
            <p className="text-sm font-abc">{"₹" + product.discountedPrice}</p>
            <p className="font-abc line-through text-sm text-gray-500">
              {"₹" + product.price}
            </p>
            <p className="text-red-500 text-sm font-abc">
              {((1 - product.discountedPrice / product.price) * 100).toFixed(0) + "% off"}
            </p>
          </div>
        </div>
      </div>
    </>
  );
};

export default ProductCard;
