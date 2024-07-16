import React, { useEffect, useState } from "react";
import { Link, useLocation, useNavigate } from "react-router-dom";
import { Avatar, Menu, MenuItem } from "@mui/material";
import { Collapse, Typography, List, ListItem } from "@material-tailwind/react";
import {
  UserCircleIcon,
  ShoppingBagIcon,
  Bars3Icon,
  XMarkIcon,
} from "@heroicons/react/24/outline";

import AuthModal from "../../Auth/AuthModal";
import { useDispatch, useSelector } from "react-redux";
import { getUser, logout } from "../../../State/Auth/Action";
import FiberManualRecordIcon from "@mui/icons-material/FiberManualRecord";

import SearchBar from "./SearchBar";

function NavList({ search, setSearch }) {
  return (
    <List className="flex lg:ml-[200px] items-center lg:flex-row flex-col lg:items-center lg:w-auto w-full">
      <Typography>
      <ListItem className="lg:hidden">
        <SearchBar search={search} setSearch={setSearch} />
      </ListItem>
      </Typography>
      <Typography as={Link} to="/products" variant="h6" className="font-heading">
        <ListItem>Our Products</ListItem>
      </Typography>
      <Typography as={Link} to="/about" variant="h6" className="font-heading">
        <ListItem>About Us</ListItem>
      </Typography>
      <Typography as={Link} to="/journals" variant="h6" className="font-heading">
        <ListItem>Journal</ListItem>
      </Typography>
    </List>
  );
}

