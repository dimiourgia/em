import Card from './Card';
import AliceCarousel from 'react-alice-carousel';
import 'react-alice-carousel/lib/alice-carousel.css';
import ProductCard from '../Product/ProductCard';
import { useSelector } from 'react-redux';
import CarouselComponent from '../Carousel/Index';
import PlaceholderCard from './CardSkeleton';
import { useNavigate } from 'react-router-dom';
import ShallowButton from '../ShallowButton/Index';
import { useEffect, useState } from 'react';

const TopSellers = () => {
    const topSellers = ['66bb47413da21f8a8b16100b',
        '66bb47c53da21f8a8b161014',
        '66bb4f583da21f8a8b16106e',
        '66bb4c133da21f8a8b161053',
        '66bb4fc33da21f8a8b161077']
    const products = useSelector((state) => state.products).products.filter(p=>topSellers.includes(p._id));
 
    

    const defaultImageIndex = [2, 6, 1, 0, 3]
    const navigate = useNavigate();


    console.log(products, 'products')

    return (
        <div className='mb-24' id='top-selling-section'>
            <div className="container pb-0 mx-auto px-4">
                <div className="flex w-full items-start justify-start">
                    <p className="p-2 px-4 group font-roboto tracking-wide text-center text-xl sm:text-2xl md:text-2xl  text-neutral-700"  >
                        TOP SELLING
                        {/* <div className="bg-amber-500 h-[2px] w-full transition-all duration-500"></div> */}
                    </p>
                </div>
                
                <div className="w-full mx-auto">
                    {products != undefined && products !=null && products.length >0 && 
                        <CarouselComponent isDummy={false} key='top_sellers_carousel' items={products.map((product,index)=><Card product={product} defaultImageIndex={defaultImageIndex[index]??0}/>)} />
                    }

                    {products === undefined || products ==null || products.length == 0 &&
                        <CarouselComponent isDummy={true} key='top_sellers_carousel' items={[<PlaceholderCard/>, <PlaceholderCard/>, <PlaceholderCard/>, <PlaceholderCard/>, <PlaceholderCard/>]} />
                    }
                </div>
            </div>
            
            <h1 className='font-roboto text-center mt-[10px] pb-10'>
                <ShallowButton shopTitle={'VIEW ALL'} onClick={() => navigate("/products")} />
            </h1>
            
        </div>
    )
}

export default TopSellers
