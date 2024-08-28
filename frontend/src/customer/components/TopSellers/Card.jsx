import { Link, useNavigate } from "react-router-dom"
import Product from "../Product/Product";
import { useState } from "react";

export default function({product, defaultImageIndex}){

    const navigate = useNavigate();

    return(<div className='relative flex flex-col sm:ml-4' onClick={()=>navigate(`/product/${product._id}`)}>
        <Link className="">
            <div className="overflow-hidden rounded-lg sm:shadow-lg group">
                <img
                    className="transition-transform duration-300 ease-in-out transform group-hover:scale-110"
                    src={`${product.imageUrl[product.defaultImageIndex]}@mq`}
                    alt={product?.title}/>
                    <div class="absolute rounded-lg inset-0 bg-black opacity-0 group-hover:opacity-10 transition-opacity duration-300"></div>
            </div>
        </Link>
        <div className="absolute bottom-0 w-full">
            <div className="bg-gray-100/60 px-4 py-6 rounded-md">
            <div>
                <p className="text-sm font-roboto tracking-tight font-thin">
                {product.title}
                </p>
            </div>
            <div className="flex items-center mt-1 space-x-2 text-neutral-600">
                <p className="text-md font-roboto text-sm">{"₹" + product.discountedPrice}</p>
                {product.discountedPrice != product.price && <div className="flex items-center space-x-2">
                    <p className="font-roboto line-through opacity-70 text-sm text-gray-500">
                        {"₹" + product.price}
                    </p>
                    <p className="text-green-500 text-xs font-text">
                        {((1 - product.discountedPrice / product.price) * 100).toFixed(0) + "% off"}
                    </p>
                </div>}
            </div>
            <div className="flex gap-4 text-xs text-neutral-500 mt-2">
                {product.sizes.map(size=><p className={`${size.quantity == 0 && 'line-through'}`}>{size.name}</p>)}
            </div>
            </div>
        </div>
    </div>)
}