export default function Head({ search, setSearch }) {
  const [openNav, setOpenNav] = useState(false);
  const navigate = useNavigate();
  const [openAuthModal, setOpenAuthModal] = useState(false);
  const [anchorEl, setAnchorEl] = useState(null);
  const openUserMenu = Boolean(anchorEl);

  const dispatch = useDispatch();
  const location = useLocation();
  const jwt = localStorage.getItem("jwt");
  const auth = useSelector((state) => state.auth);

  const handleOpen = () => {
    setOpenAuthModal(true);
  };

  const handleUserClick = (event) => {
    setAnchorEl(event.currentTarget);
  };

  const handleMenuItemClick = (path) => {
    navigate(path);
    handleCloseUserMenu();
  };

  const handleCloseUserMenu = () => {
    setAnchorEl(null);
  };

  const handleClose = () => {
    setOpenAuthModal(false);
  };

  const handleLogout = () => {
    dispatch(logout());
    handleCloseUserMenu();
  };

  useEffect(() => {
    if (jwt) {
      dispatch(getUser(jwt));
    } else if (location.pathname === '/login') {
      handleOpen();
    }
  }, [jwt, location.pathname, dispatch]);

  useEffect(() => {
    if (auth.user) {
      handleClose();
    }
    if (location.pathname === "/login" || location.pathname === "/register") {
      navigate(-1);
    }
  }, [auth.user]);

  const isAdmin = auth?.user?.role === "ADMIN";

  return (
    <div className="pb-2">
      <div className="bg-[#eeeeee] py-1 text-center overflow-hidden">
        <div className="relative flex overflow-x-hidden">
          <div className="py-1 animate-marquee whitespace-nowrap">
            <span className="ml-8"></span>
            <FiberManualRecordIcon style={{ fontSize: "10px" }} />
            <span className="ml-8"></span>
            <span className="italic"> Be BOLD</span>
            <span className="ml-8"></span>
            <span className="italic">Be YOU</span>
            <span className="ml-8"></span>
            <span className="italic">Be UNSTOPPABLE</span>
            <span className="ml-8"></span>
            <FiberManualRecordIcon style={{ fontSize: "10px" }} />
            <span className="ml-8"></span>
            <span className="italic"> Be BOLD</span>
            <span className="ml-8"></span>
            <span className="italic">Be YOU</span>
            <span className="ml-8"></span>
            <span className="italic">Be UNSTOPPABLE</span>
            <span className="ml-8"></span>
            <FiberManualRecordIcon style={{ fontSize: "10px" }} />
            <span className="ml-8"></span>
            <span className="italic"> Be BOLD</span>
            <span className="ml-8"></span>
            <span className="italic">Be YOU</span>
            <span className="ml-8"></span>
            <span className="italic">Be UNSTOPPABLE</span>
            <span className="ml-8"></span>
            <FiberManualRecordIcon style={{ fontSize: "10px" }} />
            <span className="ml-8"></span>
            <span className="italic"> Be BOLD</span>
            <span className="ml-8"></span>
            <span className="italic">Be YOU</span>
            <span className="ml-8"></span>
            <span className="italic">Be UNSTOPPABLE</span>
          </div>

          <div className="absolute top-0 py-1 animate-marquee2 whitespace-nowrap">
            <span className="ml-8"></span>
            <FiberManualRecordIcon style={{ fontSize: "10px" }} />
            <span className="ml-8"></span>
            <span className="italic"> Be BOLD</span>
            <span className="ml-8"></span>
            <span className="italic">Be YOU</span>
            <span className="ml-8"></span>
            <span className="italic">Be UNSTOPPABLE</span>
            <span className="ml-8"></span>
            <FiberManualRecordIcon style={{ fontSize: "10px" }} />
            <span className="ml-8"></span>
            <span className="italic"> Be BOLD</span>
            <span className="ml-8"></span>
            <span className="italic">Be YOU</span>
            <span className="ml-8"></span>
            <span className="italic">Be UNSTOPPABLE</span>
            <span className="ml-8"></span>
            <FiberManualRecordIcon style={{ fontSize: "10px" }} />
            <span className="ml-8"></span>
            <span className="italic"> Be BOLD</span>
            <span className="ml-8"></span>
            <span className="italic">Be YOU</span>
            <span className="ml-8"></span>
            <span className="italic">Be UNSTOPPABLE</span>
            <span className="ml-8"></span>
            <FiberManualRecordIcon style={{ fontSize: "10px" }} />
            <span className="ml-8"></span>
            <span className="italic"> Be BOLD</span>
            <span className="ml-8"></span>
            <span className="italic">Be YOU</span>
            <span className="ml-8"></span>
            <span className="italic">Be UNSTOPPABLE</span>
          </div>
        </div>
      </div>

      <div className="flex items-center justify-between text-blue-gray-900">
        <Typography
          as={Link}
          to="/"
          className="cursor-pointer ml-10 flex flex-col items-center"
        >
          <img
            src="https://res.cloudinary.com/du5p1rnil/image/upload/v1712815729/empressa/trlajilv4tdjxco53foy.png"
            alt="Empressa"
            className="h-12 w-12"
          />
          <div className="font-heading">
            Empressa
          </div>
        </Typography>
        <div className="hidden lg:block">
          <NavList search={search} setSearch={setSearch} />
        </div>
        <div className="flex items-center">
          <div className="hidden lg:block p-1">
            <SearchBar search={search} setSearch={setSearch} />
          </div>
          <div className="flex items-center p-1">
            {auth.user ? (
              <div>
                <div
                  className="h-8 w-8 flex items-center justify-center bg-gray-400 text-white rounded-full cursor-pointer"
                  onClick={handleUserClick}
                  aria-controls={openUserMenu ? "basic-menu" : undefined}
                  aria-haspopup="true"
                  aria-expanded={openUserMenu ? "true" : undefined}
                >
                  {auth.user?.firstName[0].toUpperCase()}
                </div>

                <Menu
                  id="basic-menu"
                  anchorEl={anchorEl}
                  open={openUserMenu}
                  onClose={handleCloseUserMenu}
                  MenuListProps={{ "aria-labelledby": "user-circle" }}
                >
                  <MenuItem onClick={() => handleMenuItemClick("/order")}>My Orders</MenuItem>
                  {isAdmin && (
                    <MenuItem onClick={() => handleMenuItemClick("/admin")}>DashBoard</MenuItem>
                  )}
                  <MenuItem onClick={handleLogout}>Logout</MenuItem>
                </Menu>
              </div>
            ) : (
              <UserCircleIcon
                className="h-7 w-7 cursor-pointer"
                onClick={handleOpen}
                style={{ strokeWidth: "1" }}
              />
            )}
          </div>
          <div className="flex items-center p-1">
            <Link to="/cart">
              <ShoppingBagIcon className="h-6 w-6 lg:mr-2 cursor-pointer" style={{ strokeWidth: "1.1" }} />
            </Link>
          </div>
          <div className="lg:hidden ml-2 mr-2" onClick={() => setOpenNav(!openNav)}>
            {openNav ? <XMarkIcon className="h-6 w-6" /> : <Bars3Icon className="h-6 w-6" />}
          </div>
        </div>
      </div>

      <Collapse open={openNav}>
        <div className="lg:hidden">
          <NavList search={search} setSearch={setSearch} />
        </div>
      </Collapse>

      <AuthModal open={openAuthModal} handleClose={handleClose} />
    </div>
  );
}
