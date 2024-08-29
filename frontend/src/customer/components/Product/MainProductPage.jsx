import React, { useEffect, useState } from 'react';
import ProductCard from './ProductCard';
import { useParams, useLocation } from 'react-router-dom';
import { useDispatch, useSelector } from 'react-redux';
import { findProducts } from './../../../State/Product/Action';
import Placeholder from './ProductSkeleton';

const MainProduct = () => {
    const param = useParams();
    const dispatch = useDispatch();
    const products_selector = useSelector(state => state.products)
    const products_ = products_selector.products;

    const [products, setProducts] = useState(products_);

    useEffect(()=>{
      console.log(products_selector, 'products state');
    },[products_selector])

    const location = useLocation();
    const decodedQueryString = decodeURIComponent(location.search);
    const searchParams = new URLSearchParams(decodedQueryString);
    const [filterSize, setFilterSize] = useState([]);
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

    const handleSizeFilter = (e) => {
      console.log(e.target.name, e.target.checked, 'size checked')
      setFilterSize((prevFilterSize) => {
        if(prevFilterSize.includes(e.target.name)) return prevFilterSize.filter(size=>size != e.target.name)
        return [...prevFilterSize, e.target.name]
      });
    };

    useEffect(()=>{
      console.log(products_);
      setProducts(products_);
    },[products_])

    useEffect(()=>{
      console.log(filterSize, 'filtered size ... given here');
      if(filterSize.length > 0 && products_ && products_.length > 0){
        const filteredProducts = products_.filter(product=>{
          return filterSize.every(selectedSize=> product.sizes.find(sz=>sz.name.toLowerCase() == selectedSize.toLowerCase()).quantity > 0)
        })
      }else{
        setProducts(products_);
      }
    },[filterSize])

    return (<>
        { products_selector && !products_selector.loading && <div className="min-h-80 bg- md:min-h-screen pb-16 px-4 sm:px-6 pt-4">
            <div className="container mx-auto">
              <p className='w-full flex items-center justify-center text-font text-lg'>Products</p>

              <div className="flex mt-10">
                <div className="px-4 pt-5 bg-white hidden">
                  <div className="grid divide-y divide-neutral-200 max-w-xl mx-auto">
                    <div className="py-5">
                      <details className="group" open>
                        <summary className="font-roboto flex justify-between items-center cursor-pointer list-none space-x-4">
                          <span>
                            SIZE
                          </span>
                          <span className=" transition group-open:rotate-180">
                            <svg
                              fill="none"
                              height="24"
                              shape-rendering="geometricPrecision"
                              stroke="currentColor"
                              strokeLinecap="round"
                              strokeLinejoin="round"
                              strokeWidth="1.5"
                              viewBox="0 0 24 24"
                              width="24"
                            >
                              <path d="M6 9l6 6 6-6"></path>
                            </svg>
                          </span>
                        </summary>
                        <div className="text-neutral-600 group-open:animate-fadeIn">
                          {["S", "M", "L", "XL", "2XL"].map((size) => (
                            <label
                              key={size}
                              className="pt-[20px] flex items-center"
                            >
                              <input
                                type="checkbox"
                                name={
                                  size === "2xl" ? "2xl" : size.toLowerCase()
                                }
                                onChange={handleSizeFilter}
                                value={size}
                                className="mr-4"
                              />
                              {size}
                            </label>
                          ))}
                        </div>
                      </details>
                    </div>
                  </div>
                </div>
                <div className="sm:col-span-10 w-full">
                  <div className="flex flex-wrap rounded-lg items-center sm:items-start justify-center w-auto">
                    {products.length === 0 ? (
                        <p className="min-h-80 text-center font-heading text-lg sm:text-xl flex p-2 flex-col items-center justify-center">
                        <span className="block">We don't have anything available here.</span>
                        <span className="block">Check out our other collections!</span>
                      </p>
                      
                    ) : (<div className="grid grid-cols-2 sm:grid-cols-3 lg:grid-cols-4 gap-y-6 gap-x-2">
                      {products.map((product, index) => (
                        <ProductCard product={product} key={product._id} defaultImageIndex={0} />
                      ))}
                    </div>)}
                  </div>
                </div>
              </div>
            </div>
            {/* {renderPagination()} */}
          </div> }
          
          {products_selector.loading && <Placeholder/> }
    </>);
};

export default MainProduct;