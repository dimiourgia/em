import { Link, useNavigate } from "react-router-dom"
import Product from "../Product/Product";
import { useState } from "react";

export default function({product}){

    const navigate = useNavigate();
    const [imageIndex, setImageIndex] = useState(0);
    const handleMouseEnter = ()=>{
        // const totalImages = product?.imageUrl.length;
        // setImageIndex(pre=> (pre+1)%totalImages);
    }


    return(<div className='relative flex flex-col' onClick={()=>navigate(`/product/${product._id}`)}>
        <Link className="" onMouseEnter={handleMouseEnter}>
            <div className="overflow-hidden rounded-lg shadow-lg group">
                <img
                    className="transition-transform duration-300 ease-in-out transform group-hover:scale-110"
                    src={product.imageUrl[imageIndex]}
                    alt={product?.title}/>
                    <div class="absolute rounded-lg inset-0 bg-black opacity-0 group-hover:opacity-10 transition-opacity duration-300"></div>
            </div>
        </Link>
        <div className="absolute bottom-0 w-full">
            {/* <h1 className='font-heading text-center text-2xl sm:text-[16px] md:text-2xl text-gray-800 mt-[10px] whitespace-nowrap'>
                {product.title}
            </h1>
            <h1 className='text-center mt-[10px]'>
                <button onClick={() => navigate("/products")} className="bg-white tracking-widest font-text hover:bg-gray-100 text-gray-800 py-2 px-4 border border-gray-400">
                    {'SHOP NOW'}
                </button>
            </h1> */}

            <div className="bg-gray-100/60 px-4 py-6 rounded-md">
            <div>
                <p className="truncate font-roboto tracking-tight font-semibold">
                {product.title}
                </p>
            </div>
            <div className="flex items-center mt-1 space-x-2">
                <p className="text-md font-text">{"₹" + product.discountedPrice}</p>
                {product.discountedPrice != product.price && <div className="flex items-center space-x-2">
                    <p className="font-text line-through opacity-70 text-sm text-gray-500">
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