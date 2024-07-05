import React, { useEffect, useState } from "react";
import ProductCard from "./ProductCard";
import { useParams, useLocation } from "react-router-dom";
import { useDispatch, useSelector } from "react-redux";
import { findProducts } from "./../../../State/Product/Action";
import ChevronRightIcon from '@mui/icons-material/ChevronRight';
import ChevronLeftIcon from '@mui/icons-material/ChevronLeft';
import { Typography } from "@mui/material";

const Product = ({ search }) => {
  const param = useParams();
  const dispatch = useDispatch();
  const { products } = useSelector((state) => state.products);

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

  const [copyProduct, setCopyProduct] = useState([]);
  const [currentPage, setCurrentPage] = useState(1);
  const productsPerPage = 15;

  const handleSizeFilter = (e) => {
    setFilterSize((prevFilterSize) => ({
      ...prevFilterSize,
      [e.target.name]: !prevFilterSize[e.target.name],
    }));
  };

  useEffect(() => {
    const filterProducts = () => {
      let finalArray = [];

      // Apply size filters
      const allFalse = Object.values(filterSize).every((value) => !value);

      if (allFalse) {
        finalArray = products;
      } else {
        Object.keys(filterSize).forEach((sizeKey) => {
          if (filterSize[sizeKey]) {
            finalArray = finalArray.concat(
              products.filter((el) => {
                const findValue = el.sizes.find(
                  (el1) => el1.name.toLowerCase() === sizeKey && el1.quantity > 0
                );
                return findValue ? true : false;
              })
            );
          }
        });
      }

      finalArray = [...new Set(finalArray)];

      // Apply search filters
      if (search) {
        finalArray = finalArray.filter((el) => {
          return (
            el.title.toLowerCase().includes(search.toLowerCase()) ||
            el.brand.toLowerCase().includes(search.toLowerCase())
          );
        });
      }

      setCopyProduct([...finalArray]);
      setCurrentPage(1);
    };

    if (products && products.length > 0) {
      filterProducts();
    }
  }, [filterSize, search, products]);

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
  }, [
    param.level,
    colorValue,
    sizeValue,
    priceValue,
    discount,
    sortValue,
    pageNumber,
    dispatch,
  ]);

  const totalPages = Math.ceil(copyProduct.length / productsPerPage);
  const indexOfLastProduct = currentPage * productsPerPage;
  const indexOfFirstProduct = indexOfLastProduct - productsPerPage;
  const currentProducts = copyProduct.slice(
    indexOfFirstProduct,
    indexOfLastProduct
  );

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
              currentPage === number ? "text-white  bg-gray-900 focus:outline-none focus:ring-4 focus:ring-gray-300 font-medium text-sm px-5 py-2.5 dark:bg-gray-800 dark:hover:bg-gray-700 dark:focus:ring-gray-700 dark:border-gray-700" : ""
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

  return (
    <div className="min-h-80 bg- md:min-h-screen pb-16">
      <div className="flex items-center justify-center p-3">
        <div className="bg-gray-100 m-2 px-4 py-2 rounded-md shadow-md">
          <Typography sx={{fontFamily:'heading', fontSize:{lg:"40px", md:"32px", sm:"24px", xs:"20px"}}} variant="h4">
            Online Boutique
          </Typography>
        </div>
      </div>
      <div className="container mx-auto">
        <div className="flex">
          <div className="px-4 pt-5 bg-white">
            <div className="grid divide-y divide-neutral-200 max-w-xl mx-auto">
              <div className="py-5">
                <details className="group" open>
                  <summary className="font-heading flex justify-between items-center cursor-pointer list-none">
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
                          className="mr-2"
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
            <div className="flex flex-wrap rounded-lg items-center w-auto justify-center">
              {currentProducts.length === 0 ? (
                  <p className="min-h-80 text-center font-heading text-xl flex p-2 flex-col items-center justify-center">
                  <span className="block">We don't have that item.</span>
                  <span className="block">Check out our other collections!</span>
                </p>
                
              ) : (
                currentProducts.map((product) => (
                  <ProductCard product={product} key={product._id} />
                ))
              )}
            </div>
          </div>
        </div>
      </div>
      {renderPagination()}
    </div>
  );
};

export default Product;
