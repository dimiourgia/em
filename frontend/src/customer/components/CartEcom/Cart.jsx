import React, { useEffect, useState } from "react";
import CartItem from "./CartItem";
import { Button } from "@mui/material";
import { useNavigate } from "react-router-dom";
import { useDispatch, useSelector } from "react-redux";
import { getCart } from "../../../State/Cart/Action";

const Cart = () => {
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const jwt = localStorage.getItem("jwt");
  const cart = useSelector((state) => state.cart);
  const { user } = useSelector((state) => state.auth); // Correctly access the user from the auth state
  const [totalDiscountedPrice, setTotalDiscountedPrice] = useState(0);
  const [couponDiscount, setCouponDiscount] = useState(0);

  useEffect(() => {
    if (jwt) {
      dispatch(getCart(jwt));
    } else {
      navigate("/login");
    }
  }, [dispatch, jwt, navigate]);

  useEffect(() => {
    if (cart.cart?.totalDiscountedPrice !== undefined) {
      let updatedTotalDiscountedPrice = cart.cart.totalDiscountedPrice;
      console.log('User:', user);
      console.log('Total Discounted Price:', updatedTotalDiscountedPrice);

      if (user && !user.hasMadeFirstPurchase) {
        const discount = updatedTotalDiscountedPrice * 0.2;
        console.log('Applying first purchase discount:', discount);
        setCouponDiscount(discount);
        updatedTotalDiscountedPrice -= discount;
      } else {
        setCouponDiscount(0);
      }

      setTotalDiscountedPrice(updatedTotalDiscountedPrice);
    }
  }, [cart.cart, user]);

  const isCartEmpty = !cart.cartItems || cart.cartItems.length === 0;

  return (
    <div className="cart-container min-h-screen bg-gray-100">
      <div className="text-center py-4">
        <h1 className="text-2xl font-semibold font-text">Cart</h1>
      </div>

      {isCartEmpty ? (
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
        <div className="lg:grid grid-cols-3 lg:px-16 relative pb-8">
          <div className="lg:col-span-2 rounded-lg">
            {cart.cartItems.map((item, index) => (
              <div className="p-2" key={index}>
                <CartItem item={item} showButton={true} />
              </div>
            ))}
          </div>
          <div className="lg:px-2 mt-2 sticky top-0">
            <div className="border border-gray-500 p-5 bg-white rounded-md">
              <p className="font-bold font-text opacity-70">PRICE DETAILS</p>
              <hr />
              <div className="space-y-3 font-text font-semibold">
                <div className="flex justify-between pt-3 text-black">
                  <span>Price ({cart.cart?.totalItem} item{cart.cart?.totalItem > 1 ? 's' : ''})</span>
                  <span>₹{cart.cart?.totalPrice}</span>
                </div>
                <div className="flex justify-between">
                  <span>Discount</span>
                  <span className="text-green-700">-₹{cart.cart?.discounte}</span>
                </div>
                {couponDiscount > 0 && (
                  <div className="flex justify-between">
                    <span>First Purchase Coupon</span>
                    <span className="text-green-700">-₹{couponDiscount}</span>
                  </div>
                )}
                <div className="flex justify-between">
                  <span>Delivery Charges</span>
                  <span className="text-green-700">Free</span>
                </div>
                <hr />
                <div className="flex justify-between font-bold font-text text-lg">
                  <span>Total Amount</span>
                  <span className="text-green-700">₹{totalDiscountedPrice}</span>
                </div>
              </div>
              <button
                onClick={() => navigate("/checkout?step=0")}
                type="submit"
                className="bg-gray-400 text-gray-700 font-extrabold py-3 px-8 mt-8 w-full transition duration-300 ease-in-out hover:bg-gray-500"
              >
                Buy Now
              </button>
            </div>
          </div>
        </div>
      )}
    </div>
  );
};

export default Cart;
