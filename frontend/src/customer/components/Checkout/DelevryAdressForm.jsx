import React, { useEffect, useState } from "react";
import { Grid, TextField, Box, Typography } from "@mui/material";
import { useNavigate } from "react-router-dom";
import { useDispatch, useSelector } from "react-redux";
import { createOrder } from "../../../State/Order/Action";
import {findAddress} from "../../../State/Address/Action"
import axios from "axios";
import AddressCard from "../AdressCard/AdressCard";
import Button from "../Button/Index";
import Loading from "../Loader/Index";

export default function DeliveryAddressForm({ handleNext }) {
  const navigate = useNavigate();
  const dispatch = useDispatch();
  const jwt = localStorage.getItem("jwt");
  const [phoneNumber, setPhoneNumber] = useState("");
  const {user} = useSelector(state=>state.auth);
  const [addNewAddres, setAddNewAddress] = useState();
  const storedAddresses_selector = useSelector(state=>state.address);
  const storedAddresses = storedAddresses_selector.addresses;
  const [isNextDisabled, setIsNextDisabled] = useState(true);
  
  console.log(user, 'user from checkout')
  const [address, setAddress] = useState({
    firstName: user?.firstName??"",
    lastName: user?.lastName??"",
    streetAddress: "",
    houseNumber: "", 
    city: "",
    state: "",
    zipCode: ""
  });

  const [zipError, setZipError] = useState("");

  const handleSubmit = (event) => {
    event.preventDefault();
    const data = new FormData(event.currentTarget);

    const addressData = {
      firstName: data.get("firstName"),
      lastName: data.get("lastName"),
      streetAddress: data.get("address"),
      houseNumber: data.get("houseNumber"),
      city: data.get("city"),
      state: data.get("state"),
      zipCode: data.get("zip"),
      mobile: phoneNumber,
    };

    dispatch(createOrder({ address: addressData, jwt, navigate }));
    handleNext();
  };

  const handlePhoneNumberChange = (event) => {
    const value = event.target.value;
    if (/^\d*$/.test(value)) {
      setPhoneNumber(value);
    }
  };

  const handleZipCodeChange = async (event) => {
    const zipCode = event.currentTarget.value.trim();
    setAddress(prevAddress => ({ ...prevAddress, zipCode }));

    if (zipCode.length !== 6) {
      setZipError("ZIP code must be a 6 digits number");
      setAddress(prevAddress => ({ ...prevAddress, city: "", state: "" }));
      return;
    } else {
      setZipError("");
    }

    try {
      const response = await axios.get(`https://api.postalpincode.in/pincode/${zipCode}`);
      const data = response.data[0];

      if (data.Status === "Success" && data.PostOffice.length > 0) {
        const { District: city, State: state } = data.PostOffice[0];
        setAddress(prevAddress => ({ ...prevAddress, city, state }));
      } else {
        setAddress(prevAddress => ({ ...prevAddress, city: "", state: "" }));
      }
    } catch (error) {
      console.error("Error fetching post office details:", error);
      setAddress(prevAddress => ({ ...prevAddress, city: "", state: "" }));
    }
  };

  const handleAddressSelect = (address) => {
    setAddress(address);
  };

  useEffect(()=>{
    if(user){
      dispatch(findAddress(user._id))
    }
  },[user]);

  useEffect(()=>{
    console.log(storedAddresses, 'stored addresses');
    if(storedAddresses && storedAddresses.length > 0){
      setAddNewAddress(false);
    }else setAddNewAddress(true);
  },[storedAddresses])

  const isValidAddress = (address) => {
    const requiredFields = ['firstName', 'lastName', 'streetAddress', 'houseNumber', 'city', 'state', 'zipCode'];
    
    for (let field of requiredFields) {
      if (!address[field] || address[field].trim() === "") {
        return false;
      }
    }
    
    return true;
  };

  const handleProceed = ()=>{
    if(isValidAddress(address)){
      dispatch(createOrder({ address, jwt, navigate }));
      handleNext();
    }
  }

  useEffect(()=>{
    console.log(storedAddresses_selector, 'storedAddresses_selector')
  },[storedAddresses_selector])


  useEffect(()=>{
    if(isValidAddress(address)){
      setIsNextDisabled(false);
    }else setIsNextDisabled(true);
  },[address])

  return (<div className="min-h-[100vh-60px] w-full flex items-center justify-center">
    {storedAddresses && !storedAddresses_selector.loading && <div>
        {(storedAddresses && storedAddresses.length >0 && !addNewAddres) && <div className="w-full flex flex-col justify-center items-center px-6">
          <p className="text-roboto text-xl sm:text-2xl mt-4 py-4 text-semibold text-gray-600 max-w-[450px] flex justify-start">Select an address to continue</p>
            <div className="flex flex-col gap-4 mt-10">
              {storedAddresses.map(address_=><SelectableAddressCard address={address_} onSelect={handleAddressSelect} isSelected={address && address?._id === address_._id} />)}
            </div>
            <div className="w-full max-w-[450px] flex justify-between">
              <p className="text-blue-800 cursor-pointer mt-10  px-4 py-2" onClick={()=>setAddNewAddress(true)}>+ Add new address</p>
              <p className={`${isNextDisabled? 'text-gray-400 border-gray-100 cursor-not-allowed' : 'text-blue-800 border-blue-500 hover:bg-blue-100 hover:text-white cursor-pointer'} mt-10  px-4 py-2 border border-sm`} onClick={handleProceed}>Proceed</p>
            </div>
          </div>}

        {(addNewAddres) && <Grid container spacing={8} className="flex items-center justify-center px-6">
          <Grid item xs={12} lg={10}>
            <Box className="border bg-white rounded-md shadow-md p-5">
              <form onSubmit={handleSubmit}>
                <Grid container spacing={3}>
                  <Grid item xs={12} sm={6}>
                    <Typography sx={{fontSize:"15px", ml:"4px"}}>First Name</Typography>
                    <TextField
                      required
                      name="firstName"
                      placeholder="First Name"
                      fullWidth
                      autoComplete="given-name"
                      value={address.firstName}
                      onChange={(e) => setAddress({ ...address, firstName: e.target.value })}
                    />
                  </Grid>
                  <Grid item xs={12} sm={6}>
                  <Typography sx={{fontSize:"15px", ml:"4px"}}>Last Name</Typography>
                    <TextField
                      required
                      name="lastName"
                      placeholder="Last Name"
                      fullWidth
                      autoComplete="family-name"
                      value={address.lastName}
                      onChange={(e) => setAddress({ ...address, lastName: e.target.value })}
                    />
                  </Grid>
                  <Grid item xs={12} sm={12}>
                  <Typography sx={{fontSize:"15px", ml:"4px"}}>House No./Locality</Typography>
                    <TextField
                      required
                      name="houseNumber"
                      placeholder="House No./Locality"
                      fullWidth
                      autoComplete="shipping address-line1"
                      value={address.houseNumber}
                      onChange={(e) => setAddress({ ...address, houseNumber: e.target.value })}
                    />
                  </Grid>
                  <Grid item xs={12}>
                  <Typography sx={{fontSize:"15px", ml:"4px"}}>Area and Street</Typography>
                    <TextField
                      required
                      name="address"
                      placeholder="Shipping Address (Area and Street)"
                      fullWidth
                      autoComplete="shipping address"
                      value={address.streetAddress}
                      onChange={(e) => setAddress({ ...address, streetAddress: e.target.value })}
                    />
                  </Grid>
                  <Grid item xs={12} sm={6}>
                  <Typography sx={{fontSize:"15px", ml:"4px"}}>Postal Code</Typography>
                    <TextField
                      required
                      name="zip"
                      placeholder="Zip / Postal code"
                      fullWidth
                      autoComplete="shipping postal-code"
                      value={address.zipCode}
                      onChange={handleZipCodeChange}
                      error={!!zipError} // Apply error style based on presence of error message
                      helperText={zipError} // Display error message
                    />
                  </Grid>
                  <Grid item xs={12} sm={6}>
                  <Typography sx={{fontSize:"15px", ml:"4px"}}>City</Typography>
                    <TextField
                      required
                      name="city"
                      placeholder="City"
                      fullWidth
                      autoComplete="shipping address-level2"
                      value={address.city}
                      onChange={(e) => setAddress({ ...address, city: e.target.value })}
                    />
                  </Grid>
                  <Grid item xs={12} sm={6}>
                  <Typography sx={{fontSize:"15px", ml:"4px"}}>State</Typography>
                    <TextField
                      required
                      name="state"
                      placeholder="State/Province/Region"
                      fullWidth
                      value={address.state}
                      onChange={(e) => setAddress({ ...address, state: e.target.value })}
                    />
                  </Grid>
                  <Grid item xs={12} sm={6}>
                  <Typography sx={{fontSize:"15px", ml:"4px"}}>Phone Number</Typography>
                    <TextField
                      required
                      name="phoneNumber"
                      placeholder="Phone Number"
                      fullWidth
                      autoComplete="tel"
                      value={phoneNumber}
                      onChange={handlePhoneNumberChange}
                    />
                  </Grid>
                  <Grid item xs={12} className="flex justify-center">
                    <Button text='Deliver Here' type="submit"/>
                  </Grid>
                </Grid>
              </form>
            </Box>
          </Grid>
        </Grid>}
    </div>}
    {(!storedAddresses_selector || storedAddresses_selector.loading) && <Loading/>}
    </div>);
}


const SelectableAddressCard = ({ address, onSelect, isSelected }) => (
  <div 
    className={`${isSelected ? 'border border-[2px] border-blue-500' : 'border border-[1px] border-gray-200'} rounded max-w-[450px] px-6 py-4 cursor-pointer`}
    onClick={() => onSelect(address)} 
  >
    <AddressCard address={address} /> 
  </div>
);