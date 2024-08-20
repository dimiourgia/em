import { Link, useNavigate } from "react-router-dom"
import Product from "../Product/Product";
import { useState } from "react";
import { useSelector } from "react-redux";

export default function({product}){

    const navigate = useNavigate();
    const {balance} = useSelector(state=>state.wallet);
    const {user} = useSelector(state=>state.auth);
    
    return(<div className='relative flex flex-col ml-4' onClick={()=> user && balance > 999 &&  navigate(`/product/${product._id}`)}>
        <Link className="">
            <div className="overflow-hidden rounded-lg shadow-lg group">
                <img
                    className="transition-transform duration-300 ease-in-out transform group-hover:scale-110"
                    src={`${product.imageUrl[product.defaultImageIndex]}@mq`}
                    alt={product?.title}/>
                    {(!user || balance < 1000) && (
                        <div className="absolute rounded-lg inset-0 bg-black bg-opacity-10 backdrop-blur-lg z-10 flex items-center justify-center">
                            <div className="flex flex-col items-center justify-center gap-4">
                                <span className="text-white text-lg font-semibold tracking-wider">EXCLUSIVE</span>
                                <img src='/images/white_lock.svg' style={{width:'32px', height:'32px'}}/>
                            </div>
                        </div>
                    )}
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
            </div>
        </div>
    </div>)
}