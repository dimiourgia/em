import { useEffect, useState } from "react";
import { RadioGroup } from "@headlessui/react";
import { useNavigate, useParams } from "react-router-dom";
import { useDispatch, useSelector } from "react-redux";
import { findProductsById } from "../../../State/Product/Action";
import { addItemToCart } from "../../../State/Cart/Action";

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

  const handelAddToCart = () => {
    const data = { productId: params.productId, size: selectedSize.name };
    dispatch(addItemToCart(data));
    navigate("/cart");
  };

  useEffect(() => {
    const data = { productId: params.productId };
    dispatch(findProductsById(data));
  }, [params.productId, dispatch]);

  return (
    <div className="bg-white">
      <div className="pt-6">
        <div className="mt-[100px] grid gap-4 sm:grid-cols-12 container mx-auto w-full md:w-1/3 px-3 md:mb-0">
          <div className="min-h-[100px] sm:col-span-8">
            {/* Image gallery */}
            <div className="flex flex-col items-center">
              <div className="overflow-hidden rounded-lg max-w-[30rem] max-h-[35rem]">
                <img
                  src={product?.imageUrl}
                  alt={product?.title}
                  className="h-full w-full object-cover object-center"
                />
              </div>
            </div>
          </div>
          <div className="min-h-[100px] sm:col-span-4 border border-gray-200 p-[20px] rounded">
            <div>
              <h1 className="text-lg lg:text-2xl font-abc text-gray-900 opacity-60 pt-1">
                {product?.title}
              </h1>
              <h1 className="tracking-wider font-abc font-light">
                {product?.brand}
              </h1>
            </div>

            {/* Options */}
            <div className="mt-4 lg:row-span-3 lg:mt-0">
              <h2 className="sr-only">Product information</h2>
              <div className="flex space-x-5 items-center text-gray-900 pt-6">
                <p className="text-sm font-abc">
                  {"₹" + product?.discountedPrice}
                </p>
                <p className="font-abc line-through text-sm">
                  {"₹" + product?.price}
                </p>
                <p className="text-red-500 text-sm font-abc">
                  {(
                    (1 - product?.discountedPrice / product?.price) *
                    100
                  ).toFixed(0) + "% off"}
                </p>
              </div>

              <form className="mt-10">
                {/* Sizes */}
                <div className="mt-10">
                  <div className="flex items-center justify-between">
                    <h3 className="tracking-widest font-semibold text-base text-center">
                      Size
                    </h3>
                  </div>

                  <h2 className="text-red-600">
                    {selectedSize === "" ? "Please select size" : ""}
                  </h2>

                  <RadioGroup
                    value={selectedSize}
                    onChange={setSelectedSize}
                    className="mt-4"
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
                                    checked ? "border-indigo-500" : "border-transparent",
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

                <button
                  disabled={selectedSize === "" ? true : false}
                  onClick={handelAddToCart}
                  type="submit"
                  className={`${selectedSize !== "" ? "cursor-pointer" : "cursor-not-allowed"
                    } w-full mt-[50px] text-white hover:bg-gray-800 bg-gray-900 focus:outline-none focus:ring-4 focus:ring-gray-300 font-medium text-sm px-5 py-2.5 me-2 mb-2 dark:bg-gray-800 dark:hover:bg-gray-700 dark:focus:ring-gray-700 dark:border-gray-700`}
                >
                  Add to cart
                </button>
              </form>
            </div>
          </div>
        </div>

        {/* description */}
        <div className="container mx-auto w-full md:w-1/3 px-3 md:mb-0 py-10 lg:col-span-2 lg:col-start-1 lg:pb-16 lg:pr-8 lg:pt-6">
          {/* Description and details */}
          <div className="mt-[50px]">
            <h3 className="sr-only">Description</h3>


            <div className="space-y-6 font-abc text-lg">
              <p>{product?.description}</p>
            </div>
          </div>

          <div className="mt-10">

            {/* <h2 className="mb-[20px] text-lg font-medium tracking-widest text-gray-900 font-abc uppercase">
              <div className="flex justify-center items-center p-4 ">
                <p className="p-2 px-4 group"  >
                  Highlights
                  <div className="bg-amber-500 h-[2px] w-0 group-hover:w-full transition-all duration-500"></div>
                </p>
              </div>

            </h2> */}
  

            <div className="mt-4">
              <ul
                role="list"
                className="list-disc space-y-2 pl-4 text-base font-abc"
              >
                {products?.product?.highlights?.map((highlight) => (
                  <li key={highlight} className="text-gray-400">
                    <span className="text-gray-600">{highlight}</span>
                  </li>
                ))}
              </ul>
            </div>
          </div>

          <div className="mt-10">
            <h2 className="mb-[20px] text-lg font-medium tracking-widest text-gray-900 font-abc uppercase">
              <div className="flex justify-center items-center p-4 ">
                <p className="p-2 px-4 group"  >
                  PRODUCT  Highlights
                  <div className="bg-amber-500 h-[2px] w-0 group-hover:w-full transition-all duration-500"></div>
                </p>
              </div>



            </h2>
            <div className=" ">
              <p className="font-thin text-gray-700  text-sx  font-para ">
                Designed with the freedom to flow with ease ~ Our signature Kyra Mini Dress in a palette of florals and Sumac spice. Handmade using the traditional method of block printing, an ancient Indian artistry that has been passed down through generations. Her billowed sleeves and full flowing skirt reminisce with the magic of golden hues and sunset haze. Lovingly made with gratitude for our beautiful Mother Earth.
                <br /><br />
                Material ~ 100% Cotton. Depending on each individual, some find the material sheer. A slip may be worn underneath if desired.
                <br /><br />
                Garment Care ~ We recommend a gentle, cold water hand wash using natural detergents, and hang drying in the shade. Handcrafted garments are delicate, however, designed to last when treated mindfully with love and care.
                <br /><br />
                Hand block printed with love in India.



              </p>

            </div>

            <div className="mt-4 space-y-6">
              <p className="text-base font-abc text-gray-600">
                {products?.product?.details}
              </p>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
