import React, { useEffect, useState, useMemo, useCallback } from "react";
import { Link, useLocation, useNavigate } from "react-router-dom";
import { Avatar, Menu, MenuItem } from "@mui/material";
import { Collapse, Typography, List, ListItem } from "@material-tailwind/react";
import {
  UserCircleIcon,
  ShoppingBagIcon,
  Bars3Icon,
  XMarkIcon,
} from "@heroicons/react/24/outline";
import { colors } from "../../../constant";

import AuthModal from "../../Auth/AuthModal";
import { useDispatch, useSelector } from "react-redux";
import { getUser, logout } from "../../../State/Auth/Action";

import SearchBar from "./SearchBar";
import { setAuthModal } from "../../../State/Auth/Action";
import { getCart } from "../../../State/Cart/Action";
import { getCoupons } from "../../../State/Coupon/Action";
import { getWallet } from "../../../State/Wallet/Action";
import debounce from "lodash.debounce";


function NavList({ search, setSearch, closeNav }) {
  const navigate = useNavigate();

  const handleScrollToSection = (event, section) => {
    event.preventDefault();
    closeNav();
    navigate('/');
    setTimeout(() => {
      const element = document.getElementById(section);
      
      if (element) {
        element.scrollIntoView({ behavior: 'smooth' });
      }

    }, 0);
  };

  return (
    <List className={`flex gap-4 text-[${colors["primary-100"]}] items-center lg:flex-row flex-col lg:items-center lg:w-auto w-full rounded-b-lg bg-slate-50`}>
      <Typography>
        <ListItem className="lg:hidden bg-gray-50">
          <SearchBar search={search} setSearch={setSearch} />
        </ListItem>
      </Typography>
      <div className="flex flex-col lg:flex-row lg:divide-x leading-1 lg:divide-gray-300 gap-4 tracking-wide whitespace-nowrap text-normal">
        <div  variant="h6" className={`flex justify-center sm:block font-roboto tracking-widest text-[${colors["primary-100"]}] cursor-pointer hover:text-[${colors["primary-200"]}] `}>
          <span onClick={(e)=>handleScrollToSection(e,'collection-section')}>COLLECTIONS</span>
        </div>
        {/* <Typography as={Link} to="/about" variant="h6" className="font-heading">
          <ListItem>About Us</ListItem>
        </Typography> */}
        <div onClick={(e)=> handleScrollToSection(e, 'top-selling-section')}  className={`lg:pl-4 flex justify-center sm:block font-roboto text-[${colors["primary-100"]}] cursor-pointer hover:text-[${colors["primary-200"]}]`}>
          TOP SELLING
        </div>

        <div onClick={()=> {closeNav(); navigate("/women-warriors")}}  className={`lg:pl-4 flex justify-center sm:block font-roboto text-[${colors["primary-100"]}]  cursor-pointer hover:text-[${colors["primary-200"]}]`}>
          WOMEN WARRIORS
        </div>
      </div>
    </List>
  );
}

