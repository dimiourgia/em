import React, { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { Alert, AlertTitle, Box, Grid, IconButton } from "@mui/material";
import { getOrderById } from "../../../State/Order/Action";
import { updatePayment } from "../../../State/Payment/Action";
import AddressCard from "../AdressCard/AdressCard";
import { useParams } from "react-router-dom";
import InstagramIcon from '@mui/icons-material/Instagram';
import FacebookIcon from '@mui/icons-material/Facebook';

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
    <div className="p-4 lg:px-36">
      <div className="flex flex-col justify-center items-center">
        <Alert
          variant="filled"
          severity="success"
          sx={{ mb: 2, width: "fit-content" }}
        >
          <AlertTitle>Payment Success</AlertTitle>
          Congratulations, your order has been placed.
        </Alert>
      </div>
      <div className="mx-auto max-w-[1000px]">
          <div className="flex flex-col md:flex-row justify-around items-center px-4 space-y-2 md:space-y-0 md:space-x-4">
            <div className="bg-gray-300 m-8 p-2 rounded-lg text-center">
              Share this purchase and earn discount on next purchase.
            </div>
          </div>

        <Grid container spacing={3} className="py-8">
          {order.order?.orderItems.map((item, index) => (
            <Grid
              key={index}
              container
              item
              className="shadow-xl rounded-md p-5 border"
              sx={{ alignItems: "center", justifyContent: "space-between" }}
              spacing={2}
            >
              <Grid item xs={10} sm={6} md={8}>
                <div className="flex items-center p-4 rounded-lg">
                  <img
                    className="w-[9rem] h-[9rem] object-cover object-top rounded-md"
                    src={item?.product.imageUrl[0]}
                    alt={item?.product.title}
                  />
                  <div className="ml-8">
                    <p className="font-bold">{item.product.title}</p>
                    <p className="opacity-50 text-md">
                      <span>Size: {item.size}</span>
                    </p>
                    <p>
                      <span className="opacity-50 text-md">Quantity: {item.quantity}</span>
                    </p>
                    <p className="font-bold">₹{item.discountedPrice}</p>
                  </div>
                </div>
              </Grid>
              <Grid item xs={2} sm={6} md={4} className="flex justify-center">
                <Box display="flex" flexDirection="column" alignItems="center">
                  <IconButton color="primary" href="https://www.instagram.com">
                    <InstagramIcon sx={{ fontSize:32, color:"#b51c1c"}} />
                  </IconButton>
                  <IconButton color="primary" href="https://www.facebook.com">
                    <FacebookIcon sx={{ fontSize:32, color: "#3b5998" }} />
                  </IconButton>
                </Box>
              </Grid>
              <Grid item xs={12}>
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
