import { useEffect, useRef, useState } from "react";
import { RadioGroup } from "@headlessui/react";
import { useNavigate, useParams } from "react-router-dom";
import { useDispatch, useSelector } from "react-redux";
import { findProducts, findProductsById } from "../../../State/Product/Action";
import { addItemToCart } from "../../../State/Cart/Action";
import ZoomComponent from "./ZoomComponent";
import SkeletonProductDetails from "./SkeletonProductDetails";
import ErrorComponent from "../Error/Index";
import Button from "../Button/Index";
import ProductCard from "../Product/ProductCard";

function classNames(...classes) {
  return classes.filter(Boolean).join(" ");
}

export default function ProductDetails({setOpenAuthModal}) {
  const [selectedSize, setSelectedSize] = useState("");
  const navigate = useNavigate();
  const params = useParams();
  const dispatch = useDispatch();
  const products = useSelector((state) => state.products);
  const product = products.product;
  const [activeImage, setActiveImage] = useState("");
  const suggestedProducts = products.products.filter(p=>!p.isExclusive && p._id !== product?._id);
  const [suggestedProductIndices, setSuggestedProductIndices] = useState([]);

  useEffect(()=>{
    if(products.products.length > 0){
        const length = products?.products?.filter(p=>!p.isExclusive).filter(p=>p?._id != product?._id)?.length;
        if(length > 0){
          let randomeInices = [];
          while(randomeInices.length <6){
            const i = Math.floor(Math.random()*length);
            if(!randomeInices.includes(i)){
              randomeInices.push(i);
            }
          }

        console.log(randomeInices)
        setSuggestedProductIndices(randomeInices);
      }
    }
  },[products])

  useEffect(()=>{
    if(product?.imageUrl)
    setActiveImage(product.imageUrl[0]);
  },[product])

  useEffect(()=>{
    if(!products || !products.products || products.products.length == 0){
      dispatch(findProducts());
    }
  },[])

  const handleActiveImageShow = (imgUrl) => {
    setActiveImage(imgUrl);
  };

  const cart = useSelector(state=>state.cart);
  const {user} = useSelector(state=>state.auth);
  const pd_ref = useRef(null);

  console.log('cart', cart);

  const handelAddToCart = () => {
    const data = { productId: params.productId, size: selectedSize.name };
    const jwt = localStorage.getItem('jwt');
    console.log(jwt, 'jwt')
    console.log('cart', cart);
    console.log('user', user);
    if (jwt && user != null) {
      console.log('redirecting to cart....')
      dispatch(addItemToCart(data));
      navigate('/cart');
    } else {
      localStorage.setItem('productToAdd', params.productId);
      setOpenAuthModal(true);
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

  return (<div className="min-h-[calc(100vh-10px)">
    {!products.loading  && false && !products.error && <div className="bg-white pt-4">
      <div className="md:flex justify-center">
        {/* Image gallery */}
        <div ref={pd_ref} className="mx-4 sm:w-[calc(75%+80px)] md:w-[calc(50%+80px)] lg:w-[calc(33%+80px)] xl:w-[calc(25%+80px)]">
          <div className="">
            <ZoomComponent handleActiveImageShow={handleActiveImageShow} imageUrl={product?.imageUrl} src={activeImage || product?.imageUrl[0]} />
          </div>
        </div>


        <div className="mx-4 mx-1 my-2 sm:my-0 px-5 py-2  sm:w-3/4 md:w-1/2 lg:w-1/3 xl:w-1/4 bg-white">
          <div className="text-lg lg:text-xl text-neutral-600 font-semibold mb-4">{product?.title}</div>
          {/* Options */}
          <div className="">
            <div className="flex space-x-2 items-center pt-6">
              <p className="text-md font-sans">
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
            <div className="opacity-60">inclusive of all taxes</div>

            <form className="mt-4 md:0">
              {/* Sizes */}
              <div className="md:mt-4">
                <div className="flex items-center justify-between">
                  <div className="text-neutral-800 font-semibold">Size</div>
                  <h2 className="font-text text-red-600">
                    {selectedSize === "Out of stock" ? "Out of stock" : selectedSize === "" ? "Please select size" : ""}
                  </h2>
                </div>

                <RadioGroup
                  value={selectedSize}
                  onChange={setSelectedSize}
                  className="mt-2"
                  disabled={selectedSize === "Out of stock"}
                >
                  <RadioGroup.Label className="sr-only">
                    Choose a size
                  </RadioGroup.Label>
                  <div className="grid grid-cols-5 gap-4">
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
                            active ? "ring-.5 ring-indigo-500" : "",
                            "group relative flex items-center justify-center rounded-md border px-0 py-2 text-sm font-medium uppercase hover:bg-gray-50 focus:outline-none sm:flex-1"
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
              <div className="mt-6 font-roboto">
                <div className="text-neutral-800 font-semibold mb-2">Key Features</div>
                <div className="grid grid-cols-2 text-neutral-600">
                  <div className="text-neutral-400">Material</div>
                  <div className="">{toTitleCase(product?.material)}</div>
                </div>
                <div className="grid grid-cols-2 text-neutral-600">
                  <div className="text-neutral-400">Sleeve Style</div>
                  <div className="">{toTitleCase(product?.sleeve_style)}</div>
                </div>
                <div className="grid grid-cols-2 text-neutral-600">
                  <div className="text-neutral-400">Neck</div>
                  <div className="">{toTitleCase(product?.neck_type)}</div>
                </div>
              </div>

              {/* description */}
              <div className="mt-6 w-full max-h-fit">
                <div className="text-neutral-800 font-semibold mb-2">Product Description</div>
                <div className="relative max-h-[200px] mx-auto text-neutral-500 font-sans tracking-wide text-normal overflow-y-scroll no-scrollbar pt-1">
                  <p className="text-justify">{product?.description}</p>
                  <p className="py-2">{product?.modelAttireDescription}</p>
                  <div className="sticky bottom-0 w-full h-4 blur bg-white border border-[0px]"></div>
                </div>
              </div>

              <div className="w-full mt-10">
              <Button
                classname='w-full'
                text='Add to Cart'
                imageSrc='/images/cart_white.svg'
                onClick={handelAddToCart} 
                disabled={selectedSize === "" || selectedSize === "Out of stock"} />
              </div>
            </form>
          </div>
        </div>
      </div>

      {/* description */}
      <hr className="mt-4 text-gray-50 bg-gray-50"/>
      
      <div className="w-full flex flex-col justify-center items-center gap-10 mt-10 mb-10">
        {/* <div
          style={{width: pd_ref?.current?.offsetWidth*2-80}} 
          className={`mt-4 py-4 pb-16`}>
          <h3 className="font-text flex justify-center text-justify text-semibold text-2xl opacity-75 mx-auto p-2">Product Description</h3>
          <div className="mx-auto px-4 text-neutral-600 font-sans tracking-wide text-normal">
            <p className="">{product?.description}</p>
            <p className="py-2">{product?.modelAttireDescription}</p>
          </div>
        </div> */}
        
        <h3 className="flex  justify-center text-justify text-semibold text-2xl opacity-75 mx-auto p-2 border-b">Suggested Products</h3>
        <div className="w-full flex flex-wrap gap-4 justify-center items-center px-4">
          <div className="grid grid-cols-2 sm:grid-cols-3 lg:grid-cols-4 gap-y-6 gap-x-2">
            {suggestedProducts
            .filter((p,i)=> suggestedProductIndices.includes(i))
            .map(product=> <ProductCard product={product} />)}
          </div>
        </div>
      </div>

    </div>}

    {(products.loading || true) && <SkeletonProductDetails/>}

    {products.error && <ErrorComponent errorMessage={products.error} />}

      </div>);
}


function toTitleCase(str) {
  if(!str) return;
  return str.replace(
    /\w\S*/g,
    text => text.charAt(0).toUpperCase() + text.substring(1).toLowerCase()
  );
}