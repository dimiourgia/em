import { Link, useNavigate } from "react-router-dom"
import ShallowButton from '../ShallowButton/Index';

export default function({title, shopTitle, imageSrc, id}){

    const navigate = useNavigate();

    return(<div className='relative ml-1 sm:ml-4 rounded-lg'>
        <Link to={`/collections/${id}`}>
            <div className="overflow-hidden rounded-lg sm:shadow-lg group">
                <img
                    className="transition-transform duration-300 ease-in-out transform group-hover:scale-110"
                    src={imageSrc}
                    alt={title}/> 
                <div class="absolute rounded-lg inset-0 bg-black opacity-0 group-hover:opacity-10 transition-opacity duration-300"></div>
            </div> 
        </Link>
        <div className='absolute bg-gray-100/60 pb-4 bottom-0 w-full'>
            <h1 className='font-roboto text-center text-[18px] sm:text-[22px] lg:tex-2xl text-gray-800 mt-[10px] whitespace-nowrap'>
                {title}
            </h1>
            <h1 className='text-center font-robot mt-[10px]'>
                <ShallowButton shopTitle={shopTitle} onClick={() => navigate(`/collections/${id}`)}/>
            </h1>
        </div>
    </div>)
}