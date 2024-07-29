import Card from './Card';
import CompanyCarousel from '../CompanyCarousel/CompanyCarousel';
//import './carousel.css'
import AliceCarousel from 'react-alice-carousel';
import 'react-alice-carousel/lib/alice-carousel.css';
import { useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { findCollections, findCollectionById } from '../../../State/Collection/Action';
import CarouselComponent from '../Carousel/Index';
import PlaceholderCard from './CardSkeleton';


const responsive = {
    0: { items: 1 },
    568: { items: 2 },
    1024: { items: 3 },
};

const placeholderItems = ['first', 'second', 'third'];

const Collections = () => {
    const dispatch = useDispatch();
    const collections = useSelector((state)=>state.collections).collections??[];

    useEffect(()=>{
        console.log(collections, 'collections')
    },[collections])

    return (
        <div className='bg-gray-50 min-h-[calc(100vh-100px)]'>
            <div className='w-full mt-[295px] md:w-1/3 px-3 md:mb-0' id='collection-section'>
                <h1 className='font-ijk text-center text-3xl  text-black mt-4'>
                    <div className="flex justify-center items-center p-4 ">
                        <p className="p-2 px-4 group font-roboto tracking-tight font-semibold">
                            OUR COLLECTIONS
                            {/* <div className="bg-amber-500 h-[2px] w-full transition-all duration-500"></div> */}
                        </p>
                    </div>
                </h1>
            </div>

            <div className="container mx-auto px-4 mt-4">
                <div className="w-full mx-auto">
                   { collections != null && collections!= undefined && collections.length >0 &&      
                        <CarouselComponent items={ 
                            collections?.map(collection=> 
                                <Card 
                                    title={collection.name} 
                                    shopTitle={'SHOP NOW'} 
                                    imageSrc={collection?.imageUrl[0]} 
                                    id={collection?._id} />) 
                            } 
                            />
                    }

                    {collections == null || collections == undefined || collections.length == 0 &&
                        <CarouselComponent key="collections_carousel" items={ [<PlaceholderCard />, <PlaceholderCard />, <PlaceholderCard />] } 
                            />}
                </div>
            </div>
            
            {/* <div className='w-[100%] px-[12px] lg:w-[60%] lg:px-0 mx-auto grid gap-5 mt-[100px] sm:grid-cols-3'>
               {collections.map(collection=><Card title={collection.name} shopTitle={'SHOP NOW'} imageSrc={collection.thumbnail} />)}
            </div> */}
        </div>
    )
}

export default Collections
