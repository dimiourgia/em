import React, { useState, useEffect } from "react";
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
    city: "",
    state: "",
    zipCode: ""
  });
  const [zipError, setZipError] = useState(""); // State for ZIP code error message

  const handleSubmit = (event) => {
    event.preventDefault();
    const data = new FormData(event.currentTarget);

    const addressData = {
      firstName: data.get("firstName"),
      lastName: data.get("lastName"),
      streetAddress: data.get("address"),
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
    const zipCode = event.currentTarget.value.trim(); // Trim leading and trailing spaces
    setAddress(prevAddress => ({ ...prevAddress, zipCode })); // Update ZIP code in address state

    if (zipCode.length !== 6) {
      setZipError("ZIP code must be 6 digits");
      setAddress(prevAddress => ({ ...prevAddress, city: "", state: "" })); // Reset city and state
      return;
    } else {
      setZipError("");
    }

    try {
      const response = await axios.get(`https://api.postalpincode.in/pincode/${zipCode}`);
      const data = response.data[0];

      if (data.Status === "Success" && data.PostOffice.length > 0) {
        const { District: city, State: state } = data.PostOffice[0];
        setAddress(prevAddress => ({ ...prevAddress, city, state })); // Update city and state
      } else {
        setAddress(prevAddress => ({ ...prevAddress, city: "", state: "" })); // Reset city and state
      }
    } catch (error) {
      console.error("Error fetching post office details:", error);
      setAddress(prevAddress => ({ ...prevAddress, city: "", state: "" })); // Reset city and state on error
    }
  };

  return (
    <Grid container spacing={4}>
      <Grid item xs={12} lg={2}></Grid>
      <Grid item xs={12} lg={7}>
        <Box className="border rounded-md shadow-md p-5">
          <form onSubmit={handleSubmit}>
            <Grid container spacing={3}>
              <Grid item xs={12} sm={6}>
                <TextField
                  required
                  id="firstName"
                  name="firstName"
                  label="First Name"
                  fullWidth
                  autoComplete="given-name"
                  multiline
                  value={address.firstName}
                  onChange={(e) => setAddress({ ...address, firstName: e.target.value })}
                />
              </Grid>
              <Grid item xs={12} sm={6}>
                <TextField
                  required
                  id="lastName"
                  name="lastName"
                  label="Last Name"
                  fullWidth
                  autoComplete="given-name"
                  multiline
                  value={address.lastName}
                  onChange={(e) => setAddress({ ...address, lastName: e.target.value })}
                />
              </Grid>
              <Grid item xs={12}>
                <TextField
                  required
                  id="address"
                  name="address"
                  label="Address"
                  fullWidth
                  autoComplete="shipping address"
                  multiline
                  rows={4}
                  value={address.streetAddress}
                  onChange={(e) => setAddress({ ...address, streetAddress: e.target.value })}
                />
              </Grid>
              <Grid item xs={12} sm={6}>
                <TextField
                  required
                  id="zip"
                  name="zip"
                  label="Zip / Postal code"
                  fullWidth
                  autoComplete="shipping postal-code"
                  multiline
                  value={address.zipCode}
                  onChange={handleZipCodeChange}
                  error={!!zipError} // Apply error style based on presence of error message
                  helperText={zipError} // Display error message
                />
              </Grid>
              <Grid item xs={12} sm={6}>
                <TextField
                  required
                  id="city"
                  name="city"
                  label="City"
                  fullWidth
                  autoComplete="shipping address-level2"
                  multiline
                  value={address.city}
                  onChange={(e) => setAddress({ ...address, city: e.target.value })}
                />
              </Grid>
              <Grid item xs={12} sm={6}>
                <TextField
                  required
                  id="state"
                  name="state"
                  label="State/Province/Region"
                  fullWidth
                  multiline
                  value={address.state}
                  onChange={(e) => setAddress({ ...address, state: e.target.value })}
                />
              </Grid>
              <Grid item xs={12} sm={6}>
                <TextField
                  required
                  id="phoneNumber"
                  name="phoneNumber"
                  label="Phone Number"
                  fullWidth
                  autoComplete="tel"
                  multiline
                  value={phoneNumber}
                  onChange={handlePhoneNumberChange}
                />
              </Grid>
              <Grid item xs={12}>
                <button
                  sx={{ padding: ".9rem 1.5rem" }}
                  size="large"
                  type="submit"
                  variant="contained"
                  className="bg-black text-white py-3 px-8 mt-8 transition duration-300 ease-in-out hover:bg-gray-800 hover:text-gray-300"
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
