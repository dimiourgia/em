import { Box, Grid } from "@mui/material";
import React, { useEffect, useSyncExternalStore } from "react";
import OrderCard from "./OrderCard";
import { useDispatch, useSelector } from "react-redux";
import { getOrderHistory } from "../../../State/Order/Action";

const Order = () => {
  const dispatch = useDispatch();
  const jwt = localStorage.getItem("jwt");
  const order =useSelector((state)=> state.order);

  useEffect(() => {
    if (jwt) {
    dispatch(getOrderHistory({ jwt }));
} 
  }, [jwt, dispatch]);

  console.log("users orders ",order.orders)
  return (
    <>
    <div className="min-h-screen pb-8 bg-[#eeeeee] justify-center">
    <div className="flex justify-center items-center p-4 ">
                        <p className="p-2 font-heading px- text-3xl"  >
                        Order History
                        </p>
                    </div>
      <Box className="px-10 mt-[20px]">
      <Grid container spacing={0} sx={{ justifyContent: "space-between" }}>
        <Grid item xs={12} className="flex items-center justify-center">
          <Box className="space-y-5 ">
            {order.orders?.length>0 && order.orders?.map((order )=> {
              return order?.orderItems?.map((item,index)=> <OrderCard item={item} order={order} />)
            })}
          </Box>
        </Grid>
      </Grid>
    </Box>
    </div>
    
    </>
    
  );
};

export default Order;
