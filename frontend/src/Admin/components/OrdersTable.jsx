import React, { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { getOrders } from "../../State/AdminOrder/Action";
import { Table, TableBody, TableCell, TableContainer, TableHead, TableRow, Paper } from "@mui/material";

const OrdersList = () => {
  const dispatch = useDispatch();
  const adminOrder = useSelector(state => state.adminOrder);
  console.log("admin12345", adminOrder);

  useEffect(() => {
    dispatch(getOrders());
  }, [dispatch]);

  const formatDate = (dateTime) => {
    return dateTime.split('T')[0];
  };

  return (
    <TableContainer component={Paper}>
      <Table>
        <TableHead>
          <TableRow>
            
            <TableCell>Name</TableCell>
            <TableCell>Email</TableCell>
            <TableCell>Date</TableCell>
            <TableCell>Order ID</TableCell>
            <TableCell>Price</TableCell>
            <TableCell>Total Items</TableCell>
            <TableCell>City</TableCell>
            <TableCell>Street Name</TableCell>
            <TableCell>Zip Code</TableCell>
          </TableRow>
        </TableHead>
        <TableBody>
          {adminOrder.orders.map((order) => (
            <TableRow key={order._id}>



              <TableCell>
                {order.shippingAddress.firstName} {order.shippingAddress.lastName}
              </TableCell>
              <TableCell>{order.user.email}</TableCell>
              <TableCell>{formatDate(order.shippingAddress.DateInfo)}</TableCell>
              <TableCell>{order._id}</TableCell>
              <TableCell>₹{order.totalDiscountedPrice}</TableCell>
              <TableCell>{order.totalItem}</TableCell>
              <TableCell>{order.shippingAddress.city}</TableCell>
              <TableCell>{order.shippingAddress.streetAddress}</TableCell>
              <TableCell>{order.shippingAddress.zipCode}</TableCell>
            </TableRow>
          ))}
        </TableBody>
      </Table>
    </TableContainer>
  );
};

export default OrdersList;
