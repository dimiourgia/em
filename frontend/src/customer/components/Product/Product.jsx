import React, { useEffect, useState } from "react";
import ProductCard from "./ProductCard";
import { useParams, useLocation } from "react-router-dom";
import { useDispatch, useSelector } from "react-redux";
import { findProducts } from "./../../../State/Product/Action";
import ChevronRightIcon from '@mui/icons-material/ChevronRight';
import ChevronLeftIcon from '@mui/icons-material/ChevronLeft';

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
  const productsPerPage = 9;

  const handleSizeFilter = (e) => {
    setFilterSize((prevFilterSize) => {
      const newFilterSize = {
        ...prevFilterSize,
        [e.target.name]: prevFilterSize[e.target.name] ? false : e.target.value,
      };
      return newFilterSize;
    });
  };

  useEffect(() => {
    if (products && products.length > 0) {
      let finalArray = [];

      const allFalse = Object.values(filterSize).every((value) => !value);

      if (allFalse) {
        finalArray = products;
      } else {
        if (filterSize.s) {
          finalArray = finalArray.concat(
            products.filter((el) => {
              const findValue = el.sizes.find((el1) => {
                let sizeName = el1.name.toLowerCase();
                return sizeName === "s" && el1.quantity > 0;
              });
              return findValue ? true : false;
            })
          );
        }
        if (filterSize.m) {
          finalArray = finalArray.concat(
            products.filter((el) => {
              const findValue = el.sizes.find((el1) => {
                let sizeName = el1.name.toLowerCase();
                return sizeName === "m" && el1.quantity > 0;
              });
              return findValue ? true : false;
            })
          );
        }
        if (filterSize.l) {
          finalArray = finalArray.concat(
            products.filter((el) => {
              const findValue = el.sizes.find((el1) => {
                let sizeName = el1.name.toLowerCase();
                return sizeName === "l" && el1.quantity > 0;
              });
              return findValue ? true : false;
            })
          );
        }
        if (filterSize.xl) {
          finalArray = finalArray.concat(
            products.filter((el) => {
              const findValue = el.sizes.find((el1) => {
                let sizeName = el1.name.toLowerCase();
                return sizeName === "xl" && el1.quantity > 0;
              });
              return findValue ? true : false;
            })
          );
        }
        if (filterSize["2xl"]) {
          finalArray = finalArray.concat(
            products.filter((el) => {
              const findValue = el.sizes.find((el1) => {
                let sizeName = el1.name.toLowerCase();
                return sizeName === "2xl" && el1.quantity > 0;
              });
              return findValue ? true : false;
            })
          );
        }
      }

      finalArray = [...new Set(finalArray)];
      setCopyProduct([...finalArray]);
      setCurrentPage(1); // Reset to first page on filter change
    }
  }, [filterSize, products]);

  useEffect(() => {
    if (products && products.length > 0) {
      const searchArray = products.filter((el) => {
        return (
          el.title.toLowerCase().includes(search.toLowerCase()) ||
          el.brand.toLowerCase().includes(search.toLowerCase())
        );
      });
      setCopyProduct([...searchArray]);
      setCurrentPage(1); // Reset to first page on search change
    }
  }, [search, products]);

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
      <div className="mb-[200px] mt-[100px] flex flex-wrap justify-center ">
        <button
          onClick={() => handlePageChange(currentPage - 1)}
          disabled={currentPage === 1}
          className="px-3 py-1 mx-1 border rounded hover:bg-gray-200 disabled:opacity-20"
        >
             <ChevronLeftIcon/>
          {/* Previous */}
         
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
          {/* Next */}
          
          <ChevronRightIcon/>
        </button>
      </div>
    );
  };

  return (
    <>
      <div className="mt-[100px] container mx-auto ">
        <h1 className="text-black font-medium font-ijk text-4xl text-center  mb-[50px]">
        <div className="flex justify-center items-center p-4 ">
                        <p className="p-2 px-4 group"  >
                        OUR STORE
                            <div className="bg-amber-500 h-[2px] w-0 group-hover:w-full transition-all duration-500"></div>
                        </p>
                    </div>
          
        </h1>
      </div>
      <div className="container mx-auto">
        <div className="grid gap-4 sm:grid-cols-12">
          <div className=" bg-white sm:col-span-3">
            <div className="max-w-screen-xl mx-auto px-5 bg-white ">
              <div className="grid divide-y divide-neutral-200 max-w-xl mx-auto mt-8">
                <div className="py-5">
                  <details className="group">
                    <summary className="flex justify-between items-center font-medium cursor-pointer list-none">
                      <span className="tracking-widest font-light text-base text-center">
                        SIZE
                      </span>
                      <span className="transition group-open:rotate-180">
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
                    <div className="text-neutral-600 mt-3 group-open:animate-fadeIn">
                      {["S", "M", "L", "XL", "2XL"].map((size) => (
                        <label
                          key={size}
                          className="pt-[20px] flex items-center"
                        >
                          <input
                            type="checkbox"
                            name={
                              size === "2xl" ? "2xl" : size.toLocaleLowerCase()
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
          </div>
          <div className="min-h-[100px] sm:col-span-9">
            <div className="flex flex-wrap justify-center bg-white py-5">
              {currentProducts &&
                currentProducts.map((product) => (
                  <ProductCard product={product} key={product._id} />
                ))}
            </div>
            {renderPagination()}
          </div>
        </div>
      </div>
    </>
  );
};

export default Product;
