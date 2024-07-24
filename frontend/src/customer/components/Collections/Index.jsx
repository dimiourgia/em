import Card from './Card';
import CompanyCarousel from '../CompanyCarousel/CompanyCarousel';
//import './carousel.css'
import AliceCarousel from 'react-alice-carousel';
import 'react-alice-carousel/lib/alice-carousel.css';
import { useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { findCollections, findCollectionById } from '../../../State/Collection/Action';


const collections = [
    {
        name: 'Radiant Rebellion',
        thumbnail: 'images/23.webp',
    },
    {
        name: 'Empowered Ember',
        thumbnail: 'images/24.webp',
    },
    {
        name: 'Minted Resolve',
        thumbnail: 'images/25.webp',
    },
    {
        name: 'Eclipsed Empowerment',
        thumbnail: 'images/25.webp',
    },
    {
        name: 'Stripes of Strength',
        thumbnail: 'images/25.webp',
    }
]


const responsive = {
    0: { items: 1 },
    568: { items: 2 },
    1024: { items: 3 },
};



const Collections = () => {
    const dispatch = useDispatch();
    const collections = useSelector((state)=>state.collections).collections;

    useEffect(()=>{
        console.log(collections)
    },[collections])

    useEffect(()=>{
        dispatch(findCollections());
    },[dispatch]);

    return (
        <>
            <div className='w-full md:w-1/3 px-3 md:mb-0' id='collection-section'>
                <h1 className='font-ijk text-center text-4xl  text-black  mt-[100px] '>
                    <div className="flex justify-center items-center p-4 ">
                        <p className="p-2 px-4 group cursor-pointer"  >
                        Our Collections
                            <div className="bg-amber-500 h-[2px] w-full group-hover:w-[50%] transition-all duration-500"></div>
                        </p>
                    </div>
                </h1>
            </div>
            <div className="container mx-auto px-4">
                <div className="w-full lg:w-4/5 mx-auto">
                   { collections != null && collections!= undefined && collections.length >0 && <AliceCarousel 
                        mouseTracking
                        responsive={responsive}
                        controlsStrategy="alternate"
                        items={collections.length >0 && collections?.map(collection=><Card title={collection.name} imageSrc={collection?.imageUrl[0]} />)}
                    />}
                </div>
            </div>
            
            {/* <div className='w-[100%] px-[12px] lg:w-[60%] lg:px-0 mx-auto grid gap-5 mt-[100px] sm:grid-cols-3'>
               {collections.map(collection=><Card title={collection.name} shopTitle={'SHOP NOW'} imageSrc={collection.thumbnail} />)}
            </div> */}
        </>
    )
}

export default Collections
