import { useEffect, useState } from "react";
import { RadioGroup } from "@headlessui/react";
import { useNavigate, useParams } from "react-router-dom";
import { useDispatch, useSelector } from "react-redux";
import { findProductsById } from "../../../State/Product/Action";
import { addItemToCart } from "../../../State/Cart/Action";
import ZoomComponent from "./ZoomComponent";

function classNames(...classes) {
  return classes.filter(Boolean).join(" ");
}

export default function ProductDetails() {
  const [selectedSize, setSelectedSize] = useState("");
  const navigate = useNavigate();
  const params = useParams();
  const dispatch = useDispatch();
  const products = useSelector((state) => state.products);
  const product = products.product;
  const [activeImage, setActiveImage] = useState("");

  const handleActiveImageShow = (imgUrl) => {
    setActiveImage(imgUrl);
  };

  const cart = useSelector(state=>state.cart);
  const {user} = useSelector(state=>state.auth);

  console.log('cart', cart);

  const handelAddToCart = () => {
    const data = { productId: params.productId, size: selectedSize.name };
    const jwt = localStorage.getItem('jwt');
    console.log(jwt, 'jwt')
    console.log('cart', cart);
    console.log('user', user);
    if (jwt && user != null) {
      dispatch(addItemToCart(data));
      navigate('/cart');
    } else {
      localStorage.setItem('productToAdd', params.productId);
      navigate('/login');
    }
  };

  useEffect(() => {
    const data = { productId: params.productId };
    dispatch(findProductsById(data));
  }, [params.productId, dispatch]);

  useEffect(() => {
    if (product?.sizes) {
      const availableSizes = product.sizes.filter(size => size.quantity > 0);
      if (availableSizes.length > 0) {
        const sizeOrder = ["S", "M", "L", "XL", "XXL"];
        const defaultSize = sizeOrder.find(sizeName =>
          availableSizes.some(size => size.name === sizeName)
        ) || availableSizes[0].name;
        setSelectedSize(availableSizes.find(size => size.name === defaultSize));
      } else {
        setSelectedSize("Out of stock");
      }
    }
  }, [product]);

  return (
    <div className="bg-white pt-6">
      <div className="md:flex justify-center">
        {/* Image gallery */}
        <div className="mx-4 sm:w-3/4 md:w-1/2 lg:w-1/3 xl:w-1/4">
          <div className="">
            {/* <img
              src={activeImage || product?.imageUrl[0]}
              alt={product?.title}
              className="p-1 h-full w-full object-contain"
            /> */}
            <ZoomComponent src={activeImage || product?.imageUrl[0]} />
          </div>

          <div className="flex space-x-1 px-1">
            {product?.imageUrl?.map((image, index) => (
              <div
                key={index}
                className="h-24 w-20 md:h-26 md:w-24 rounded cursor-pointer"
                onMouseEnter={() => handleActiveImageShow(image)}
              >
                <img
                  src={image}
                  className="w-full h-full object-contain"
                  alt={`Product ${index + 1}`}
                />
              </div>
            ))}
          </div>
        </div>


        <div className="mx-5 m-1 p-5 sm:w-3/4 md:w-1/2 lg:w-1/3 xl:w-1/4 bg-white">
          <h1 className="text-lg lg:text-2xl font-roboto font-medium text-black opacity-70">
            {product?.title}
          </h1>
          <h1 className="font-roboto text-red-700 opacity-70">
            {product?.brand}
          </h1>

          {/* Options */}
          <div className="">
            <div className="flex space-x-2 items-center pt-6">
              <p className="text-md font-text font-semibold">
                {"₹" + product?.discountedPrice}
              </p>
              {product?.discountedPrice != product?.price && <div className="flex space-x-2">
                <p className="font-text line-through text-sm opacity-50 font-semibold">
                  {"₹" + product?.price}
                </p>
                <p className="text-green-500 text-sm font-text">
                  {(
                    (1 - product?.discountedPrice / product?.price) *
                    100
                  ).toFixed(0) + "% off"}
                </p>
              </div>}
            </div>
            <div className="opacity-50">inclusive of all taxes</div>

            <form className="mt-4 md:0">
              {/* Sizes */}
              <div className="md:mt-4">
                <div className="flex items-center justify-between">
                  <h3 className="font-roboto text-center">
                    Size
                  </h3>
                  <h2 className="font-text text-red-600">
                    {selectedSize === "Out of stock" ? "Out of stock" : selectedSize === "" ? "Please select size" : ""}
                  </h2>
                </div>

                <RadioGroup
                  value={selectedSize}
                  onChange={setSelectedSize}
                  className="mt-4"
                  disabled={selectedSize === "Out of stock"}
                >
                  <RadioGroup.Label className="sr-only">
                    Choose a size
                  </RadioGroup.Label>
                  <div className="grid grid-cols-4 gap-4 sm:grid-cols-8 lg:grid-cols-4">
                    {product?.sizes?.map((size) => (
                      <RadioGroup.Option
                        key={size.name}
                        value={size}
                        disabled={!size.quantity}
                        className={({ active }) =>
                          classNames(
                            size.quantity
                              ? "cursor-pointer bg-white text-gray-900 shadow-sm"
                              : "cursor-not-allowed bg-gray-50 text-gray-200",
                            active ? "ring-2 ring-indigo-500" : "",
                            "group relative flex items-center justify-center rounded-md border py-3 px-4 text-sm font-medium uppercase hover:bg-gray-50 focus:outline-none sm:flex-1 sm:py-6"
                          )
                        }
                      >
                        {({ active, checked }) => (
                          <>
                            <RadioGroup.Label as="span">
                              {size.name}
                            </RadioGroup.Label>
                            {size.quantity ? (
                              <span
                                className={classNames(
                                  active ? "border" : "border-2",
                                  checked ? "border-gray-600" : "border-transparent",
                                  "pointer-events-none absolute -inset-px rounded-md"
                                )}
                                aria-hidden="true"
                              />
                            ) : (
                              <span
                                aria-hidden="true"
                                className="pointer-events-none absolute -inset-px rounded-md border-2 border-gray-200"
                              >
                                <svg
                                  className="absolute inset-0 h-full w-full stroke-2 text-gray-200"
                                  viewBox="0 0 100 100"
                                  preserveAspectRatio="none"
                                  stroke="currentColor"
                                >
                                  <line
                                    x1={0}
                                    y1={100}
                                    x2={100}
                                    y2={0}
                                    vectorEffect="non-scaling-stroke"
                                  />
                                </svg>
                              </span>
                            )}
                          </>
                        )}
                      </RadioGroup.Option>
                    ))}
                  </div>
                </RadioGroup>
              </div>

              {/* highlights */}
              <div className="p-3 mt-4 font-roboto opacity-70">
                <div className="text-neutral-400 font-semibold">Key Features</div>
                <div className="grid grid-cols-2 text-neutral-600">
                  <div className="text-neutral-400">Material</div>
                  <div className="">{product?.material}</div>
                </div>
                <div className="grid grid-cols-2 text-neutral-600">
                  <div className="text-neutral-400">Sleeve Style</div>
                  <div className="">{product?.sleeve_style}</div>
                </div>
                <div className="grid grid-cols-2 text-neutral-600">
                  <div className="text-neutral-400">Neck</div>
                  <div className="">{product?.neck_type}</div>
                </div>
              </div>

              <button
                disabled={selectedSize === "" || selectedSize === "Out of stock"}
                onClick={handelAddToCart}
                type="submit"
                className={`${selectedSize !== "" && selectedSize !== "Out of stock" ? "cursor-pointer" : "cursor-not-allowed"
                  } flex gap-4 items-center text-white justify-center w-full mt-6 hover:bg-blue-700 bg-blue-400 focus:outline-none focus:ring-4 focus:ring-gray-300 font-medium text-sm px-5 py-2.5 me-2 mb-2 dark:bg-gray-800 dark:hover:bg-gray-700 dark:focus:ring-gray-700 dark:border-gray-700`}
              >
                <img src="/images/cart_white.svg" />
                Add to cart
              </button>
            </form>
          </div>
        </div>
      </div>

      {/* description */}
      <div className="m-3 p-4 pb-16 bg-gray-50">
          <h3 className="font-text flex justify-center text-semibold text-2xl opacity-75 mx-auto p-2">Product Description</h3>
          <div className="mx-auto md:w-1/2 text-neutral-600 font-sans-serif tracking-wide text-lg">
            <p className="flex items-center justify-center">{product?.description}</p>
            <p className="py-2">{product?.modelAttireDescription}</p>
          </div>
          <h3 className="font-text flex justify-center text-semibold text-2xl opacity-75 mx-auto p-2">Shipping and Returns</h3>
          <div className="mx-auto md:w-1/2 font-serif ">
            <p className="flex items-center justify-center ">Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua. Ut enim ad minim veniam, quis nostrud exercitation ullamco laboris nisi ut aliquip ex ea commodo consequat.</p>
            <h4 className="p-2 text-lg">Eligibilty</h4>
            <p className="">Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua. Ut enim ad minim veniam, quis nostrud exercitation ullamco laboris nisi ut aliquip ex ea commodo consequat.</p>
            <h6 className="p-2 text-lg">Return Process</h6>
            <p>Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua. Ut enim ad minim veniam, quis nostrud exercitation ullamco laboris nisi ut aliquip ex ea commodo consequat.</p>
          </div>
        </div>
      </div>
  );
}
