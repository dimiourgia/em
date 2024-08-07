import { Box, Grid } from "@mui/material";
import React, { useCallback } from "react";
import moment from "moment/moment";
import { useSelector } from "react-redux";

const OrderItemCard = ({ order }) => {
  // Function to format the date and remove the time part
  const formatDate = (dateTime) => {
    return dateTime.split('T')[0];
  };

  const {user} = useSelector(state=>state.auth)
  console.log('order referral code', order?.referralCode);

  return (
    <Box className="p-5 bg-white sm:w-[700px] md:w-[800px] flex items-center justify-center hover:shadow-2xl border">
      <div className="flex flex-col gap-4 sm:flex-row  sm:justify-between w-full">
        <div className="flex-6">
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
                        <p className="text-neutral-400 text-xs font-semibold space-x-5">
                            <span>({item?.size})</span>
                        </p>
                        <p className="text-neutral-400 text-xs font-semibold space-x-5">
                            <span> - {item?.quantity}</span>
                        </p>
                    </div>
                ))}
            </div>
          </div>
        </div>

        <div className="flex-2">
          <p>₹{order?.totalDiscountedPrice}</p>
          <p className="mt-[10px] text-xs flex flex-col">
                <span className="text-neutral-400">Ordered On</span>
                <span className="text-neutral-600">{moment(order?.OrderDate).format('D MMMM YYYY')}</span>
              </p>
        </div>

        <div className="flex-2" >
            <div className="flex flex-col gap-1">
                <p className="text-sm">Referral Code:</p>
                <p className="p-1 bg-gray-50 flex items-center justify-center border border-gray-100 text-neutral-800 font-sans">{order.referralCode??'AJDEAL25'}</p>
            </div>
        </div>

        <div className="flex-2" >
            <div className="flex flex-col gap-1">
                <p className="text-sm">Status:</p>
                <p className="p-1 bg-green-100 text-sm flex items-center justify-center border border-0 border-green-600 rounded-md text-green-800 font-sans">{order?.orderStatus}</p>
            </div>
        </div>

      </div>
    </Box>
  );
};

export default OrderItemCard;