export default function Head({ search, setSearch, openAuthModal, setOpenAuthModal }) {
  const [openNav, setOpenNav] = useState(false);
  const navigate = useNavigate();
  const [anchorEl, setAnchorEl] = useState(null);
  const openUserMenu = Boolean(anchorEl);
  const dispatch = useDispatch();
  const location = useLocation();
  const jwt = localStorage.getItem("jwt");
  const auth = useSelector((state) => state.auth);
  const cartContent = useSelector(state=>state.cart);
  console.log(cartContent, 'item in cart');
  const [totalCartItemQuantity, setTotalCartItemQuantity] = useState(0);
  const {user, error, showAuthModal} = auth;
  const [type, setType] = useState('login');
  const coinBalance = useSelector(state=>state.wallet).balance;


  useEffect(()=>{
      let totalQuantity = 0;
      if(cartContent?.cartItems?.length > 0 ?? false){
          cartContent?.cartItems.forEach(item=>{
            totalQuantity+= item?.quantity;
          });
      }
    
      setTotalCartItemQuantity(totalQuantity);
  },[cartContent]);


  const handleOpen = () => {
    console.log('dispatching setAuthModal to open')
    setOpenAuthModal(true);
    dispatch(setAuthModal(true));
    console.log(auth)
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
    dispatch(setAuthModal(false));
  };

  const handleLogout = () => {
    dispatch(logout());
    handleCloseUserMenu();
    setTotalCartItemQuantity(0);
  };

  useEffect(()=>{
    console.log(showAuthModal, 'show auth modal');
  },[auth])

  useEffect(() => {
    if(jwt && auth.error != 'jwt expired'){
      dispatch(getUser(jwt));
    }else if (location.pathname === '/login') {
      handleOpen();
    }
  }, [jwt, location.pathname, dispatch]);

  useEffect(() => {
    if (auth.user) {
      handleClose();
    }
   
  }, [auth.user]);

  const isAdmin = auth?.user?.role === "ADMIN";

  const closeNav = () => {
    setOpenNav(false);
    dispatch(setAuthModal(false));
  }


  useEffect(()=>{
    if(auth.user){
      debounce(()=>{
        dispatch(getCart(jwt));
        dispatch(getWallet());
        dispatch(getCoupons());
      },300);
    }
   
},[auth])

  return (
    <div className="fixed h-[60px] top-0 z-[100] bg-slate-50 w-full shadow-sm">
      <div className={`flex items-center justify-between text-[${colors["primary-100"]}]`}>
        
        <div
          onClick={()=>navigate('/')}
          className="relative w-[280px] h-[60px] relative cursor-pointer flex items-center gap-1 ml-4"
        >
          <img
            src="/images/logo.png"
            alt="Empressa"
            className="h-10 w-10"
          />
          <div className={`text-black font-sans font-thin tracking-tight`}>
            EMPRESSA
          </div>
        </div>

        <div className="hidden lg:block">
          <NavList search={search} setSearch={setSearch} closeNav={closeNav} />
        </div>

        <div className="flex items-end gap-4 mr-4">
          <div className="hidden sm:block">
            <SearchBar search={search} setSearch={setSearch} />
          </div>
          {/* coin balance section begin-- */}
          {auth.user && <div className="flex items-center w-[90px] h-8 rounded-md relative bg-[#9a5938] px-2 justify-between">
            <img src='/images/coin_0.png' className="w-6 h-6"/>
            <span className="text-white font-fantasy text-sm font-semibold text-[14px]">{coinBalance}</span>
            {/* <div className="absolute left-4 -translate-x-[50%] -bottom-1 font-semibold rounded-sm text-[9px] bg-gray-500 text-white px-[4px]">500</div> */}
            <div className="absolute left-0 -bottom-1 rounded-lg border border-b border-b-[1px] border-gray-400 w-full h-[6px] flex bg-white">
              <div
                style={{width: `${coinBalance / 10}%`}} 
                className={`w-[${coinBalance/1000}%] bg-yellow-600 rounded-sm h-[4px]`}/>
              <div className="flex-2 bg-white rounded-sm"/>
            </div>
          </div>}
          {/* coin balance section end --- */}
          <div className="flex items-center">
            {auth.user ? (
              <div>
                <div
                  className={`h-8 w-8 flex items-center justify-center text-[${colors["primary-100"]}] text-white bg-gray-600 rounded-full cursor-pointer`}
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
                className="h-8 w-8 cursor-pointer text-gray-600"
                onClick={handleOpen}
                style={{ strokeWidth: "1" }}
              />
            )}
          </div>
          <div className="flex items-center relative">
            <Link to="/cart">
              <ShoppingBagIcon className="h-8 w-8 cursor-pointer " style={{ strokeWidth: "1" }} />
            </Link>
            {totalCartItemQuantity > 0 && <div className="absolute font-semibold w-4 h-4 bg-red-500 -top-[6px] -right-2 sm:-right-2 rounded-full text-xs text-gray-100 flex items-center justify-center">
                {totalCartItemQuantity}
            </div>}
          </div>
          <div className="lg:hidden mr-2 cursor-pointer" onClick={() => setOpenNav(!openNav)}>
            {openNav ? <XMarkIcon className="h-8 w-8 text-gray-500" /> : <Bars3Icon className="h-8 w-8 text-gray-500" />}
          </div>
        </div>
      </div>

      <Collapse open={openNav}>
        <div className="lg:hidden">
          <NavList search={search} setSearch={setSearch} closeNav={closeNav} />
        </div>
      </Collapse>

      <AuthModal open={openAuthModal} handleClose={handleClose} type={type} setType={setType} />
    </div>
  );
}
