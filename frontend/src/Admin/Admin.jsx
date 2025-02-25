import React from "react";
import {
  Box,
  CssBaseline,
  List,
  ListItem,
  ListItemButton,
  ListItemIcon,
  ListItemText,
} from "@mui/material";
import { Route, Routes, Navigate, useNavigate } from "react-router-dom";
import { useSelector } from "react-redux";
import DashboardIcon from "@mui/icons-material/Dashboard";
import Dashboard from "./components/Dashboard";
import CreateProductForm from "./components/CreateProductForm";
import ProductsTable from "./components/ProductsTable";
import OrdersTable from "./components/OrdersTable";
import JournalAdmin from "../customer/components/Journal/JournalAdmin";
import CreateJournalForm from "./components/CreateJournalForm";
import EditJournalForm from "./components/EditJournalForm";


const menu = [
  { name: "Products", path: "/admin/products", icon: <DashboardIcon /> },
  { name: "AddProduct", path: "/admin/product/create", icon: <DashboardIcon /> },
  { name: "OrdersTable", path: "/admin/orders", icon: <DashboardIcon /> },
  { name: "Journals", path: "/admin/journals", icon: <DashboardIcon /> },
  { name: "AddJournals", path: "/admin/journals/create", icon: <DashboardIcon /> },
  // { name: "Edit_Journals", path: "admin/journals/edit/:id", icon: <DashboardIcon /> },

];

const Admin = () => {
  const { user } = useSelector((state) => state.auth);
  const navigate = useNavigate();
  const isAdmin = user && user.role === "ADMIN";

  console.log(user, isAdmin, 'is user admin')

  const drawer = (
    <Box
      sx={{
        overflow: "auto",
        display: "flex",
        flexDirection: "column",
        justifyContent: "space-between",
        height: "100%",
      }}
    >
      <List>
        {menu.map((item) => (
          <ListItem key={item.name} disablePadding onClick={() => navigate(item.path)}>
            <ListItemButton>
              <ListItemIcon>{item.icon}</ListItemIcon>
              <ListItemText primary={item.name} />
            </ListItemButton>
          </ListItem>
        ))}
      </List>
      <List>
        <ListItem disablePadding>
          <ListItemButton>
            <ListItemText className="mx-auto flex justify-center items-center" >
              <button onClick={() => navigate("/")} className="text-white  bg-gray-900 focus:outline-none focus:ring-4 focus:ring-gray-300 font-medium text-sm px-5 py-2.5 dark:bg-gray-800 dark:hover:bg-gray-700 dark:focus:ring-gray-700 dark:border-gray-700">
                HOME
              </button>
            </ListItemText>
          </ListItemButton>
        </ListItem>
      </List>
    </Box>
  );

  return (
    <div className="flex h-[10vh]">
      <CssBaseline />
      <div className="w-[15%] border-r border-gray-300 h-full fixed top-0">
        {drawer}
      </div>
      <div className="w-[85%] h-full ml-[15%]">
        <Routes>
          {isAdmin ? (
            <>
              <Route path="/" element={<Dashboard />} />
              <Route path="/product/create" element={<CreateProductForm />} />
              <Route path="/products" element={<ProductsTable />} />
              <Route path="/orders" element={<OrdersTable />} />
              <Route path="/journals" element={<JournalAdmin />} />
              <Route path="/journals/create" element={<CreateJournalForm />} />
              <Route path="/journals/edit/:id" element={<EditJournalForm />} />
            </>
          ) : (
            <Route path="/*" element={<Navigate to="/" replace />} />
          )}
        </Routes>
      </div>
    </div>
  );
};

export default Admin;
