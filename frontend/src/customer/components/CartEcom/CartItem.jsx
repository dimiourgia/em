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
    <div className="p-6 border border-gray-500 bg-white rounded-lg h-[310px]">
      <div className="flex items-center gap-4">
        <div className="w-[9rem] h-[12rem]">
          <img
            className="w-full h-full object-cover rounded shadow-md object-top"
            src={item?.product?.imageUrl[0]}
            alt=""
          />
        </div>
        <div className="ml-5 space-y-1">
          <p className="font-semibold">{item?.product?.title}</p>
          <p className="opacity-70">Size: {item?.size}</p>
          {/* <p className="opacity-70 mt-2">Seller: {item?.product?.brand}</p> */}
          <p className="opacity-70 mt-2">Quantity: {item?.quantity}</p>
          <div className="flex space-x-2 items-center pt-3">
            <p className="font-semibold text-lg">
              ₹{item?.product?.discountedPrice}
            </p>
            <p className="opacity-50 line-through">₹{item?.product?.price}</p>
            <p className="text-red-500 font-semibold">
              {(
                (1 - item?.product?.discountedPrice / item?.product?.price) *
                100
              ).toFixed(0) + "% off"}
            </p>
          </div>
        </div>
      </div>
      {showButton && (
        <div className="flex items-center space-x-8 pt-4">
          <div className="flex items-center gap-1">
            <IconButton
              onClick={() => handleUpdateCartItem(-1)}
              disabled={item?.quantity <= 1}
              sx={{ '&:focus': { outline: 'none' } }}
            >
              <RemoveCircleOutlineIcon sx={{fontSize:"20px"}} />
            </IconButton>

            <div>{console.log(item?.product)}</div>
            <span className="py-1 px-5 border rounded-sm">
              {item?.quantity}
            </span>
            <IconButton
              onClick={() => handleUpdateCartItem(1)}
              color="primary"
              sx={{ '&:focus': { outline: 'none' } }}
            >
              <AddCircleOutlineIcon sx={{fontSize:"20px"}} />
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
  );
};

export default CartItem;
