import React from "react";
import { Badge, Button } from "@mui/material";
import { useLocation, useNavigate } from "react-router-dom";
import CartItem from "../CartEcom/CartItem";
import { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { getOrderById } from "../../../State/Order/Action";
import AdressCard from "../AdressCard/AdressCard";
import { createPayment } from "../../../State/Payment/Action";

const OrderSummary = () => {
  const navigate = useNavigate();
  const location = useLocation();
  const searchParams = new URLSearchParams(location.search);
const orderId = searchParams.get("order_id");
const dispatch=useDispatch();
  const jwt=localStorage.getItem("jwt");
  const order =useSelector(state=>state.order)
console.log("orderId ", order)
useEffect(()=>{
  dispatch(getOrderById(orderId))
},[orderId])

const handleCreatePayment=()=>{
  const data={orderId:order.order?._id,jwt}
  dispatch(createPayment(data))
}

const discount = order.order
    ? order.order.totalPrice - order.order.totalDiscountedPrice
    : 0;
  

  return (
    <div className=" space-y-5 min-h-screen">
       <h1 className='font-text  text-center text-3xl  text-black  mt-[25px] '>
                <div className="flex justify-center items-center">
                        Order Summary
                    </div>
                    
                </h1>
        <div className="p-5 shadow-lg  border hover:shadow-2xl font-text">
            <AdressCard address={order.order?.shippingAddress}/>
        </div>
      <div className="lg:grid grid-cols-3 relative justify-between">
        <div className="lg:col-span-2 ">
          <div className="hover:shadow-2xl p-2 space-y-3 font-text">
            {order.order?.orderItems.map((item) => (
              <>
                <CartItem item={item} showButton={false}/>
              </>
            ))}
          </div>
        </div>
        <div className="sticky top-0 h-[100vh] lg:mt-0 lg:ml-5 ">
          <div className="border mt-[10px] hover:shadow-2xl px-5 py-2 bg-white shadow-lg ">
            <p className="font-text opacity-60 text-center p-2">PRICE DETAILS</p>
            <hr className="border-black p-2" />

            <div className="space-y-3 font-semibold">
              <div className="flex justify-between text-black ">
                <span className="font-text">Price ({order.order?.totalItem} item)</span>
                <span className="font-text">₹{order.order?.totalPrice}</span>
              </div>
              <div className="flex justify-between">
                <span className="font-text">Discount</span>
                <span className="text-green-700 font-text ">-₹{discount}</span>
              </div>
              <div className="flex justify-between">
                <span className="font-text" >Delivery Charges</span>
                <span className="text-green-700 font-text">Free</span>
              </div>
              <hr className="h-10px border-3 border-black" />

              <div className="flex justify-between font-bold text-lg">
                <span className="font-text">Total Amount</span>
                <span className="text-green-700 font-text">₹{order.order?.totalDiscountedPrice}</span>
              </div>
            </div>

            <button
              onClick={handleCreatePayment}
              variant="contained"
              type="submit"
              sx={{ padding: ".8rem 2rem", marginTop: "2rem", width: "100%" }}
              className=" bg-black text-white p-3 mt-6 mb-2 w-full transition duration-300 ease-in-out hover:bg-gray-800 hover:text-gray-300"
            >
              Payment
            </button>
          </div>
        </div>
      </div>
    </div>
  );
};

export default OrderSummary;
