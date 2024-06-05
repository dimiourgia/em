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

  // const handleUpdateCartItem = (num) => {
  //   const reqData = {
  //     quantity: item.quantity + num,
  //   };
  //   const cartItemId = item?._id;
  //   const jwt = localStorage.getItem("jwt");

  //   console.log("update data ", { cartItemId, reqData });
  //   dispatch(updateCartItem(cartItemId, { ...reqData, jwt }));
  // };

  const handleUpdateCartItem = async (num) => {
    const reqData = {
      quantity: item.quantity + num,
      jwt,
    };
    const cartItemId = item?._id;

    await dispatch(updateCartItem(cartItemId, reqData));
    dispatch(getCart(jwt)); // Refetch the cart data
  };

  return (
    <div className="p-5 shadow-lg border rounded-md">
      <div className="flex items-center">
        <div className="w-[5rem] h-[5rem] lg:w-[9rem] lg:h-[9rem] ">
          <img
            className="w-full h-full object-cover object-top"
            src={item?.product?.imageUrl}
            alt=""
          />
        </div>
        <div className="ml-5 space-y-1">
          <p className="font-semibold">{item?.product?.title}</p>
          <p className="opacity-70">Size: {item?.size}</p>
          <p className="opacity-70 mt-2">Seller: {item?.product?.brand}</p>
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
        <div className="lg:flex items-center lg:space-x-10 pt-4">
          <div className="flex items-center space-x-2 ">
            <IconButton
              onClick={() => handleUpdateCartItem(-1)}
              disabled={item?.quantity <= 1}
              color="primary"
              aria-label="add an alarm"
            >
              <RemoveCircleOutlineIcon />
            </IconButton>

            <span className="py-1 px-7 border rounded-sm">
              {item?.quantity}
            </span>
            <IconButton
              onClick={() => handleUpdateCartItem(1)}
              color="primary"
              aria-label="add an alarm"
            >
              <AddCircleOutlineIcon />
            </IconButton>
          </div>
          <div className="flex text-sm lg:text-base mt-5 lg:mt-0">
            <Button onClick={handleRemoveItemFromCart} variant="text">
              Remove{" "}
            </Button>
          </div>
        </div>
      )}
    </div>
  );
};

export default CartItem;
