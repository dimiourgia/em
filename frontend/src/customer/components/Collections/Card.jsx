import { Link, useNavigate } from "react-router-dom"

export default function({title, shopTitle, imageSrc, id}){

    const navigate = useNavigate();

    return(<div className='relative ml-0 rounded-lg'>
        <Link to={`/collections/${id}`}>
            <div className="overflow-hidden rounded-lg shadow-lg group">
                <img
                    className="transition-transform duration-300 ease-in-out transform group-hover:scale-110"
                    src={imageSrc}
                    alt={title}/> 
                <div class="absolute rounded-lg inset-0 bg-black opacity-0 group-hover:opacity-10 transition-opacity duration-300"></div>
            </div> 
        </Link>
        <div className='absolute bg-gray-100/60 pb-4 bottom-0 w-full'>
            <h1 className='font-roboto text-center text-2xl sm:text-[16px] md:text-2xl text-gray-800 mt-[10px] whitespace-nowrap'>
                {title}
            </h1>
            <h1 className='text-center font-robot mt-[10px]'>
                <button onClick={() => navigate("/products")} className="bg-white tracking-widest font-roboto hover:bg-heading-bg text-gray-800 py-2 px-4 border border-gray-400">
                    {shopTitle}
                </button>
            </h1>
        </div>
    </div>)
}