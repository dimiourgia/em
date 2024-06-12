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
    <div className="mx-auto max-w-[1000px] justify-center ">
      <Box className="px-10">
      <Grid container spacing={0} sx={{ justifyContent: "space-between" }}>
        
        <Grid item xs={12}>
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
