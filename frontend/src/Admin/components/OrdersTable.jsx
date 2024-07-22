import React, { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { getOrders } from "../../State/AdminOrder/Action";
import { Card, CardContent, Typography, Grid, Pagination } from "@mui/material";

const OrdersList = () => {
  const dispatch = useDispatch();
  const adminOrder = useSelector(state => state.adminOrder);
  console.log("admin12345", adminOrder);

  const [currentPage, setCurrentPage] = useState(1);
  const ordersPerPage = 20;

  useEffect(() => {
    dispatch(getOrders());
  }, [dispatch]);

  const formatDate = (dateTime) => {
    return dateTime.split('T')[0];
  };

  const indexOfLastOrder = currentPage * ordersPerPage;
  const indexOfFirstOrder = indexOfLastOrder - ordersPerPage;
  const currentOrders = adminOrder.orders.slice(indexOfFirstOrder, indexOfLastOrder);

  // Change page
  const handleChangePage = (event, value) => {
    setCurrentPage(value);
  };

  return (
    <>
      <Grid container spacing={3}>
        {currentOrders.map((order, index) => (
          <Grid item key={order._id} xs={12} sm={6} md={4}>
            <Card>
              <CardContent>
                <Typography variant="h6" component="div" gutterBottom>
                  {indexOfFirstOrder + index + 1}. {order.shippingAddress.firstName} {order.shippingAddress.lastName}
                </Typography>
                <Typography variant="body2" color="text.secondary">
                  Email: {order?.user?.email}
                </Typography>
                <Typography variant="body2" color="text.secondary">
                  Date: {formatDate(order?.shippingAddress?.DateInfo)}
                </Typography>
                <Typography variant="body2" color="text.secondary">
                  Order ID: {order?._id}
                </Typography>
                <Typography variant="body2" color="text.secondary">
                  Price: ₹{order.totalDiscountedPrice}
                </Typography>
                <Typography variant="body2" color="text.secondary">
                  Total Items: {order.totalItem}
                </Typography>
                <Typography variant="body2" color="text.secondary">
                  City: {order.shippingAddress.city}
                </Typography>
                <Typography variant="body2" color="text.secondary">
                  Street Name: {order.shippingAddress.streetAddress}
                </Typography>
                <Typography variant="body2" color="text.secondary">
                  Zip Code: {order.shippingAddress.zipCode}
                </Typography>
              </CardContent>
            </Card>
          </Grid>
        ))}
      </Grid>
      <Pagination
        style={{ marginTop: 20, textAlign: 'center' }}
        count={Math.ceil(adminOrder.orders.length / ordersPerPage)}
        page={currentPage}
        onChange={handleChangePage}
      />
    </>
  );
};

export default OrdersList;
