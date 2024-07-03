import React, { useState } from "react";
import { AppBar, Toolbar, Button, CssBaseline, Box } from "@mui/material";
import LogoutIcon from "@mui/icons-material/Logout";
import Images3 from "../assets/img3.png";
import bg from "../assets/bg.png";
import MobileDrawer from "../component/MobileDrawer";
import { makeStyles } from "@material-ui/core/styles";
import { BrowserRouter as Router, Route, Routes, Link, useNavigate } from "react-router-dom";
import "../index.css";
import AllUsers from "../component/AllUsers";
import NewUser from "../component/NewUser";

const useStyles = makeStyles((theme) => ({
  headerClass: {
    display: "block",
    [theme.breakpoints.up("xs")]: {
      display: "none !important",
    },
  },
  navLink: {
    textDecoration: "none",
    color: "inherit",
  },
}));

const AllUsersPage = () => {
  const classes = useStyles();
  const [activeItem, setActiveItem] = useState("All Users");
  const navigate = useNavigate();

  return (
    <Box sx={{ display: "flex", height: "100vh" }}>
      <CssBaseline />
      <AppBar
        position="fixed"
        className={classes.headerClass}
        sx={{
          zIndex: (theme) => theme.zIndex.drawer + 1,
          backgroundColor: "#1976d200",
        }}
      >
        <Toolbar className={classes.headerClass}>
          <img
            src={Images3}
            alt="Logo"
            style={{ height: 45, marginRight: "auto" }}
          />
          <Button
            endIcon={<LogoutIcon />}
            sx={{ marginLeft: "auto" }}
          >
            Logout
          </Button>
        </Toolbar>
      </AppBar>
      <MobileDrawer />
      <Box
        component="main"
        sx={{
          flexGrow: 1,
          bgcolor: "background.default",
          p: 3,
          backgroundImage: `url(${bg})`,
          backgroundColor: "#014550",
          marginTop: 8,
          marginLeft: 0,
          overflow: "auto",
        }}
      >
        <nav>
          <Link
            to="/all-users"
            className={classes.navLink}
            onClick={() => setActiveItem("All Users")}
          >
            <Button
              sx={{
                marginRight: 2,
                color: "white",
                backgroundColor: activeItem === "All Users" ? "#3a656c" : "inherit",
              }}
            >
              All Users
            </Button>
          </Link>
          <Link
            to="/add-user"
            className={classes.navLink}
            onClick={() => setActiveItem("Add User")}
          >
            <Button
              sx={{
                color: "white",
                backgroundColor: activeItem === "Add User" ? "#3a656c" : "inherit",
              }}
            >
              Add User
            </Button>
          </Link>
        </nav>
        <Routes>
          <Route path="/all-users" element={<AllUsers />} />
          <Route path="/add-user" element={<NewUser />} />
        </Routes>
      </Box>
    </Box>
  );
};

export default AllUsersPage;
