import Card from './Card';
import AliceCarousel from 'react-alice-carousel';
import 'react-alice-carousel/lib/alice-carousel.css';
import ProductCard from '../Product/ProductCard';
import { useSelector } from 'react-redux';
import CarouselComponent from '../Carousel/Index';
import PlaceholderCard from './CardSkeleton';

const TopSellers = () => {

    const { products } = useSelector((state) => state.products);

    const finalProducts = [...products, ...products, ...products]

    console.log(products, 'products')

    return (
        <div className=''>
            <div className='w-full md:w-1/3 px-3 md:mb-[20px]' id={'top-selling-section'}>
                <h1 className='font-roboto tracking-wide text-center text-3xl  text-black'>
                    <div className="flex justify-center items-center p-4 ">
                        <p className="p-2 px-4 group "  >
                            TOP SELLING
                            <div className="bg-amber-500 h-[2px] w-full transition-all duration-500"></div>
                        </p>
                    </div>
                </h1>
            </div>

            

            <div className="container pb-24 mx-auto px-4 mt-4">
                <div className="w-full mx-auto">
                    {finalProducts != undefined && finalProducts !=null && finalProducts.length >0 && 
                        <CarouselComponent isDummy={false} key='top_sellers_carousel' items={finalProducts.map(product=><Card product={product}/>)} />
                    }

                    {finalProducts === undefined || finalProducts ==null || finalProducts.length == 0 &&
                            <CarouselComponent isDummy={true} key='top_sellers_carousel' items={[<PlaceholderCard/>, <PlaceholderCard/>, <PlaceholderCard/>]} />
                    }
                </div>
            </div>

        </div>
    )
}

export default TopSellers
