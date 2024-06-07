import React, { useState, useEffect } from 'react';
import ProductCard from './ProductCard';
import { useParams, useLocation } from 'react-router-dom';
import { useDispatch, useSelector } from 'react-redux';
import { findProducts } from './../../../State/Product/Action';
import { Pagination } from '@mui/material';

const Product = () => {
    const { level } = useParams();
    const dispatch = useDispatch();
    const products = useSelector(state => state.products.products);
    const { search } = useLocation();

    const searchParams = new URLSearchParams(decodeURIComponent(search));
    const getParam = (param, defaultValue) => searchParams.get(param) || defaultValue;

    const [selectedSizes, setSelectedSizes] = useState([]);

    const handleSizeChange = (size) => {
        setSelectedSizes(prevSizes =>
            prevSizes.includes(size) ? prevSizes.filter(s => s !== size) : [...prevSizes, size]
        );
    };

    useEffect(() => {
        const data = {
            category: level,
            colors: getParam("color", "").split(","),
            sizes: selectedSizes,
            minPrice: Number(getParam("price", "0-100000").split("-")[0]),
            maxPrice: Number(getParam("price", "0-100000").split("-")[1]),
            minDiscount: Number(getParam("discount", 0)),
            sort: getParam("sort", "price_low"),
            pageNumber: Number(getParam("page", 1)),
            pageSize: 30,
            stock: getParam("stock"),
            searchQuery: getParam("search", ""),
        };
        dispatch(findProducts(data));
    }, [level, search, selectedSizes, dispatch]);

    // useEffect(() => {
    //     if (selectedSizes.length > 0) {
    //         const data = {
    //             category: level,
    //             sizes: selectedSizes,
    //         };
    //         dispatch(findProducts(data));
    //     }
    // }, [selectedSizes, dispatch, level]);

    const filteredProducts = products.filter(product =>
        selectedSizes.length === 0 || product.sizes.some(size => selectedSizes.includes(size.name))
    );

    return (
        <div className='mt-[100px]'>
            <h1 className='text-black font-medium text-4xl text-center font-abc'>Online Boutique</h1>
            <div className='container mx-auto'>
                <div className="grid gap-4 sm:grid-cols-12">
                    <div className="min-h-[100px] bg-white sm:col-span-3">
                        <div className="max-w-screen-xl mx-auto px-5 bg-white min-h-screen">
                            <div className="grid divide-y divide-neutral-200 max-w-xl mx-auto mt-8">
                                <FilterGroup title="SIZE">
                                    {['S', 'M', 'L', 'XL', '2XL'].map(size => (
                                        <Checkbox label={size} key={size} onChange={handleSizeChange} />
                                    ))}
                                </FilterGroup>
                            </div>
                        </div>
                    </div>
                    <div className="min-h-[100px] sm:col-span-9">
                        <div className='flex flex-wrap justify-center bg-white py-5'>
                            {filteredProducts.map((product) => (
                                <ProductCard product={product} key={product._id} />
                            ))}
                        </div>
                    </div>
                </div>

                <section className='w-full px-[3.6rem]'>
                    <div className='px-4 py-5 flex justify-center'>
                    {/* <Pagination count={products.product?.totalPages} color="secondary" onChange={handelPaginationChange}/> */}
                    </div>
                </section>
            </div>
        </div>
    );
};

const FilterGroup = ({ title, children }) => (
    <div className="py-5">
        <details className="group">
            <summary className="flex justify-between items font-medium cursor-pointer list-none">
                <span className='tracking-widest font-light text-base text-center'>{title}</span>
                <span className="transition group-open:rotate-180">
                    <svg fill="none" height="15" stroke="currentColor" strokeLinecap="round" strokeLinejoin="round" strokeWidth="1.5" viewBox="0 0 24 24" width="15">
                        <path d="M6 9l6 6 6-6"></path>
                    </svg>
                </span>
            </summary>
            <div className="text-neutral-600 mt-3 group-open:animate-fadeIn">
                {children}
            </div>
        </details>
    </div>
);

const Checkbox = ({ label, onChange }) => (
    <label className="pt-[0px]" style={{ display: 'flex', alignItems: 'left' }}>
        <input
            type="checkbox"
            name="checkbox"
            value={label}
            style={{ marginRight: '10px' }}
            onChange={(e) => onChange(e.target.value)}
        />
        {label}
    </label>
);

export default Product;
