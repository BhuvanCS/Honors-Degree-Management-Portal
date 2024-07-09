import React, { useContext } from "react";
import { useNavigate } from "react-router-dom";
import AuthContext from "../../context/AuthContext";
import { Button } from "@mui/material";

const Logout = () => {
  const { logout } = useContext(AuthContext);
  const navigate = useNavigate();

  const handleLogout = () => {
    logout();
    navigate("/login");
  };

  return (
    <Button
      color="primary"
      variant="text"
      size="small"
      onClick={handleLogout}
      marginRight="5"
    >
      Logout
    </Button>
  );
};

export default Logout;
