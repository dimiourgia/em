import { Link, useNavigate } from "react-router-dom"

export default function({title, shopTitle, imageSrc}){

    const navigate = useNavigate();

    return(<div className=''>
        <Link to="/products">
            <img
                src={imageSrc}
                alt={title}
            />
        </Link>
        <h1 className='font-heading text-center text-2xl sm:text-[16px] md:text-2xl text-gray-800 mt-[10px] whitespace-nowrap'>
            {title}
        </h1>
        <h1 className='text-center mt-[10px]'>
            <button onClick={() => navigate("/products")} className="bg-white tracking-widest font-text hover:bg-gray-100 text-gray-800 py-2 px-4 border border-gray-400">
                {shopTitle}
            </button>
        </h1>
    </div>)
}