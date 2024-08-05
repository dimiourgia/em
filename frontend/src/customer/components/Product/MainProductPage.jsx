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

    const handleSizeFilter = ()=>{

    }

    return (<>
        { products != undefined && <div className="min-h-80 bg- md:min-h-screen pb-16 px-6 pt-4">
            <div className="container mx-auto">
      
              <div className="flex mt-10">
                <div className="px-4 pt-5 bg-white">
                  <div className="grid divide-y divide-neutral-200 max-w-xl mx-auto">
                    <div className="py-5">
                      <details className="group" open>
                        <summary className="font-heading flex justify-between items-center cursor-pointer list-none space-x-4">
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
                  <div className="flex flex-wrap rounded-lg items-start w-auto">
                    {products.length === 0 ? (
                        <p className="min-h-80 text-center font-heading text-lg sm:text-xl flex p-2 flex-col items-center justify-center">
                        <span className="block">We don't have anything available here.</span>
                        <span className="block">Check out our other collections!</span>
                      </p>
                      
                    ) : (
                      products.map((product, index) => (
                        <ProductCard product={product} key={product._id} defaultImageIndex={0} />
                      ))
                    )}
                  </div>
                </div>
              </div>
            </div>
            {/* {renderPagination()} */}
          </div> }
          
          {products == undefined && <Placeholder/> }
    </>);
};

export default MainProduct;