import Card from './Card';
import AliceCarousel from 'react-alice-carousel';
import 'react-alice-carousel/lib/alice-carousel.css';
import ProductCard from '../Product/ProductCard';
import { useSelector } from 'react-redux';


const products = [
    {
        name: 'Mini Dress',
        thumbnail: 'images/23.webp',
    },
    {
        name: 'Midi Dress',
        thumbnail: 'images/24.webp',
    },
    {
        name: 'Maxi Dress',
        thumbnail: 'images/25.webp',
    }
]

const responsive = {
    0: { items: 1 },
    568: { items: 2 },
    1024: { items: 3 },
};

const TopSellers = () => {

    const { products } = useSelector((state) => state.products);

    const finalProducts = [...products, ...products, ...products]

    console.log(products, 'products')

    return (
        <>
            <div className='w-full md:w-1/3 px-3 md:mb-0'>
                <h1 className='font-ijk text-center text-4xl  text-black  mt-[100px] '>
                    <div className="flex justify-center items-center p-4 ">
                        <p className="p-2 px-4 group cursor-pointer"  >
                        Top Sellers
                            <div className="bg-amber-500 h-[2px] w-full group-hover:w-[50%] transition-all duration-500"></div>
                        </p>
                    </div>
                </h1>
            </div>

            <div className="container mx-auto px-4">
                <div className="w-full lg:w-4/5 mx-auto">
                    <AliceCarousel 
                        mouseTracking
                        responsive={responsive}
                        controlsStrategy="alternate"
                        items={finalProducts.map(product=><ProductCard product={product}/>)}
                    />
                </div>
            </div>

            {/* <div className='w-[60%] mx-auto grid gap-5 mt-[100px] sm:grid-cols-3'>
               {products.map(product=><Card title={product.name} shopTitle={'SHOP NOW'} imageSrc={product.thumbnail} />)}
            </div> */}
        </>
    )
}

export default TopSellers
