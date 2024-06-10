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

import SearchBar from "./SearchBar"; // Import the SearchBar component
import { MenuItems } from "@headlessui/react";

function NavList() {
  return (
    <List className="flex lg:ml-[200px] items-center lg:flex-row flex-col lg:items-center lg:w-auto w-full">
      <Typography>
        <ListItem>
          <div className="lg:hidden">
            <SearchBar /> {/* Use SearchBar component for mobile view */}
          </div>
        </ListItem>
      </Typography>
      <Typography
        as={Link}
        to="/products"
        variant="small"
        color="blue-gray"
        className="font-medium text-base uppercase font-abc"
      >
        <ListItem>Our Products</ListItem>
      </Typography>

      <Typography
        as={Link}
        to="/about"
        variant="small"
        color="blue-gray"
        className="font-medium text-base uppercase font-abc"
      >
        <ListItem>About Us</ListItem>
      </Typography>
      <Typography
        as={Link}
        to="/journal"
        variant="small"
        color="blue-gray"
        className="font-medium text-base uppercase font-abc"
      >
        <ListItem>Journal</ListItem>
      </Typography>
    </List>
  );
}

export default function Head() {
  const [openNav, setOpenNav] = useState(false);
  const navigate = useNavigate();
  const [openAuthModal, setOpenAuthModal] = useState(false);
  const [anchorEl, setAnchorEl] = useState(null);
  const openUserMenu = Boolean(anchorEl);

  const dispatch = useDispatch();
  const location = useLocation();
  const jwt = localStorage.getItem("jwt");
  const auth = useSelector((state) => state.auth);

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

  const handleOpen = () => {
    console.log("handle check karna hai")
    setOpenAuthModal(true);
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
    } else {
      if (location.pathname === "/login" && !jwt) {
        setOpenAuthModal(true);
      }
    }
  }, [jwt, auth.jwt]);

  useEffect(() => {
    if (auth.user) {
      handleClose();
    }
    if (location.pathname === "/login" || location.pathname === "/register") {
      navigate(-1);
    }
  }, [auth.user]);

  const isAdmin = auth?.user?.role == "ADMIN";

  return (
    <div className="nav-container mx-auto bg-white">
      <div className="bg-[#e8e2b0] text-black py-1 text-center overflow-hidden">
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
          className="cursor-pointer py-0.5 align-items-center ml-10 flex flex-col items-center"
        >
          <img
            src="https://res.cloudinary.com/du5p1rnil/image/upload/v1712815729/empressa/trlajilv4tdjxco53foy.png"
            alt="Empressa"
            className="h-20 w-20"
          />
          <Typography variant="small" color="blue-gray" className="mt-0.25 ">
            EMPRESSA
          </Typography>
        </Typography>

        <div className="hidden lg:block">
          <NavList />
        </div>
        <div className="flex md:ml-[564px] lg:ml-0  ml-[130px] m items-center justify-center">
          <div className="mx-auto w-max lg:block hidden">
            <SearchBar /> {/* Use SearchBar component for desktop view */}
          </div>

          <div className="mb-1">
            {auth.user ? (
              <div>
                <Avatar
                  className="h-7 w-7 mt-1 ml-2 text-white cursor-pointer"
                  onClick={handleUserClick}
                  aria-controls={openNav ? "basic-menu" : undefined}
                  aria-haspopup="true"
                  aria-expanded={openNav ? "true" : undefined}
                >
                  {auth.user?.firstName[0].toUpperCase()}
                </Avatar>
                <Menu
                  id="basic-menu"
                  anchorEl={anchorEl}
                  open={openUserMenu}
                  onClose={handleCloseUserMenu}
                  MenuListProps={{ "aria-labelledby": "user-circle" }}
                >
                  <MenuItem onClick={() => handleMenuItemClick("/profile")}>
                    Profile
                  </MenuItem>
                  <MenuItem onClick={() => handleMenuItemClick("/order")}>
                    My Orders
                  </MenuItem>
                  {
                  isAdmin && 
                    <Link to={"/admin"}>
                      <MenuItem>DashBoard</MenuItem>
                    </Link>
                  }
                  <MenuItem
                    onClick={() => {
                      handleLogout();
                      handleCloseUserMenu();
                    }}
                  >
                    Logout
                  </MenuItem>
                </Menu>
              </div>
            ) : (
              <div onClick={handleOpen}>
              <UserCircleIcon
                className="h-7 w-7 mt-1 cursor-pointer active:scale-50 ml-2"
              />
              </div>
            )}
          </div>
          <div className="mb-2">
            <Link to="/cart" className="group flex items-center p-2">
              <ShoppingBagIcon
                className="h-7 w-7 mt-1 cursor-pointer active:scale-50"
                aria-hidden="true"
              />
              <span className="ml-2 text-sm font-medium text-gray-700 group-hover:text-gray-800">
                {/* Display cart item count here */}
              </span>
              <span className="sr-only">items in cart, view bag</span>
            </Link>
          </div>
        </div>

        <div
          color="blue-gray"
          className="lg:hidden mr-[30px]"
          onClick={() => setOpenNav(!openNav)}
          style={{ position: "relative" }}
        >
          {openNav ? (
            <XMarkIcon className="absolute inset-0 m-auto h-6 w-6" />
          ) : (
            <Bars3Icon className="absolute inset-0 m-auto h-6 w-6" />
          )}
        </div>
      </div>
      <Collapse open={openNav}>
        <NavList />
      </Collapse>

      <AuthModal open={openAuthModal} handleClose={handleClose} />
    </div>
  );
}
