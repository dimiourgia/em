import React, { useEffect } from 'react';
import ProductCard from './ProductCard';
import { useParams, useLocation } from 'react-router-dom';
import { useDispatch, useSelector } from 'react-redux';
import { findProducts } from './../../../State/Product/Action';

const MainProduct = () => {
    const param = useParams();
    const dispatch = useDispatch();
    const { products } = useSelector(state => state.products);

    const location = useLocation();
    const decodedQueryString = decodeURIComponent(location.search);
    const searchParams = new URLSearchParams(decodedQueryString);

    const colorValue = searchParams.get("color");
    const sizeValue = searchParams.get("size");
    const priceValue = searchParams.get("price");
    const discount = searchParams.get("discount") || 0;
    const sortValue = searchParams.get("sort") || "price_low";
    const pageNumber = searchParams.get("page") || 1;
    const stock = searchParams.get("stock");

    useEffect(() => {
        const [minPrice, maxPrice] = priceValue ? priceValue.split("-").map(Number) : [0, 100000];

        const data = {
            category: param.level,
            colors: colorValue ? colorValue.split(",") : [],
            sizes: sizeValue ? sizeValue.split(",") : [],
            minPrice,
            maxPrice,
            minDiscount: discount,
            sort: sortValue,
            pageNumber,
            pageSize: 30,
            stock,
        };
        dispatch(findProducts(data));
    }, [param.level, colorValue, sizeValue, priceValue, discount, sortValue, pageNumber, stock, dispatch]);

    return (
        <>
            <div className='mt-[100px]'>
                <h1 className='text-black font-medium text-4xl text-center font-abc'>
                    Online Boutique
                </h1>
            </div>
            <div className='container mx-auto'>
                <div className="grid gap-4 sm:grid-cols-12">
                    <div className="min-h-[100px] bg-white sm:col-span-3">
                        <div>


                            <div className="max-w-screen-xl mx-auto px-5 bg-white min-h-sceen">

                                <div className="grid divide-y divide-neutral-200 max-w-xl mx-auto mt-8">
                                    <div className="py-5">
                                        <details className="group">
                                            <summary className="flex justify-between items-center font-medium cursor-pointer list-none">
                                                <span className='tracking-widest font-light text-base text-center'> SIZE</span>
                                                <span className="transition group-open:rotate-180">
                                                    <svg fill="none" height="24" shape-rendering="geometricPrecision" stroke="currentColor" stroke-linecap="round" stroke-linejoin="round" stroke-width="1.5" viewBox="0 0 24 24" width="24"><path d="M6 9l6 6 6-6"></path>
                                                    </svg>
                                                </span>
                                            </summary>
                                            <p className="text-neutral-600 mt-3 group-open:animate-fadeIn">
                                                <label className="pt-[20px]" style={{ display: 'flex', alignItems: 'center' }}>
                                                    <input type="checkbox" name="checkbox" value="value" style={{ marginRight: '10px' }} />
                                                    S
                                                </label>
                                                <label className="" style={{ display: 'flex', alignItems: 'center' }}>
                                                    <input type="checkbox" name="checkbox" value="value" style={{ marginRight: '8px' }} />
                                                    M
                                                </label>
                                                <label className="" style={{ display: 'flex', alignItems: 'center' }}>
                                                    <input type="checkbox" name="checkbox" value="value" style={{ marginRight: '10px' }} />
                                                    L
                                                </label>
                                                <label className="" style={{ display: 'flex', alignItems: 'center' }}>
                                                    <input type="checkbox" name="checkbox" value="value" style={{ marginRight: '8px' }} />
                                                    XL
                                                </label>
                                                <label className="" style={{ display: 'flex', alignItems: 'center' }}>
                                                    <input type="checkbox" name="checkbox" value="value" style={{ marginRight: '8px' }} />
                                                    2XL
                                                </label>
                                            </p>
                                        </details>
                                    </div>
                                </div>
                            </div>


                        </div>
                    </div>
                    <div className="min-h-[100px] bg-teal-500 sm:col-span-9">
                        <div className='flex flex-wrap justify-start bg-white py-5'>
                            {products && products.map((product) => (
                                <ProductCard product={product} key={product._id} />
                            ))}
                        </div>
                    </div>

                </div>
            </div>
        </>

    );
};

export default MainProduct;