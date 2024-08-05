import Card from './Card';
import AliceCarousel from 'react-alice-carousel';
import 'react-alice-carousel/lib/alice-carousel.css';
import ProductCard from '../Product/ProductCard';
import { useSelector } from 'react-redux';
import CarouselComponent from '../Carousel/Index';
import PlaceholderCard from './CardSkeleton';
import { useNavigate } from 'react-router-dom';

const TopSellers = () => {

    const { products } = useSelector((state) => state.products);
    const defaultImageIndex = [2, 6, 1, 0, 3]
    const navigate = useNavigate();


    console.log(products, 'products')

    return (
        <div className=''>
            <div className='w-full md:w-1/3 px-3' id={'top-selling-section'}>
                <h1 className='font-roboto tracking-wide text-center text-2xl md:text-2xl  text-black'>
                    <div className="flex justify-center items-center">
                        <p className="p-2 px-4 group "  >
                            TOP SELLING
                            {/* <div className="bg-amber-500 h-[2px] w-full transition-all duration-500"></div> */}
                        </p>
                    </div>
                </h1>
            </div>

            <div className="container pb-0 mx-auto px-4">
                <div className="w-full mx-auto">
                    {products != undefined && products !=null && products.length >0 && 
                        <CarouselComponent isDummy={false} key='top_sellers_carousel' items={products.map((product,index)=><Card product={product} defaultImageIndex={defaultImageIndex[index]??0}/>)} />
                    }

                    {products === undefined || products ==null || products.length == 0 &&
                            <CarouselComponent isDummy={true} key='top_sellers_carousel' items={[<PlaceholderCard/>, <PlaceholderCard/>, <PlaceholderCard/>, <PlaceholderCard/>, <PlaceholderCard/>]} />
                    }
                </div>
            </div>
            
            <h1 className='font-roboto text-center mt-[10px] pb-24'>
                <button onClick={() => navigate("/products")} className="bg-white tracking-widest hover:bg-heading-bg text-sm text-gray-800 py-2 px-4 border border-gray-400">
                    {'VIEW ALL'}
                </button>
            </h1>
            
        </div>
    )
}

export default TopSellers
