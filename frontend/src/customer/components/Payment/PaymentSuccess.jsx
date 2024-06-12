import React, { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { Alert, AlertTitle, Box, Grid } from "@mui/material";
import { getOrderById } from "../../../State/Order/Action";
import { updatePayment } from "../../../State/Payment/Action";
// import OrderTraker from "../orders/OrderTraker";
import AddressCard from "../AdressCard/AdressCard";
import { useParams } from "react-router-dom";

const PaymentSuccess = () => {
  const [paymentId, setPaymentId] = useState("");
  const [referenceId, setReferenceId] = useState("");
  const [paymentStatus, setPaymentStatus] = useState("");
  const { orderId } = useParams();

  const jwt = localStorage.getItem("jwt");
  const dispatch = useDispatch();
  const order = useSelector((state) => state.order);

  useEffect(() => {
    console.log("orderId", orderId);
    const urlParams = new URLSearchParams(window.location.search);
    setPaymentId(urlParams.get("razorpay_payment_id"));
    setReferenceId(urlParams.get("razorpay_payment_link_reference_id"));
    setPaymentStatus(urlParams.get("razorpay_payment_link_status"));
  }, []);

  useEffect(() => {
    if (paymentId && paymentStatus === "paid") {
      const data = { orderId, paymentId, jwt };
      dispatch(updatePayment(data));
      dispatch(getOrderById(orderId));
    }
  }, [orderId, paymentId]);

  return (
    <div className="px-2 lg:px-36">
      <div className="flex flex-col justify-center items-center">
        <Alert
          variant="filled"
          severity="success"
          sx={{ mb: 6, width: "fit-content" }}
        >
          <AlertTitle>Payment Success</AlertTitle>
          Congratulations, your order has been placed.
        </Alert>
      </div>

      {/* <OrderTraker activeStep={1}/> */}
    <div className="mx-auto  max-w-[1000px]">
      <Grid container className="space-y-5 py-5 pt-20">
        {order.order?.orderItems.map((item, index) => (
          <Grid
            key={index}
            container
            item
            className="shadow-xl rounded-md p-5 border"
            sx={{ alignItems: "center", justifyContent: "space-between" }}
          >
            <Grid item xs={6}>
              <div className="flex items-center">
                <img
                  className="w-20 h-20 object-cover object-top"
                  src={item?.product.imageUrl}
                  alt={item?.product.title}
                />
                <div className="ml-5 space-y-2">
                  <p>{item.product.title}</p>
                  <p className="opacity-50 text-sm font-semibold">
                    <span className="">Size: {item.size}</span>
                  </p>
                  <p>
                  <span className="opacity-50 text-sm font-semibold" >Quantity: {item.quantity}</span>
                  </p>
                  
                  <p>₹{item.discountedPrice}</p>
                  

                </div>
              </div>
            </Grid>
            <Grid item>
              <AddressCard address={order.order?.shippingAddress} />
            </Grid>
          </Grid>
        ))}
      </Grid>
    </div>
      
    </div>
  );
};

export default PaymentSuccess;
