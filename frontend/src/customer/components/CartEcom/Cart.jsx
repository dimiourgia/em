import React, { useEffect } from "react";
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
    <div className="cart-container min-h-screen bg-gray-100">
      <div className="text-center py-4">
        <h1 className="text-2xl font-semibold font-text">Cart</h1>
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
          <div className="lg:col-span-2 rounded-lg pb-8">
            {cart.cartItems.map((item, index) => (
              // Added a key prop to the mapped elements
              <CartItem key={index} item={item} showButton={true} />
            ))}

          </div>
          <div className="lg:px-2 sticky top-0">
            <div className="border p-5 bg-white rounded-md">
              <p className="font-bold opacity-60">PRICE DETAILS</p>
              <hr />

              <div className="space-y-3 font-semibold">
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
                <div className="flex justify-between font-bold text-lg">
                  <span>Total Amount</span>
                  <span className="text-green-700">₹{cart.cart?.totalDiscountedPrice}</span>
                </div>
              </div>
              <button
                onClick={() => navigate("/checkout?step=0")}
                type="submit"
                className="bg-black text-white  py-3 px-8 mt-8 w-full transition duration-300 ease-in-out hover:bg-gray-800 hover:text-gray-300"
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