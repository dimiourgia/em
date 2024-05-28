import React from "react";
import "./ProductCard.css";
import { useNavigate } from "react-router-dom";
//niche jo product hai vo props hai
const ProductCard = ({ product }) => {
  console.log("this is the card page", product )
  const navigate = useNavigate();
  return (
    <>
      <div
        onClick={() => navigate(`/product/${product._id}`)}
        className="productCard w-[15rem] m-3 transition-all cursor-pointer"
      >
        <div className="pt-[100px] pl-[10px]  h-[20rem]">
          <img
            className="h-[200px] w-auto object-cover object-left-top "
            src={product?.imageUrl}
            alt="ss"
          />
        </div>
        <div className="textPart bg-white p-3">
          <div>
            <p className="font-bold font-abc text-lg">{product.brand}</p>
            <p className="font-abc"> {product.title} </p>
          </div>
          <div className="flex items-center space-x-2">
            <p className=" text-sm font-abc">
              {"₹" + product.discountedPrice}
            </p>
            <p className="font-abc line-through text-sm text-gray-500">
              {"₹" + product.price}
            </p>
            <p className="text-red-500 text-sm font-abc">
              {((1 - product.discountedPrice / product.price) * 100).toFixed(
                0
              ) + "% off"}
            </p>
          </div>
        </div>
      </div>
    </>
  );
};

export default ProductCard;