import React, { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { getOrders, shipOrder, deliveredOrder } from "../../State/AdminOrder/Action";
import axios from "axios";
import {
  Table,
  TableBody,
  TableCell,
  TableContainer,
  TableHead,
  TableRow,
  Paper,
  Collapse,
  IconButton,
  Box,
  Typography,
  Select,
  MenuItem,
  FormControl,
  InputLabel,
  TableSortLabel,
} from "@mui/material";
import { KeyboardArrowDown, KeyboardArrowUp } from "@mui/icons-material";
import moment from "moment";
import Loading from "../../customer/components/Loader/Index";

const baseUrl = import.meta.env.VITE_API_BASE_URL;

const OrdersList = () => {
  const dispatch = useDispatch();
  const adminOrder = useSelector((state) => state.adminOrder);
  console.log("admin12345", adminOrder);

  // State to track expanded rows
  const [expandedRows, setExpandedRows] = useState([]);
  const [orderStatus, setOrderStatus] = useState({});
  const [sortConfig, setSortConfig] = useState({ key: null, direction: 'asc' });
  const [statusFilter, setStatusFilter] = useState('ALL'); // State for status filter

  useEffect(() => {
    dispatch(getOrders());
  }, [dispatch]);

  const formatDate = (dateTime) => {
    const date = moment(dateTime);
    return date.fromNow();
  };

  const sortedAndFilteredOrders = () => {
    let sortableItems = [...adminOrder.orders].filter(order=>order.orderStatus != 'PENDING');
    
    // Apply status filter
    if (statusFilter !== 'ALL') {
      sortableItems = sortableItems.filter(order => order.orderStatus === statusFilter);
    }

    if (sortConfig.key !== null) {
      sortableItems.sort((a, b) => {
        if (sortConfig.key === 'name') {
          const nameA = `${a.shippingAddress.firstName} ${a.shippingAddress.lastName}`.toLowerCase();
          const nameB = `${b.shippingAddress.firstName} ${b.shippingAddress.lastName}`.toLowerCase();
          return (nameA > nameB ? 1 : -1) * (sortConfig.direction === 'asc' ? 1 : -1);
        } else if (sortConfig.key === 'email') {
          return (a.user.email > b.user.email ? 1 : -1) * (sortConfig.direction === 'asc' ? 1 : -1);
        } else if (sortConfig.key === 'date') {
          return (new Date(a.OrderDate) - new Date(b.OrderDate)) * (sortConfig.direction === 'asc' ? 1 : -1);
        } else if (sortConfig.key === 'price') {
          return (a.totalDiscountedPrice - b.totalDiscountedPrice) * (sortConfig.direction === 'asc' ? 1 : -1);
        } else if (sortConfig.key === 'city') {
          return (a.shippingAddress.city > b.shippingAddress.city ? 1 : -1) * (sortConfig.direction === 'asc' ? 1 : -1);
        }
        return 0;
      });
    }
    return sortableItems;
  };

  // Toggle row expansion
  const toggleRowExpansion = (orderId) => {
    setExpandedRows((prevExpandedRows) =>
      prevExpandedRows.includes(orderId)
        ? prevExpandedRows.filter((id) => id !== orderId)
        : [...prevExpandedRows, orderId]
    );
  };

  // Handle order status change and make API call
  const handleStatusChange = async (orderId, newStatus) => {
    setOrderStatus((prevStatus) => ({
      ...prevStatus,
      [orderId]: newStatus,
    }));
    
    newStatus === "Shipped"
      ? dispatch(shipOrder(orderId))
      : dispatch(deliveredOrder(orderId));

    dispatch(getOrders());
    setStatusFilter('ALL');
  };

  // Handle sort request
  const requestSort = (key) => {
    let direction = 'asc';
    if (sortConfig.key === key && sortConfig.direction === 'asc') {
      direction = 'desc';
    }
    setSortConfig({ key, direction });
  };

  return (<>
    <TableContainer component={Paper}>
      <Box margin={2} display="flex" justifyContent="space-between" alignItems="center">
        <Typography variant="h6">Order List</Typography>
        <FormControl variant="outlined" style={{ minWidth: 200 }}>
          <InputLabel id="status-filter-label">Filter by Status</InputLabel>
          <Select
            labelId="status-filter-label"
            value={statusFilter}
            onChange={(e) => setStatusFilter(e.target.value.toUpperCase())}
            label="Filter by Status"
          >
            <MenuItem value="All">All</MenuItem>
            <MenuItem value="Placed">Placed</MenuItem>
            <MenuItem value="Shipped">Shipped</MenuItem>
            <MenuItem value="Delivered">Delivered</MenuItem>
          </Select>
        </FormControl>
      </Box>
      <Table>
        <TableHead>
          <TableRow>
            <TableCell />
            <TableCell sortDirection={sortConfig.key === 'name' ? sortConfig.direction : false}>
              <TableSortLabel
                active={sortConfig.key === 'name'}
                direction={sortConfig.key === 'name' ? sortConfig.direction : 'asc'}
                onClick={() => requestSort('name')}
              >
                Name
              </TableSortLabel>
            </TableCell>
            <TableCell sortDirection={sortConfig.key === 'email' ? sortConfig.direction : false}>
              <TableSortLabel
                active={sortConfig.key === 'email'}
                direction={sortConfig.key === 'email' ? sortConfig.direction : 'asc'}
                onClick={() => requestSort('email')}
              >
                Email
              </TableSortLabel>
            </TableCell>
            <TableCell>Mobile Number</TableCell>
            <TableCell sortDirection={sortConfig.key === 'date' ? sortConfig.direction : false}>
              <TableSortLabel
                active={sortConfig.key === 'date'}
                direction={sortConfig.key === 'date' ? sortConfig.direction : 'asc'}
                onClick={() => requestSort('date')}
              >
                Date
              </TableSortLabel>
            </TableCell>
            <TableCell>Order ID</TableCell>
            <TableCell sortDirection={sortConfig.key === 'price' ? sortConfig.direction : false}>
              <TableSortLabel
                active={sortConfig.key === 'price'}
                direction={sortConfig.key === 'price' ? sortConfig.direction : 'asc'}
                onClick={() => requestSort('price')}
              >
                Price
              </TableSortLabel>
            </TableCell>
            <TableCell>Total Items</TableCell>
            <TableCell sortDirection={sortConfig.key === 'city' ? sortConfig.direction : false}>
              <TableSortLabel
                active={sortConfig.key === 'city'}
                direction={sortConfig.key === 'city' ? sortConfig.direction : 'asc'}
                onClick={() => requestSort('city')}
              >
                City
              </TableSortLabel>
            </TableCell>
            <TableCell>Status</TableCell>
          </TableRow>
        </TableHead>
        <TableBody>
          {sortedAndFilteredOrders().length > 0 &&
            sortedAndFilteredOrders().map((order) => (
              <React.Fragment key={order._id}>
                <TableRow>
                  <TableCell>
                    <IconButton
                      onClick={() => toggleRowExpansion(order._id)}
                      aria-label="expand row"
                      size="small"
                    >
                      {expandedRows.includes(order._id) ? (
                        <KeyboardArrowUp />
                      ) : (
                        <KeyboardArrowDown />
                      )}
                    </IconButton>
                  </TableCell>
                  <TableCell>
                    {order?.shippingAddress?.firstName}{" "}
                    {order?.shippingAddress?.lastName}
                  </TableCell>
                  <TableCell>{order?.user?.email}</TableCell>
                  <TableCell>{order?.shippingAddress?.mobile}</TableCell>
                  <TableCell>
                    {formatDate(order?.shippingAddress?.DateInfo)}
                  </TableCell>
                  <TableCell>{order?._id}</TableCell>
                  <TableCell>₹{order.totalDiscountedPrice}</TableCell>
                  <TableCell>{order.totalItem}</TableCell>
                  <TableCell>{order?.shippingAddress?.city}</TableCell>
                  <TableCell>{order.orderStatus}</TableCell>
                </TableRow>
                <TableRow>
                  <TableCell
                    style={{
                      paddingBottom: 0,
                      paddingTop: 0,
                      backgroundColor: expandedRows.includes(order._id)
                        ? "#f9f9f9" // Change to desired color when expanded
                        : "inherit",
                    }}
                    colSpan={10} // Updated column span
                  >
                    <Collapse
                      in={expandedRows.includes(order._id)}
                      timeout="auto"
                      unmountOnExit
                    >
                      <Box margin={2}>
                        <div className="flex justify-between">
                          <div>
                            <Typography variant="h6" gutterBottom component="div">
                              Shipping Address
                            </Typography>
                            <Typography variant="body1" style={{ marginTop: 16 }}>
                              {order.shippingAddress?.firstName}{" "}
                              {order.shippingAddress?.lastName}
                            </Typography>
                          </div>
                          <div className="w-[300px]">
                            <FormControl fullWidth>
                              <InputLabel className="-mt-1.5" id={`status-label-${order._id}`}>
                                Update Order Status
                              </InputLabel>
                              <Select
                                labelId={`status-label-${order._id}`}
                                value={orderStatus[order._id] || order.orderStatus}
                                onChange={(e) =>
                                  handleStatusChange(order._id, e.target.value)
                                }
                              >
                                <MenuItem value="Shipped">Shipped</MenuItem>
                                <MenuItem value="Delivered">Delivered</MenuItem>
                              </Select>
                            </FormControl>
                          </div>

                        </div>

                        <Typography variant="body1">
                          {order.shippingAddress?.streetAddress},{" "}
                          {order.shippingAddress?.city},{" "}
                          {order.shippingAddress?.state} -{" "}
                          {order.shippingAddress?.zipCode}
                        </Typography>
                        <Typography variant="body1">
                          Mobile: {order.shippingAddress?.mobile}
                        </Typography>

                        <Typography
                          variant="h6"
                          gutterBottom
                          component="div"
                          style={{ marginTop: "16px" }}
                        >
                          Order Items
                        </Typography>
                        <Table size="small" aria-label="order-items">
                          <TableHead>
                            <TableRow>
                              <TableCell>Image</TableCell>
                              <TableCell>Item ID</TableCell>
                              <TableCell>Product</TableCell>
                              <TableCell>Size</TableCell>
                              <TableCell>Quantity</TableCell>
                              <TableCell>Price</TableCell>
                              <TableCell>Discounted Price</TableCell>
                            </TableRow>
                          </TableHead>
                          <TableBody>
                            {order.orderItems && order.orderItems.length>0 && order.orderItems.map((item) => (
                              <TableRow key={item._id}>
                                <TableCell>
                                  {item?.product?.imageUrl &&
                                    item?.product?.imageUrl.length > 0 ? (
                                    <img
                                      src={`${item?.product?.imageUrl[item?.product?.defaultImageIndex]}@lq`}
                                      alt="Item"
                                      style={{ width: "50px", height: "auto" }}
                                    />
                                  ) : (
                                    "No Image"
                                  )}
                                </TableCell>
                                <TableCell>{item?.product?.SKU}</TableCell>
                                <TableCell>{item?.product?.title}</TableCell>
                                <TableCell>{item?.size}</TableCell>
                                <TableCell>{item?.quantity}</TableCell>
                                <TableCell>₹{item?.price}</TableCell>
                                <TableCell>₹{item?.discountedPrice}</TableCell>
                              </TableRow>
                            ))}
                          </TableBody>
                        </Table>
                      </Box>
                    </Collapse>
                  </TableCell>
                </TableRow>
              </React.Fragment>
            ))}
        </TableBody>
      </Table>
    </TableContainer>
    {adminOrder?.loading && <div className="absolute w-[100vw] h-[100vh] bg-black/10 flex items-center justify-center">
      <Loading/>
    </div>}
    </>);
};

export default OrdersList;
