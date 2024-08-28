import React, { useEffect, useState } from "react";
import ProductCard from "./ProductCard";
import { useParams, useLocation } from "react-router-dom";
import { useDispatch, useSelector } from "react-redux";
import { findProducts } from "./../../../State/Product/Action";
import ChevronRightIcon from '@mui/icons-material/ChevronRight';
import ChevronLeftIcon from '@mui/icons-material/ChevronLeft';
import { Typography } from "@mui/material";
import { findCollections } from "../../../State/Collection/Action";
import Placeholder from "./ProductSkeleton";

const Product = ({ search, collectionId}) => {
  const param = useParams();
  const dispatch = useDispatch();
  const  products  = useSelector((state) => state.products).products.filter(product=>product.collections == collectionId);
  const currentProducts = useSelector((state) => state.products).products.filter(product=>product.collections == collectionId);
  const { collections } = useSelector((state) => state.collections);
  const [collection, setCollection] = useState({});
  const defaultImageIndex = [2, 6, 1, 0, 3]

  const [filterSize, setFilterSize] = useState({
    s: false,
    m: false,
    l: false,
    xl: false,
    "2xl": false,
  });

  const location = useLocation();
  const searchParams = new URLSearchParams(decodeURIComponent(location.search));
  const colorValue = searchParams.get("color");
  const sizeValue = searchParams.get("size");
  const priceValue = searchParams.get("price");
  const discount = searchParams.get("discount") || 0;
  const sortValue = searchParams.get("sort") || "price_low";
  const pageNumber = searchParams.get("page") || 1;

  const [copyProduct, setCopyProduct] = useState(products);
  const [currentPage, setCurrentPage] = useState(1);
  const productsPerPage = 15;

  const handleSizeFilter = (e) => {
    console.log(e.target.name, e.target.checked, 'size checked')
    setFilterSize((prevFilterSize) => {
      if(prevFilterSize.includes(e.target.name)) return prevFilterSize.filter(size=>size != e.target.name)
      return [...prevFilterSize, e.target.name]
    });
  };

  useEffect(()=>{
    if(products.length == 0){
      const [minPrice, maxPrice] = priceValue
      ? priceValue.split("-").map(Number)
      : [0, 100000];

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
      };
       dispatch(findProducts(data));
    }
  },[]);

  useEffect(()=>{
    setCollection(collections?.find(collection => collection._id == collectionId));
    if(collections== undefined || collections.length == 0){
      dispatch(findCollections());
    }
  },[collections])


  useEffect(()=>{
    console.log(filterSize, 'filtered size ... given here');
  },[filterSize])

 

  const totalPages = Math.ceil(copyProduct.length / productsPerPage);
  const indexOfLastProduct = currentPage * productsPerPage;
  const indexOfFirstProduct = indexOfLastProduct - productsPerPage;
  
  useEffect(() => {
    const [minPrice, maxPrice] = priceValue
      ? priceValue.split("-").map(Number)
      : [0, 100000];

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
    };
  
    dispatch(findProducts(data));

 
    //  currentProducts = products.slice(indexOfFirstProduct, indexOfFirstProduct);
  }, [
    param.level,
    colorValue,
    sizeValue,
    priceValue,
    discount,
    sortValue,
    pageNumber,
  ]);

  const handlePageChange = (pageNumber) => {
    setCurrentPage(pageNumber);
  };

  const renderPagination = () => {
    const pageNumbers = [];
    for (let i = 1; i <= totalPages; i++) {
      pageNumbers.push(i);
    }

    return (
      <div className="flex justify-center ">
        <button
          onClick={() => handlePageChange(currentPage - 1)}
          disabled={currentPage === 1}
          className="px-3 py-1 mx-1 border rounded hover:bg-gray-200 disabled:opacity-20"
        >
          <ChevronLeftIcon/>
        </button>
        {pageNumbers.map((number) => (
          <button
            key={number}
            onClick={() => handlePageChange(number)}
            className={`px-3 py-1 mx-1 border rounded hover:bg-gray-200 ${
              currentPage === number ? "text-white  bg-gray-700 focus:outline-none focus:ring-4 focus:ring-gray-300 font-medium text-sm px-5 py-2.5 dark:bg-gray-800 dark:hover:bg-gray-700 dark:focus:ring-gray-700 dark:border-gray-700" : ""
            }`}
          >
            {number}
          </button>
        ))}
        <button
          onClick={() => handlePageChange(currentPage + 1)}
          disabled={currentPage === totalPages}
          className="px-3 py-1 mx-1 border rounded hover:bg-gray-200 disabled:opacity-20"
        >
          <ChevronRightIcon/>
        </button>
      </div>
    );
  };

  return (<>
    { collection != undefined && <div className="min-h-80 bg- md:min-h-screen pb-16 px-4 sm:px-6">
      <div className="container mx-auto">
        
        <div className="mt-24 bg-[#fff]  border-b border-b-[1px] border-gray-100 py-4 text-neutral-800  px-4 sm:px-6 font-sans w-full flex flex-col gap-4 items-center justify-center">
          <h1 className="text-xl sm:text-2xl">{collection?.name}</h1>
          <p className="text-sm text-justify sm:text-[16px] text-neutral-600">{collection?.description}</p>
        </div>

        <div className="flex mt-14">
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
            <div className="flex flex-wrap rounded-lg items-center sm:items-start justify-center w-full justify-start">
              {currentProducts.length === 0 ? (
                  <p className="min-h-80 text-center font-heading text-lg sm:text-xl flex p-2 flex-col items-center justify-center">
                  <span className="block">We don't have anything available here currently.</span>
                  <span className="block">Check out our other collections!</span>
                </p>
                
              ) : (<div className="grid grid-cols-2 sm:grid-cols-3 lg:grid-cols-4 gap-y-6 gap-x-2">
                {currentProducts.map((product, index) => (
                  <ProductCard product={product} key={product._id} defaultImageIndex={defaultImageIndex[index]??0} />
                ))}
                </div>)}
            </div>
          </div>
        </div>
      </div>
      {/* {renderPagination()} */}
    </div> }
    
    {collection == undefined && <Placeholder/> }

    </>);
};

export default Product;
