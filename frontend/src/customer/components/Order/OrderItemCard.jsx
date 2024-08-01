import { Box, Grid } from "@mui/material";
import React, { useCallback } from "react";
import moment from "moment/moment";

const OrderItemCard = ({ order }) => {
  // Function to format the date and remove the time part
  const formatDate = (dateTime) => {
    return dateTime.split('T')[0];
  };

  const totalPrice = useCallback(()=>{

  },[])

  return (
    <Box className="p-5 bg-white w-[800px] flex items-center justify-center hover:shadow-2xl border">
      <Grid spacing={2} container sx={{ justifyContent: "space-between" }}>
        <Grid item xs={6}>
          <div className="flex cursor-pointer">
            <img
              className="w-[5rem] h-[5rem] object-cover object-top"
              src={order?.orderItems[0]?.product?.imageUrl[0]}
              alt={order?.orderItems[0]?.title}
            />
            <div className="flex flex-col gap-.5 w-full">
                {order?.orderItems?.map(item=>(
                    <div className="ml-5 flex gap-1 w-full justify-start items-center">
                        <p className="text-sm">{item?.product?.title}</p>
                        <p className="opacity-50 text-xs font-semibold space-x-5">
                            <span>({item?.size})</span>
                        </p>
                        <p className="opacity-50 text-xs font-semibold space-x-5">
                            <span> - {item?.quantity}</span>
                        </p>
                    </div>
                ))}
            </div>
          </div>
        </Grid>

        <Grid item xs={2}>
          <p>₹{order?.totalDiscountedPrice}</p>
          <p className="mt-[10px] text-xs font-semibold flex flex-col">
                <span className="text-neutral-400">Order Date</span>
                <span className="text-neutral-600">{moment(order?.OrderDate).format('D MMMM YYYY')}</span>
              </p>
        </Grid>

        <Grid item xs={2}>
            <div className="flex flex-col gap-1">
                <p>Referral Code:</p>
                <p className="p-1 bg-gray-50 flex items-center justify-center border border-gray-100 text-neutral-800 font-sans">AJDEAL25</p>
            </div>
        </Grid>
      </Grid>
    </Box>
  );
};

export default OrderItemCard;
