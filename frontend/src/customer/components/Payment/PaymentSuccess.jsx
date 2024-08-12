import React, { useCallback, useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { Alert, AlertTitle, Box, Grid } from "@mui/material";
import { getOrderById } from "../../../State/Order/Action";
import { updatePayment } from "../../../State/Payment/Action";
import AddressCard from "../AdressCard/AdressCard";
import { useParams } from "react-router-dom";
import Loading from "../Loader/Index";
import ErrorComponent from "../Error/Index";
import { getCart } from "../../../State/Cart/Action";
import debounce from "lodash.debounce";
import { getWallet } from "../../../State/Wallet/Action";
import { getCoupons } from "../../../State/Coupon/Action";

const PaymentSuccess = () => {
  const [paymentId, setPaymentId] = useState("");
  const [referenceId, setReferenceId] = useState("");
  const [paymentStatus, setPaymentStatus] = useState("");
  const { orderId } = useParams();

  const jwt = localStorage.getItem("jwt");
  const dispatch = useDispatch();
  const order = useSelector((state) => state.order);
  const payment = useSelector((state)=> state.payment);

  const fetchDebouncdedOrder = useCallback(debounce(()=>{
    console.log('Placing debounced call');
    dispatch(getOrderById(orderId));
  }, 300), [orderId]);

  useEffect(()=>{
    console.log(payment, 'payment from payment success');
    console.log(order, 'order from payment success');
    if(payment.success && order.order.orderStatus != 'PLACED' && !order.error){
      fetchDebouncdedOrder()
    }

  }, [payment, order, dispatch])

  useEffect(()=>{
    if(order?.order?.orderStatus == 'PLACED'){
      dispatch(getCart(jwt));
      dispatch(getWallet());
      dispatch(getCoupons());
    }
  },[order])

  useEffect(() => {
    console.log("orderId", orderId);
    const urlParams = new URLSearchParams(window.location.search);
    setPaymentId(urlParams.get("razorpay_payment_id"));
    setReferenceId(urlParams.get("razorpay_payment_link_reference_id"));
    setPaymentStatus(urlParams.get("razorpay_payment_link_status"));
  }, []);

  useEffect(() => {
    // if (paymentId && paymentStatus === "paid") {
    //   const data = { orderId, paymentId, jwt };
    //   dispatch(updatePayment(data));
    //   dispatch(getOrderById(orderId));
    // }

    const data = { orderId, paymentId, jwt };
    dispatch(updatePayment(data));
  }, []);

  return (<div className="min-h-[calc(100vh-322px)] md:min-h-[calc(100vh-310px)] items-center flex w-full justify-center">
    {!payment.loading && !payment.error && payment.success && order.order.orderStatus == 'PLACED' && <div className="p-4 lg:px-36">
      <div className="flex flex-col justify-center items-center max-w-[1000px]">
        <Alert
          variant="filled"
          severity="success"
          sx={{ mb: 2, width: "fit-content" }}
        >
          <AlertTitle>Payment Success</AlertTitle>
          {`Congratulations, your order has been placed.
          You have also earned a refferal code : ${order.order.referralCode}.
          Share this with others and if they use it to signup on our platform,
          you will earn 5% discount for each referral`}
        </Alert>
      </div>

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
              <Grid item xs={12}>
                <div className="flex items-center">
                  <img
                    className="w-[9rem] h-[9rem] object-cover object-top"
                    src={item?.product.imageUrl[0]}
                    alt={item?.product.title}
                  />
                  <div className="ml-8">
                    <p>{item.product.title}</p>
                    <p className="opacity-50 text-md font">
                      <span className="">Size: {item.size}</span>
                    </p>
                    <p>
                    <span className="opacity-50 text-md" >Quantity: {item.quantity}</span>
                    </p>
                    <p>₹{item.discountedPrice}</p>
                    

                  </div>
                </div>
              </Grid>
              <Grid item>
                <p className='ml-2 mt-6 underline'>Shipping Address:</p>
                <AddressCard address={order.order?.shippingAddress} />
              </Grid>
            </Grid>
          ))}
        </Grid>
      </div>
      
    </div>}
    {payment.loading && !payment.error &&
      <div className="w-full flex justify-center">
        <Loading />
      </div>}
    {!payment.loading && payment.error && <div className="h-[100%] w-full flex items-center justify-center">
        <ErrorComponent errorMessage={'Something went wrong while the placing the order'} />
      </div>}
  </div>);
};

export default PaymentSuccess;
