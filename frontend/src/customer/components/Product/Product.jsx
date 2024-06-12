import React, { useEffect, useState } from "react";
import ProductCard from "./ProductCard";
import { useParams, useLocation } from "react-router-dom";
import { useDispatch, useSelector } from "react-redux";
import { findProducts } from "./../../../State/Product/Action";

const Product = ({ search }) => {
  console.log("ye to mangkal hai ", search);
  const param = useParams();
  const dispatch = useDispatch();
  const { products } = useSelector((state) => state.products);

  const [filterSize, setFilterSize] = useState({
    s: false,
    m: false,
    l: false,
    xl: false,
    "2xl" : false,
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

//   const handleSizeFilter = (e) => {
//     setFilterSize({
//       ...filterSize,
//       [e.target.name]: e.target.value,
//     });
//     console.log(filterSize);
//   };
const handleSizeFilter = (e) => {
    setFilterSize((prevFilterSize) => {
      const newFilterSize = {
        ...prevFilterSize,
        [e.target.name]: prevFilterSize[e.target.name] ? false : e.target.value,
      };
      console.log(newFilterSize);
      return newFilterSize;
    });
  };
  
  
  console.log(filterSize);
  useEffect(() => {
    if (products && products.length > 0) {
      let finalArray = [];
  
      // Check if all filterSize values are false
      const allFalse = Object.values(filterSize).every(value => !value);
  
      if (allFalse) {
        finalArray = products; // Set to original products if all filters are false
      } else {
        if (filterSize.s) {
          finalArray = finalArray.concat(products.filter((el) => {
            const findValue = el.sizes.find((el1) => {
              let sizeName = el1.name.toLowerCase();
              return sizeName === "s" && el1.quantity > 0;
            });
            return findValue ? true : false;
          }));
        }
        if (filterSize.m) {
          finalArray = finalArray.concat(products.filter((el) => {
            const findValue = el.sizes.find((el1) => {
              let sizeName = el1.name.toLowerCase();
              return sizeName === "m" && el1.quantity > 0;
            });
            return findValue ? true : false;
          }));
        }
        if (filterSize.l) {
          finalArray = finalArray.concat(products.filter((el) => {
            const findValue = el.sizes.find((el1) => {
              let sizeName = el1.name.toLowerCase();
              return sizeName === "l" && el1.quantity > 0;
            });
            return findValue ? true : false;
          }));
        }
        if (filterSize.xl) {
          finalArray = finalArray.concat(products.filter((el) => {
            const findValue = el.sizes.find((el1) => {
              let sizeName = el1.name.toLowerCase();
              return sizeName === "xl" && el1.quantity > 0;
            });
            return findValue ? true : false;
          }));
        }
        if (filterSize["2xl"]) {
          finalArray = finalArray.concat(products.filter((el) => {
            const findValue = el.sizes.find((el1) => {
              let sizeName = el1.name.toLowerCase();
              return sizeName === "2xl" && el1.quantity > 0;
            });
            return findValue ? true : false;
          }));
        }
      }
      
      // Remove duplicates from finalArray
      finalArray = [...new Set(finalArray)];
  
      setCopyProduct([...finalArray]);
    }
  }, [filterSize, products]);
  

//   useEffect(() => {
//     // if ((!filterSize.s) && (!filterSize.m) && (!filterSize.l) && (!filterSize.xl) && (!filterSize.dxl)){
//     //     setCopyProduct(products)
//     // }
//     if (products && products.length > 0) {
//         let finalArray = [];
//         if (filterSize.s) {
//             finalArray = products.filter((el)=>{
//                 const findValue = el.sizes.find((el1) => {
//                           let sizeName = el1.name.toLowerCase()
//                           return sizeName == "s" && el1.quantity> 0;
//                 });
//                 return findValue? true : false;
//             })
//           } 
//           console.log("ye to s siz ehai ", filterSize.s, finalArray)
//           if (filterSize.m) {
//             finalArray = products.filter((el)=>{
//                 const findValue = el.sizes.find((el1) => {
//                           let sizeName = el1.name.toLowerCase()
//                           return sizeName == "m" && el1.quantity> 0;
//                 });
//                 return findValue? true : false;
//             })
//           } 
//           if (filterSize.l) {
//             finalArray = products.filter((el)=>{
//                 const findValue = el.sizes.find((el1) => {
//                           let sizeName = el1.name.toLowerCase()
//                           return sizeName == "l" && el1.quantity> 0;
//                 });
//                 return findValue? true : false;
//             })

//           }
//           if (filterSize.xl) {
//             finalArray = products.filter((el)=>{
//                 const findValue = el.sizes.find((el1) => {
//                           let sizeName = el1.name.toLowerCase()
//                           return sizeName == "xl" && el1.quantity> 0;
//                 });
//                 return findValue? true : false;
//             })
//           } 
//           if (filterSize["2xl"]) {
//             finalArray = products.filter((el)=>{
//                 const findValue = el.sizes.find((el1) => {
//                           let sizeName = el1.name.toLowerCase()
//                           return sizeName == "2xl" && el1.quantity> 0;
//                 });
//                 return findValue? true : false;
//             })
//           }
//     //   const searchArray = products.filter((el) => {
//     //     const findValue = el.sizes.find((el1) => {
//     //       let returnedValue = "";
//     //       let sizeName = el1.name.toLowerCase();
//     //       console.log("12345 ye to ", sizeName)
//     //       if (filterSize.s) {
//     //         returnedValue = sizeName == filterSize.s;
//     //       } else if (filterSize.m) {
//     //         returnedValue = sizeName == filterSize.m;
//     //       } else if (filterSize.l) {
//     //         returnedValue = sizeName == filterSize.l;
//     //       } else if (filterSize.xl) {
//     //         returnedValue = sizeName == filterSize.xl;
//     //       } else if (filterSize.dxl) {
//     //         returnedValue = sizeName == filterSize.dxl;
//     //       }
//     //       return returnedValue;
//     //     });
//     //     return (
//     //         findValue? true : false 
//     //     );
//     //   });
//       setCopyProduct([...finalArray]);
//     }
//   }, [filterSize, products]);

  useEffect(() => {
    if (products && products.length > 0) {
      const searchArray = products.filter((el) => {
        return (
          el.title.toLowerCase().includes(search.toLowerCase()) ||
          el.brand.toLowerCase().includes(search.toLowerCase())
        );
      });
      setCopyProduct([...searchArray]);
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

  return (
    <>
      <div className="mt-[100px]">
        <h1 className="text-black font-medium text-4xl text-center font-abc">
          Online Boutique
        </h1>
      </div>
      <div className="container mx-auto">
        <div className="grid gap-4 sm:grid-cols-12">
          <div className="min-h-[100px] bg-white sm:col-span-3">
            <div className="max-w-screen-xl mx-auto px-5 bg-white min-h-sceen">
              <div className="grid divide-y divide-neutral-200 max-w-xl mx-auto mt-8">
                <div className="py-5">
                  <details className="group">
                    <summary className="flex justify-between items-center font-medium cursor-pointer list-none">
                      <span className="tracking-widest font-light text-base text-center">
                        {" "}
                        SIZE
                      </span>
                      <span className="transition group-open:rotate-180">
                        <svg
                          fill="none"
                          height="24"
                          shape-rendering="geometricPrecision"
                          stroke="currentColor"
                          stroke-linecap="round"
                          stroke-linejoin="round"
                          stroke-width="1.5"
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
                          className="pt-[20px]"
                          style={{ display: "flex", alignItems: "center" }}
                        >
                          <input
                            type="checkbox"
                            name={
                              size == "2xl" ? "dxl" : size.toLocaleLowerCase()
                            }
                            onChange={handleSizeFilter}
                            value={size}
                            style={{ marginRight: "10px" }}
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
              {copyProduct &&
                copyProduct.map((product) => (
                  <ProductCard product={product} key={product._id} />
                ))}
            </div>
          </div>
        </div>
      </div>
    </>
  );
};

export default Product;
