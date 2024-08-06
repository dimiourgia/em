import { Box, Modal } from "@mui/material";
import React from "react";
import RegisterForm from "./Register";
import LoginForm from "./Login";
import Forgot from "./Forgot";
import { useLocation } from "react-router-dom";

const style = {
  position: "absolute",
  top: "50%",
  left: "50%",
  transform: "translate(-50%, -50%)",
  width: { xs: 360, md: 500 },
  bgcolor: "white",
  outline: "none",
  boxShadow: 24,
  borderRadius: "10px",
  padding: "25px",
};

const AuthModal = ({ handleClose, open, type, setType}) => {
  const location = useLocation();

  return (
    <Modal
      open={open}
      onClose={handleClose}
      aria-labelledby="modal-modal-title"
      aria-describedby="modal-modal-description"
    >
      <Box sx={style}>
        {type == "register" ? (
          <RegisterForm setType={setType} />
        ) : type == "forgot-password" ? (
          <Forgot setType={setType} />
        ) : (
          <LoginForm setType={setType} />
        )}
      </Box>
    </Modal>
  );
};

export default AuthModal;
