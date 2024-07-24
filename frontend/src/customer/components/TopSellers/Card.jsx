import { Link, useNavigate } from "react-router-dom"
import Product from "../Product/Product";

export default function({product}){

    const navigate = useNavigate();

    return(<div className='ml-4 flex flex-col' onClick={()=>navigate(`/product/${product._id}`)}>
        <Link className="">
            <img
                src={product?.imageUrl[0]}
                alt={product?.title}
            />
        </Link>
        <div>
            {/* <h1 className='font-heading text-center text-2xl sm:text-[16px] md:text-2xl text-gray-800 mt-[10px] whitespace-nowrap'>
                {product.title}
            </h1>
            <h1 className='text-center mt-[10px]'>
                <button onClick={() => navigate("/products")} className="bg-white tracking-widest font-text hover:bg-gray-100 text-gray-800 py-2 px-4 border border-gray-400">
                    {'SHOP NOW'}
                </button>
            </h1> */}

            <div className="bg-gray-100 h-[100px] p-3 rounded-md">
            <div>
            <p className="font-text text-red-700 opacity-70 mt-2 text-sm">{product.brand}</p>
                <p className="truncate font-heading">
                {product.title}
                </p>
            </div>
            <div className="flex items-center mt-1 space-x-2">
                <p className="text-md font-text">{"₹" + product.discountedPrice}</p>
                <p className="font-text line-through opacity-70 text-sm text-gray-500">
                {"₹" + product.price}
                </p>
                <p className="text-green-500 text-xs font-text">
                {((1 - product.discountedPrice / product.price) * 100).toFixed(0) + "% off"}
                </p>
            </div>
            </div>
        </div>
    </div>)
}