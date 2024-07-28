import { Link, useNavigate } from "react-router-dom"

export default function({title, shopTitle, imageSrc, id}){

    const navigate = useNavigate();

    return(<div className='relative ml-0 sm:ml-2'>
        <Link to={`/collections/:${id}`}>
            <img
                className=""
                src={imageSrc}
                alt={title}
            />
        </Link>
        <div className='absolute bg-black/40 pb-4 bottom-0 w-full'>
            <h1 className='font-heading text-center text-2xl sm:text-[16px] md:text-2xl text-[#f5f5dc] mt-[10px] whitespace-nowrap'>
                {title}
            </h1>
            <h1 className='text-center mt-[10px]'>
                <button onClick={() => navigate("/products")} className="bg-white tracking-widest font-text hover:bg-gray-100 text-gray-800 py-2 px-4 border border-gray-400">
                    {shopTitle}
                </button>
            </h1>
        </div>
    </div>)
}