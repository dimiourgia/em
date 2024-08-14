import React, { useEffect, useState } from "react";
import CartItem from "./CartItem";
import Button from "../Button/Index";
import { useFetcher, useNavigate } from "react-router-dom";
import { useDispatch, useSelector } from "react-redux";
import { getCart } from "../../../State/Cart/Action";
import Loading from "../Loader/Index";
import ErrorComponent from "../Error/Index";
import { applyCouponToCart, removeCouponFromCart } from "../../../State/Cart/Action";
import { getCoupons } from "../../../State/Coupon/Action";

const Cart = ({setOpenAuthModal}) => {
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const jwt = localStorage.getItem("jwt");
  const cart = useSelector((state) => state.cart);

  const offers_selector = useSelector((state)=>state.coupon);
  const offers = offers_selector?.coupons?.filter(c=> !c.usedAt && new Date(c.expirationDate) - new Date() > 0 );

  console.log("cart ", cart);

  useEffect(() => {
    if (jwt) {
      dispatch(getCart(jwt));
    } else {
      setOpenAuthModal(true);
    }
  }, [dispatch, jwt]);

  // Check if the cart is empty
  const isCartEmpty = !cart.cartItems || cart.cartItems.length === 0;

  const [appliedCouponCode, setAppliedCouponCode] = useState(null);

  const applyCouponCode=(couponId)=>{
    dispatch(applyCouponToCart(jwt, couponId));
  }

  useEffect(()=>{
    if(offers){
      const coupon = offers.find(c=>c._id == cart.cart?.couponId);
      setAppliedCouponCode(coupon)
    }
  },[cart.cart?.couponId, offers])

  const removeCouponCode=()=>{
    dispatch(removeCouponFromCart(jwt));
  }

  useEffect(()=>{
    console.log(offers, 'offers from cart page');
  },[offers])

  useEffect(()=>{
    dispatch(getCoupons());
  },[])

  useEffect(()=>{
    console.log(appliedCouponCode, 'appliedCouponCode from cart')
  },[appliedCouponCode])

  

  return (
    <div className="cart-container min-h-screen">
      <div className="sticky top-[60px] flex justify-center items-center p-4 w-full bg-white z-[10] shadow-sm">
        <p className="p-2 font-heading px- text-3xl"  >
        Cart
        </p>
      </div>

      {!cart.loading && !cart.error && <div>
        {isCartEmpty ? (
          // Display full-page layout with centered message when the cart is empty
          <div className="empty-cart-message min-h-screen flex items-center justify-center text-center">
            <div>
              <p className="text-2xl text-gray-500 font-semibold">Your cart is empty</p>
              <Button
                text='Go to Shop'
                onClick={() => navigate("/products")}
              >
              </Button>
            </div>
          </div>
        ) : (
          // Original page layout when the cart is not empty
          <div className=" lg:grid grid-cols-3 lg:px-16 relative pb-8">
            <div className="lg:col-span-2 rounded-lg">
              {cart.cartItems.map((item, index) => (
                <div className="p-2">
                <CartItem key={index} item={item} showButton={true} />
                </div>
              ))}
            </div>
            <div className="lg:px-2 p-2 flex flex-col gap-2">
              <div className="border border-gray-200 p-5 bg-white rounded-sm">
                <p className="font-semibold text-neutral-700 font-roboto">Price Details</p>
                <hr />

                <div className="space-y-2 font-roboto text-normal flex flex-col justify-center items-center">
                  <div className="flex justify-between pt-3 text-black w-full">
                    <span>Price ({cart.cart?.totalItem} item)</span>
                    <span>₹{cart.cart?.totalPrice}</span>
                  </div>

                  <div className="flex justify-between w-full">
                  <div className="flex flex-col">
                    <span>Discount</span>
                    {cart.cart?.referralDiscountPercentage > 0 && <span className="text-xs font-thin text-green-700">{`(includes referral discount of ${cart.cart?.referralDiscountPercentage}%)`}</span>}
                  </div>
                    <span className="text-green-700">-₹{cart.cart?.discounte}</span>
                  </div>

                  <div className="flex justify-between w-full">
                    <span>Delivery Charges</span>
                    <span className="text-green-700">Free</span>
                  </div>

                  {appliedCouponCode && cart.cart?.couponDiscount > 0 && <div className="flex justify-between mt-6">
                    <div className="border border-gay-100 px-4 py-2 bg-white rounded-sm flex justify-between items-center font-roboto bg-[#f0f8ff] gap-4">
                        <img src='/images/sell_tag.svg' />
                        <div className="flex flex-col justify-center items-start">
                          <p className="text text-gray-700">{appliedCouponCode?.code}</p>
                          <p className="text-[11px] text-gray-400">{`${appliedCouponCode?.offer}% (₹${parseFloat(cart.cart?.couponDiscount).toFixed(0)}) discounted`}</p>
                        </div>
                        <div onClick={removeCouponCode} className="flex-2 text-blue-600 text-[15px] cursor-pointer ml-2">Remove</div>
                    </div>
                    {/* <div>{cart.cart?.couponDiscount}</div> */}
                  </div>}
                  <hr />
                  <div className="flex justify-between font-semibold font-roboto text-normal text-neutral-700 sm:text-lg w-full">
                    <span>Total Amount</span>
                    <span className="text-neutral-700">₹{cart.cart?.totalDiscountedPrice}</span>
                  </div>
                </div>

                <Button text="Buy Now" classname='w-full' onClick={()=>navigate('/checkout?step=0')} type='submit'/>

              </div>

              {<div>

                <div className="flex gap-1 mt-4 mb-1">
                  <p>Offers</p>
                  <p className="text-sm text-gray-400">{`(${offers.length} offers available)`}</p>
                </div>

                <div>
                  {offers_selector && !offers_selector.loading && <div className="border border-gray-200 p-5 bg-white rounded-sm min-h-[50px] max-h-[200px] overflow-y-scroll flex flex-col gap-2">
                    {offers?.length >0 && offers.map((offer)=>{
                      return(<div key={offer.code}> 
                        <div className="border border-gay-100 px-4 py-2 bg-white rounded-sm flex justify-between items-center font-roboto bg-[#f0f8ff]">
                            <div className="flex flex-col justify-center items-start">
                              <p className="text text-gray-700">{offer.code}</p>
                              <p className="text-[11px] text-gray-400">{`GET ${offer.offer}% OFF`}</p>
                            </div>
                            <div onClick={()=>offer=> offer._id != appliedCouponCode?._id && applyCouponCode(offer._id)} className={`${offer._id != appliedCouponCode?._id ? 'text-blue-600 cursor-pointer' : 'text-neutral-600 cursor-not-allowed'} flex-2  text-[15px]`}>APPLY</div>
                        </div>
                      </div>)
                    })}
                  </div>}

                  {offers_selector && offers_selector.loading && 
                    <div className="border border-gay-100 min-h-[80px] px-4 py-2 bg-white rounded-sm flex justify-between items-center">
                        <Loading/>
                    </div>}

                </div>

              </div>}

            </div>
          </div>
        )}
      </div>}

      {cart.loading && !cart.error && <div className="w-[100%] flex justify-center mt-10">
          <Loading />
      </div>}

      {!cart.loading && cart.error && <div>
          <ErrorComponent errorMessage={cart.error} />
        </div>}

    </div>
  );
};

export default Cart;