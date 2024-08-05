import { Box, Grid } from "@mui/material";
import React from "react";

const OrderCard = ({ item, order }) => {
  // Function to format the date and remove the time part
  const formatDate = (dateTime) => {
    return dateTime.split('T')[0];
  };

  return (
    <Box className="p-5 bg-white w-[800px] flex items-center justify-center hover:shadow-2xl border">
      <Grid spacing={2} container sx={{ justifyContent: "space-between" }}>
        <Grid item xs={6}>
          <div className="flex cursor-pointer">
            <img
              className="w-[5rem] h-[5rem] object-cover object-top"
              src={item?.product?.imageUrl[0]}
              alt={item?.product?.title}
            />
            <div className="ml-5">
              <p className="mb-2">{item?.product?.title}</p>
              <p className="text-neutral-400 text-xs font-semibold space-x-5">
                <span>Size: {item?.size}</span>
              </p>
              <p className="text-neutral-400 text-xs font-semibold space-x-5">
                <span>Quantity: {item?.quantity}</span>
              </p>
            </div>
          </div>
        </Grid>

        <Grid item xs={2}>
          <p>₹{item?.discountedPrice}</p>
          <p className="mt-[10px] text-neutral-400 text-xs font-semibold space-x-5">
                <span>Order Date: {formatDate(item?.OrderDate)}</span>
              </p>
        </Grid>
      </Grid>
    </Box>
  );
};

export default OrderCard;
