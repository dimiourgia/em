import { Box, Grid } from "@mui/material";
import React, { useEffect, useSyncExternalStore } from "react";
import OrderCard from "./OrderCard";
import { useDispatch, useSelector } from "react-redux";
import { getOrderHistory } from "../../../State/Order/Action";
import OrderItemCard from "./OrderItemCard";

const Order = () => {
  const dispatch = useDispatch();
  const jwt = localStorage.getItem("jwt");
  const order =useSelector((state)=> state.order);
  const {user} = useSelector((state)=>state.auth)

  useEffect(() => {
    if (jwt) {
    dispatch(getOrderHistory({ jwt }));
} 
  }, [jwt, dispatch]);

  console.log("users orders ",order.orders)
  return (
    <>
    <div className="relative min-h-screen pb-8 justify-center">
    <div className="sticky top-[60px] flex justify-center items-center p-4 w-full bg-white">
        <p className="p-2 font-heading text-3xl bg-white z-[100]"  >
          Order History
        </p>
    </div>
    <Box className="px-10 mt-[20px]">
      <Grid container spacing={0} sx={{ justifyContent: "space-between" }}>
        <Grid item xs={12} className="flex items-center justify-center">
          <Box className="space-y-5 ">
            {order.orders?.length>0 && sortOrdersByLatest(order?.orders)?.map((order)=> {
              return <OrderItemCard order={order} />
            })}
          </Box>
        </Grid>
      </Grid>
    </Box>
    <div className="fixed top-[70px] right-[10px] flex flex-col justify-center items-center gap-1 border w-fit px-4 py-2 rounded-md border-blue-100">
          <p className="text-sm">Rewards</p>

          <div className="flex gap-2 items-center">
            <img src='images/wallet.svg' />
            <p>{user?.referralRewards}%</p>
          </div>
    </div>
    </div>
    
    </>
    
  );
};

export default Order;

function sortOrdersByLatest(orders) {
  return orders.sort((a, b) => new Date(a.OrderDate) - new Date(b.OrderDate));
}
