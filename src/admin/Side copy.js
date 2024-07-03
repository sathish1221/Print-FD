import React, { useState } from "react";
import {
  AppBar,
  Toolbar,
  Button,
  Drawer,
  List,
  ListItem,
  ListItemText,
  ListItemIcon,
  CssBaseline,
  Box,
  Divider,
  Typography,
  Collapse,
} from "@mui/material";
import { ExpandLess, ExpandMore } from "@mui/icons-material";
import LogoutIcon from "@mui/icons-material/Logout";
import Images3 from "../assets/img3.png";
import { Link, Outlet } from "react-router-dom";
import bg from "../assets/bg.png";
import HomeIcon from '@mui/icons-material/Home';
import DashboardIcon from '@mui/icons-material/Dashboard';
import BusinessIcon from '@mui/icons-material/Business';
import AllUsers from "../component/AllUsers";

const drawerWidth = 240; // Set the drawer width as per your requirement

const Sidecopy =  ({ onClose })  => {
  const [open, setOpen] = useState(false);
  const [activeItem, setActiveItem] = useState("Dashboard");

  const handleClick = () => {
    setOpen(!open);
  };

  const handleItemClick = (item) => {
    setActiveItem(item);
  };

  const listItemStyle = {
    minHeight: "60px",
    padding: "20px 16px",
  };
  const listItemTextStyle = {
    fontSize: "25px",
    color: "#3a656c",
  };

  const getListItemStyles = (item) => ({
    ...listItemStyle,
    backgroundColor: activeItem === item ? "#3a656c" : "inherit",
    color: activeItem === item ? "white" : "inherit",
  });

  const getListItemTextStyles = (item) => ({
    ...listItemTextStyle,
    color: activeItem === item ? "white" : "#3a656c",
  });

  return (
    <Box sx={{ display: "flex", height: "100vh" }}>
      <CssBaseline />
      <AppBar
        position="fixed"
        sx={{
          zIndex: (theme) => theme.zIndex.drawer + 1,
          backgroundColor: "#B1B1B1",
        }}
      >
        <Toolbar>
          <img
            src={Images3}
            alt="Logo"
            style={{ height: 45, marginRight: "auto" }}
          />
          <Button
            color="inherit"
            endIcon={<LogoutIcon />}
            sx={{ marginLeft: "auto" }}
          >
            Logout
          </Button>
        </Toolbar>
      </AppBar>
      {/* <Drawer
        variant="permanent"
        sx={{
          width: drawerWidth,
          flexShrink: 0,
          [`& .MuiDrawer-paper`]: {
            width: drawerWidth,
            boxSizing: "border-box",
            backgroundColor: "#e2e2e2",
          },
        }}
      >
        <Toolbar />
        <Box sx={{ overflow: "auto" }}>
          <List>
            <Divider />
            {["All User", "New User"].map((text) => (
              <ListItem
                button
                key={text}
                component={Link}
                to={text.toLowerCase().replace(" ", "-")}
                sx={getListItemStyles(text)}
                onClick={() => handleItemClick(text)}
              >
                <ListItemText
                  primary={
                    <Typography sx={getListItemTextStyles(text)}>
                      {text}
                    </Typography>
                  }
                />
              </ListItem>
            ))}
            <ListItem
              button
              onClick={handleClick}
              sx={getListItemStyles("Festivals")}
            >
              <ListItemText
                primary={
                  <Typography sx={getListItemTextStyles("Festivals")}>
                    Festivals
                  </Typography>
                }
              />
              {open ? <ExpandLess /> : <ExpandMore />}
            </ListItem>
            <Collapse in={open} timeout="auto" unmountOnExit>
              <List component="div" disablePadding>
                {["Diwali", "Pongal", "Ramzan"].map((text) => (
                  <ListItem
                    button
                    key={text}
                    component={Link}
                    to={`festivals/${text.toLowerCase()}`}
                    sx={getListItemStyles(text)}
                    onClick={() => handleItemClick(text)}
                  >
                    <ListItemText
                      primary={
                        <Typography sx={getListItemTextStyles(text)}>
                          {text}
                        </Typography>
                      }
                    />
                  </ListItem>
                ))}
              </List>
            </Collapse>
          </List>
        </Box>
      </Drawer> */}
      <Drawer anchor="left" open={open} onClose={onClose}  variant="permanent"
        sx={{
          width: drawerWidth,
          flexShrink: 0,
          [`& .MuiDrawer-paper`]: {
            width: drawerWidth,
            boxSizing: "border-box",
            backgroundColor: "#e2e2e2",
          },
        }}>
      <List>
        <ListItem>
          <ListItemIcon>
            <DashboardIcon />
          </ListItemIcon>
          <ListItemText primary="Dashboard" />
        </ListItem>
        <ListItem button component={Link} to="/allusers" onClick={onClose}>
          <ListItemIcon>
            <HomeIcon />
          </ListItemIcon>
          <ListItemText primary="All Users" />
        </ListItem>
        <ListItem button component={Link} to="/newuser" onClick={onClose}>
          <ListItemIcon>
            <BusinessIcon />
          </ListItemIcon>
          <ListItemText primary="New User" />
        </ListItem>
        <ListItem button component={Link} to="/festival" onClick={onClose}>
          <ListItemIcon>
            <BusinessIcon />
          </ListItemIcon>
          <ListItemText primary="Festival" />
        </ListItem>
      </List>
    </Drawer>
      {/* <Box
        component="main"
        sx={{
          flexGrow: 1,
          bgcolor: "background.default",
          p: 3,
          backgroundImage: `url(${bg})`,
          backgroundColor: "#014550",
          marginTop: 8, // Adjusting to avoid overlapping with AppBar
          marginLeft: 0, // Adjusting to avoid overlapping with Drawer
          overflow: "auto", // To ensure main content is scrollable if needed
        }}
      > */}
        {/* <AllUsers /> */}

        <Outlet />

      </Box>
    // </Box>
  );
};

export default Sidecopy;

