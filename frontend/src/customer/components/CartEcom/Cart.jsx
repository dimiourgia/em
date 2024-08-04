import React, { useEffect } from "react";
import CartItem from "./CartItem";
import Button from "../Button/Index";
import { useNavigate } from "react-router-dom";
import { useDispatch, useSelector } from "react-redux";
import { getCart } from "../../../State/Cart/Action";

const Cart = () => {
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const jwt = localStorage.getItem("jwt");
  const cart = useSelector((state) => state.cart);
  console.log("cart ", cart);

  useEffect(() => {
    if (jwt) {
      dispatch(getCart(jwt));
    } else {
      navigate('/login')
    }
  }, [dispatch, jwt, navigate]);

  // Check if the cart is empty
  const isCartEmpty = !cart.cartItems || cart.cartItems.length === 0;

  return (
    <div className="cart-container min-h-screen px-4">
      <div className="text-center py-4">
        <h1 className="text-2xl font-thin font-roboto">Cart</h1>
      </div>

      {isCartEmpty ? (
        // Display full-page layout with centered message when the cart is empty
        <div className="empty-cart-message min-h-screen flex items-center justify-center text-center">
          <div>
            <p className="text-2xl text-gray-500 font-semibold">Your cart is empty</p>
            <Button
              onClick={() => navigate("/products")}
              variant="contained"
              sx={{ padding: ".8rem 2rem", marginTop: "2rem", bgcolor: "#bdbdbd" }}
            >
              Go to Shop 
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

              <div className="space-y-2 font-roboto">
                <div className="flex justify-between pt-3 text-black">
                  <span>Price ({cart.cart?.totalItem} item)</span>
                  <span>₹{cart.cart?.totalPrice}</span>
                </div>
                <div className="flex justify-between">
                  <span>Discount</span>
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
    </div>
  );
};

export default Cart;