import React, { useState, useEffect } from "react";
import {
  AppBar,
  Toolbar,
  Button,
  Drawer,
  List,
  ListItem,
  ListItemText,
  CssBaseline,
  Box,
  Divider,
  IconButton,
} from "@mui/material";
import MenuIcon from "@mui/icons-material/Menu";
import LogoutIcon from "@mui/icons-material/Logout";
import { useNavigate } from "react-router-dom";
import { useTheme } from "@mui/material/styles";
import useMediaQuery from "@mui/material/useMediaQuery";
import { format } from "date-fns";
import image3 from "../assets/img3.png";
import ArrowBackIosIcon from "@mui/icons-material/ArrowBackIos";
import "../css/yoga.css";
import Axios from "../Axios";
import KeyboardDoubleArrowRightIcon from "@mui/icons-material/KeyboardDoubleArrowRight";
import Swal from 'sweetalert2';
import MenuOpenIcon from '@mui/icons-material/MenuOpen';

const Sidebar = () => {
  const [activeItem, setActiveItem] = useState(null);
  const [mobileOpen, setMobileOpen] = useState(false);
  const [sidebarItems, setSidebarItems] = useState([]);
  const navigate = useNavigate();
  const theme = useTheme();
  const isMobile = useMediaQuery(theme.breakpoints.down("sm"));

  const handleDrawerToggle = () => {
    setMobileOpen(!mobileOpen);
  };

  const handleListItemClick = (index, path, id) => {
    setActiveItem(index); // Set activeItem based on the clicked index
    localStorage.setItem("activeMenuIndex", index); // Save the active item index to localStorage
    path = "/yoga-day";
    console.log("Clicked index:", index);
    console.log("Clicked id:", id);
    navigate(path, { state: { id: id } });

    if (isMobile) {
      setMobileOpen(false);
    }
  };

  useEffect(() => {
    const fetchData = async () => {
      try {
        const response = await Axios.get("/events");
        console.log("Fetched data:", response.data);
        if (response.data && Array.isArray(response.data.events)) {
          setSidebarItems(response.data.events);
        } else {
          console.error(
            "Fetched data is not in the expected format:",
            response.data
          );
        }
      } catch (error) {
        console.error("Error fetching data:", error);
      }
    };
    fetchData();

    const savedActiveItemIndex = localStorage.getItem("activeMenuIndex");
    if (savedActiveItemIndex !== null) {
      setActiveItem(parseInt(savedActiveItemIndex, 10));
    } else {
      setActiveItem(0); 
      localStorage.setItem("activeMenuIndex", 0); 
    }
  }, []);

  const handleLogout = () => {
    Swal.fire({
      title: 'Are you sure?',
      text: "Do you really want to log out?",
      icon: 'warning',
      showCancelButton: true,
      confirmButtonColor: '#3085d6',
      cancelButtonColor: '#d33',
      confirmButtonText: 'Yes, logout',
      cancelButtonText: 'No, stay'
    }).then(async (result) => {
      if (result.isConfirmed) {
        try {
          const token = localStorage.getItem("token");
          if (!token) {
            throw new Error("No token found");
          }

          await Axios.post(
            "auth/logout",
            {},
            {
              headers: {
                "Content-Type": "application/json",
                Authorization: "Bearer " + token,
              },
            }
          );

          localStorage.clear();

          Swal.fire(
            'Logged out!',
            'You have been logged out successfully.',
            'success'
          );

          navigate("/");
        } catch (error) {
          console.error("Error logging out:", error);
        }
      }
    });
  };

  const goBack = () => {
    window.history.back();
  };

  const currentDate = new Date();
  const upcomingItems = Array.isArray(sidebarItems)
    ? sidebarItems.filter((item) => new Date(item.event_date) >= currentDate)
    : [];
  const sortedUpcomingItems = upcomingItems
    .sort((a, b) => new Date(a.event_date) - new Date(b.event_date))
    .slice(0, 3);
  const pastItems = Array.isArray(sidebarItems)
    ? sidebarItems.filter((item) => new Date(item.event_date) < currentDate)
    : [];

  const quotes = [
    {
      id: 1,
      category: "General",
      text: "The best way to predict ",
    },
    {
      id: 2,
      category: "Business",
      text: "Success is not the key ",
    },
  ];

  const drawer = (
    <div>
      <Toolbar />
      <Divider />     
      <MenuOpenIcon sx={{display: 'flex',float:'right',fontsize: '40px',marginTop: '5%',cursor:'pointer'}}/>
      <p
        className="upcome"
        style={{
          color: "#fff",
          background: "#A6787A",
          borderTopLeftRadius: '50px',
          borderTopRightRadius: '50px',
          textAlign: "center",
          padding: "10px",
        }}
      >
        Upcoming Festivals
      </p>
      <List>
        {sortedUpcomingItems.map((item, index) => (
          <ListItem
            className="list"
            button
            key={item.id}
            selected={activeItem === index}
            onClick={() => handleListItemClick(index, item.path, item.id)}
            sx={{
              padding: "0",
              backgroundColor: activeItem === index ? "#000" : "white",
              color: activeItem === index ? "#000" : "#fff",
              fontFamily: "Roboto, sans-serif",
            }}
          >
            <ListItemText
              className="list"
              primary={item.title}
              secondary={format(new Date(item.event_date), "EEEE, dd MMMM")}
              sx={{
                "& .MuiListItemText-primary": {
                  fontSize: "22px",
                  fontFamily: "Roboto, sans-serif",
                  color: activeItem === index ? "#fff" : "#000",
                  padding:'0 5px'
                },
                "& .MuiListItemText-secondary": {
                  fontSize: "14px",
                  fontFamily: "Roboto, sans-serif",
                  color: activeItem === index ? "#fff" : "#000",
                  padding:'0 5px'
                },
              }}
            />
            <KeyboardDoubleArrowRightIcon
              sx={{ color: activeItem === index ? "#000" : "#fff" }}
            />
          </ListItem>
        ))}
      </List>

      <Divider />
      <p
        className="upcome1"
       
        style={{
          color: "#fff",
          background: "#A6787A",
          borderTopLeftRadius: '50px',
          borderTopRightRadius: '50px',
          textAlign: "center",
          padding: "10px",
        }}
      >
        Others
      </p>
      <List sx={{ maxHeight: "calc(100vh - 400px)"}}>
        {quotes.map((quote, index) => (
          <ListItem
          className="list"
            button
            key={quote.id}
            selected={activeItem === index + sortedUpcomingItems.length}
            onClick={() => handleListItemClick(index + sortedUpcomingItems.length, quote.path, quote.id)}
            sx={{
              padding: "0",
              backgroundColor: activeItem === index + sortedUpcomingItems.length ? "#000" : "white",
              color: activeItem === index + sortedUpcomingItems.length ? "#000" : "#fff",
              fontFamily: "Roboto, sans-serif",
            }}
          >
            <ListItemText
              className="list"
              primary={quote.category}
              secondary={quote.text}
              sx={{
                "& .MuiListItemText-primary": {
                  fontSize: "22px",
                  fontFamily: "Roboto, sans-serif",
                  color: activeItem === index + sortedUpcomingItems.length ? "#fff" : "#000",
                  padding: '0 5px'
                },
                "& .MuiListItemText-secondary": {
                  fontSize: "14px",
                  fontFamily: "Roboto, sans-serif",
                  color: activeItem === index + sortedUpcomingItems.length ? "#fff" : "#000",
                  padding: '0 5px'
                },
              }}
            />
            <KeyboardDoubleArrowRightIcon
              sx={{ color: activeItem === index + sortedUpcomingItems.length ? "#000" : "#fff" }}
            />
          </ListItem>
        ))}
      </List>
    </div>
  );

  return (
    <Box sx={{ display: "flex" }}>
      <CssBaseline />
      <AppBar className="appbar" position="fixed">
        <Toolbar
          sx={{
            background: "#7f223d",
            display: "flex",
            justifyContent: "space-evenly",
          }}
        >
          {isMobile && (
            <IconButton
              color="inherit"
              aria-label="open drawer"
              edge="start"
              onClick={handleDrawerToggle}
              sx={{ mr: 2, display: { sm: "none" } }}
            >
              <MenuIcon />
            </IconButton>
          )}
          <div
            style={{
              background: "red",
              borderRadius: "10px",
              height: "30px",
              width: "30px",
              padding: "3px 8px",
              cursor: "pointer", // Make the cursor change to indicate it's clickable
            }}
            onClick={goBack} // Attach the click handler
          >
            <ArrowBackIosIcon sx={{ fontSize: "20px", fontWeight: 700 }} />
          </div>
          <div>
            <img
              src={image3}
              alt="Logo"
              style={{ height: 50, marginRight: "auto" }}
            />
          </div>
          <div>
            <Button
              color="inherit"
              onClick={handleLogout}
              endIcon={
                <LogoutIcon
                  sx={{
                    height: "30px",
                    width: "30px",
                    backgroundColor: "red",
                    borderRadius: "50%",
                    padding: "5px",
                  }}
                />
              }
              sx={{
                marginLeft: "auto",
                color: "#fff",
                textAlign: "end",
              }}
            >
              Logout
            </Button>

          </div>
        </Toolbar>
      </AppBar>
      <Box component="nav" sx={{ flexShrink: { sm: 0 } }} position={"fixed"}>
        <Drawer
          variant="permanent"
          sx={{
              display: { xs: "none", sm: "block" },
              "& .MuiDrawer-paper": {
              boxSizing: "border-box",
              width: "50vh",
              backgroundColor: "#fee2d6",
              padding:'0 15px',
              zIndex: 1,
            },
          }}
          open
        >
          {drawer}
        </Drawer>
      </Box>
    </Box>
  );
};
    
export default Sidebar;
