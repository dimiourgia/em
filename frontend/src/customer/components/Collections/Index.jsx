import Card from './Card';
import 'react-alice-carousel/lib/alice-carousel.css';
import { useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { findCollections} from '../../../State/Collection/Action';
import CarouselComponent from '../Carousel/Index';
import PlaceholderCard from './CardSkeleton';


const order = ['Stripes of Strength', 'Empowered Ember', 'Minted Resolve', 'Eclipsed Ascendancy', 'Radiant Rebellion'];

function sortObjectsByOrder(objects, order) {
    const orderMap = new Map(order.map((item, index) => [item, index]));

    objects.sort((a, b) => {
        return (orderMap.get(a.name) || 0) - (orderMap.get(b.name) || 0);
    });

    return objects;
}

const Collections = () => {
    const dispatch = useDispatch();
    const collections = useSelector((state)=>state.collections).collections??[];

    useEffect(()=>{
        console.log(collections, 'collections')
        if(collections?.length < 1){
            dispatch(findCollections());
        }
    },[])

    return (
        <div className='mt-20 bg-white'>
            
            <div className='w-full -mt-[20px] md:w-1/3 px-3 md:mb-0 bg-white z-[10]' id='collection-section'>
                <h1 className='font-ijk text-center text-2xl  text-black mt-4'>
                    <div className="flex justify-start items-center pl-10 w-full">
                        <p className="p-2 px-4 group font-roboto tracking-wide">
                            OUR COLLECTIONS
                            {/* <div className="bg-amber-500 h-[2px] w-full transition-all duration-500"></div> */}
                        </p>
                    </div>
                </h1>
            </div>

            <div className="container pb-6 mx-auto px-4 mt-4">
                <div className="w-full mx-auto">
                   { collections != null && collections!= undefined && collections.length >0 &&      
                        <CarouselComponent showControls={false} items={ 
                            sortObjectsByOrder(collections, order)?.map(collection=> 
                                <Card 
                                    title={collection.name} 
                                    shopTitle={'SHOP NOW'} 
                                    imageSrc={collection?.imageUrl[0]} 
                                    id={collection?._id} />) 
                            } 
                            />
                    }

                    {collections == null || collections == undefined || collections.length == 0 &&
                        <CarouselComponent isDummy={true} key="collections_carousel" items={[<PlaceholderCard/>, <PlaceholderCard/>, <PlaceholderCard/>, <PlaceholderCard/>, <PlaceholderCard/>] } 
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
