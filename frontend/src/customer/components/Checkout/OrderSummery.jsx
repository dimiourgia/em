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
       <h1 className='font-ijk  text-center text-3xl  text-black  mt-[50px] '>
                <div className="flex justify-center items-center p-4 ">
                        <p className="p-2 px-4 group  "  >
                        Order Summary
                            <div className="bg-amber-500 h-[2px] w-0 group-hover:w-full transition-all duration-500"></div>
                        </p>
                    </div>
                    
                </h1>
        <div className="p-5 shadow-lg  border hover:shadow-2xl font-abc">
            <AdressCard address={order.order?.shippingAddress}/>
        </div>
      <div className="lg:grid grid-cols-3 relative justify-between">
        <div className="lg:col-span-2 ">
          <div className="hover:shadow-2xl p-2 space-y-3 font-abc">
            {order.order?.orderItems.map((item) => (
              <>
                <CartItem item={item} showButton={false}/>
              </>
            ))}
          </div>
        </div>
        <div className="sticky top-0 h-[100vh] lg:mt-0 lg:ml-5 ">
          <div className="border mt-[10px] hover:shadow-2xl p-5 bg-white shadow-lg ">
            <p className="font-abc opacity-60 pt-5 pb-2 text-center">PRICE DETAILS</p>
            <hr className="h-10px my-8 border-3 border-black" />

            <div className="space-y-3 font-semibold">
              <div className="flex justify-between pt-3 text-black ">
                <span className="font-abc">Price ({order.order?.totalItem} item)</span>
                <span className="font-abc">₹{order.order?.totalPrice}</span>
              </div>
              <div className="flex justify-between">
                <span className="font-abc">Discount</span>
                <span className="text-green-700 font-abc ">-₹{discount}</span>
              </div>
              <div className="flex justify-between">
                <span className="font-abc" >Delivery Charges</span>
                <span className="text-green-700 font-abc">Free</span>
              </div>
              <hr className="h-10px my-8 border-3 border-black" />

              <div className="flex justify-between font-bold text-lg">
                <span className="font-abc">Total Amount</span>
                <span className="text-green-700 font-abc">₹{order.order?.totalDiscountedPrice}</span>
              </div>
            </div>

            <button
              onClick={handleCreatePayment}
              variant="contained"
              type="submit"
              sx={{ padding: ".8rem 2rem", marginTop: "2rem", width: "100%" }}
              className=" bg-black text-white py-3 px-8 mt-8 w-full transition duration-300 ease-in-out hover:bg-gray-800 hover:text-gray-300"
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
