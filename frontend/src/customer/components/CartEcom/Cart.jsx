import React, { useEffect } from "react";
import CartItem from "./CartItem";
import Button from "../Button/Index";
import { useNavigate } from "react-router-dom";
import { useDispatch, useSelector } from "react-redux";
import { getCart } from "../../../State/Cart/Action";
import Loading from "../Loader/Index";
import ErrorComponent from "../Error/Index";

const Cart = ({setOpenAuthModal}) => {
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const jwt = localStorage.getItem("jwt");
  const cart = useSelector((state) => state.cart);
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

  return (
    <div className="cart-container min-h-screen px-4">
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
            <div className="lg:px-2 p-2">
              <div className="border border-gray-200 p-5 bg-white rounded-sm">
                <p className="font-semibold text-neutral-700 font-roboto">Price Details</p>
                <hr />

                <div className="space-y-2 font-roboto text-normal">
                  <div className="flex justify-between pt-3 text-black">
                    <span>Price ({cart.cart?.totalItem} item)</span>
                    <span>₹{cart.cart?.totalPrice}</span>
                  </div>

                  <div className="flex justify-between">
                  <div className="flex flex-col">
                    <span>Discount</span>
                    {cart.cart?.referralDiscountPercentage > 0 && <span className="text-xs font-thin text-green-700">{`(includes referral discount of ${cart.cart?.referralDiscountPercentage}%)`}</span>}
                  </div>
                    <span className="text-green-700">-₹{cart.cart?.discounte}</span>
                  </div>

                  <div className="flex justify-between">
                    <span>Delivery Charges</span>
                    <span className="text-green-700">Free</span>
                  </div>
                  <hr />
                  <div className="flex justify-between font-semibold font-roboto text-normal text-neutral-700 sm:text-lg">
                    <span>Total Amount</span>
                    <span className="text-neutral-700">₹{cart.cart?.totalDiscountedPrice}</span>
                  </div>
                </div>

                <Button text="Buy Now" classname='w-full' onClick={()=>navigate('/checkout?step=0')} type='submit'/>

              </div>
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