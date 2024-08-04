import React from "react";
import { Button } from "@mui/material";
import { useDispatch } from "react-redux";
import { removeCartItem, updateCartItem } from "../../../State/Cart/Action";
import { IconButton } from "@mui/material";
import { getCart } from "../../../State/Cart/Action";
import AddCircleOutlineIcon from "@mui/icons-material/AddCircleOutline";
import RemoveCircleOutlineIcon from "@mui/icons-material/RemoveCircleOutline";

const CartItem = ({ item, showButton }) => {
  const dispatch = useDispatch();
  const jwt = localStorage.getItem("jwt");

  const handleRemoveItemFromCart = async () => {
    const data = { cartItemId: item?._id, jwt };
    await dispatch(removeCartItem(data));
    dispatch(getCart(jwt));
  };

  const handleUpdateCartItem = async (num) => {
    const reqData = {
      quantity: item.quantity + num,
      jwt,
    };
    const cartItemId = item?._id;

    await dispatch(updateCartItem(cartItemId, reqData));
    dispatch(getCart(jwt));
  };

  return (
    <div className="px-4 py-2 border border-gray-200 bg-white rounded-md max-w-screen">
      <div className="flex items-center gap-4">
        <div className="w-[9rem] h-[12rem]">
          <img
            className="w-full h-full object-cover"
            src={item?.product?.imageUrl[0]}
            alt=""
          />
        </div>
        <div className="ml-5 flex flex-col">
          <p className="text-neutral-700 text-[18px] font-roboto">{item?.product?.title}</p>
          <div className="flex gap-2">
            <p className="text-normal text-neutral-600 font-normal">size:</p>
            <p className="text-normal text-neutral-700 font-normal">{item?.size}</p>
          </div>
          <div className="flex gap-2">
            <p className="text-normal text-neutral-600 ">quantity:</p>
            <p className="text-normal text-neutral-700 ">{item?.quantity}</p>
          </div>

          <div className="flex space-x-2 items-center mt-2">
              <p className="font-roboto text-normal">
                  ₹{item?.product?.discountedPrice}
              </p>
              {item?.product?.price != item?.product?.discountedPrice && <div className="flex space-x-2 items-center">
                <p className="opacity-50 line-through text-sm">₹{item?.product?.price}</p>
                <p className="text-blue-600 text-sm">
                  {(
                    (1 - item?.product?.discountedPrice / item?.product?.price) *
                    100
                  ).toFixed(0) + "% off"}
                </p>
              </div>}
          </div>
          
            {showButton && (
              <div className="flex flex-col space-y-2 pt-4">
                <div className="flex items-center gap-1">
                  <IconButton
                    onClick={() => handleUpdateCartItem(-1)}
                    disabled={item?.quantity <= 1}
                    sx={{ '&:focus': { outline: 'none' } }}
                  >
                    <RemoveCircleOutlineIcon sx={{fontSize:"18px"}} />
                  </IconButton>

                  <div>{console.log(item?.product)}</div>
                  <span className="py-0 px-2 border rounded-md">
                    {item?.quantity}
                  </span>
                  <IconButton
                    onClick={() => handleUpdateCartItem(1)}
                    color="primary"
                    sx={{ '&:focus': { outline: 'none' } }}
                  >
                    <AddCircleOutlineIcon sx={{fontSize:"18px"}} />
                  </IconButton>
                </div>
                <div className="text-sm lg:text-text">
                  <Button onClick={handleRemoveItemFromCart} variant="outlined" color="error" sx={{ '&:focus': { outline: 'none' } , fontSize:"12px" }} >
                    Remove{" "}
                  </Button>
                </div>
              </div>
            )}
        </div>
      </div>
    </div>
  );
};

export default CartItem;
