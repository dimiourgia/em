import React, { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { getOrders } from "../../State/AdminOrder/Action";

const OrdersList = () => {
  const dispatch = useDispatch();
  const adminOrder = useSelector(state => state.adminOrder);

  useEffect(() => {
    dispatch(getOrders());
  }, [dispatch]);

  return (
    <div>
      {adminOrder.orders.map(order => (
        <div key={order._id}>
          <h3>Order ID: {order._id}</h3>
          <p>User: {order.user.name}</p>
          <p>Shipping Address: {order.shippingAddress.street}</p>
          <div>
            <h4>Order Items:</h4>
            {order.orderItems.map(item => (
              <div key={item._id}>
                <p>Product Name: {item.product.name}</p>
                <p>Quantity: {item.quantity}</p>
                <p>Price:{item.price}</p>
                <p>Size: {item.size}</p>
              </div>
            ))}
          </div>
        </div>
      ))}
    </div>
  );
};

export default OrdersList;
