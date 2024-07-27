import React, { useState } from "react";
import { Grid, TextField, Box, Typography } from "@mui/material";
import { useNavigate } from "react-router-dom";
import { useDispatch } from "react-redux";
import { createOrder } from "../../../State/Order/Action";
import axios from "axios";

export default function DeliveryAddressForm({ handleNext }) {
  const navigate = useNavigate();
  const dispatch = useDispatch();
  const jwt = localStorage.getItem("jwt");
  const [phoneNumber, setPhoneNumber] = useState("");
  const [address, setAddress] = useState({
    firstName: "",
    lastName: "",
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

  return (
    <Grid container spacing={8} className="flex items-center justify-center">
      <Grid item xs={12} lg={10}>
        <Box className="border bg-gray-200 rounded-md shadow-md p-5">
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
                <button
                  sx={{ padding: ".9rem 1.5rem" }}
                  size="large"
                  type="submit"
                  variant="contained"
                  className="bg-gray-800 text-white rounded-lg py-3 px-8 mt-8 transition duration-300 ease-in-out hover:bg-gray-800 hover:text-gray-300"
                >
                  Deliver Here
                </button>
              </Grid>
            </Grid>
          </form>
        </Box>
      </Grid>
    </Grid>
  );
}
