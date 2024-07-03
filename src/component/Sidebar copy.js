import React, { useState } from "react";
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
  Typography,
} from "@mui/material";
import LogoutIcon from "@mui/icons-material/Logout";
import { useNavigate } from "react-router-dom";
import image3 from "../assets/img3.png";
import { format } from "date-fns";

const drawerWidth = 240;

const Sidebar = () => {
  const [activeItem, setActiveItem] = useState(null);
  const navigate = useNavigate();

  const handleListItemClick = (index, path) => {
    setActiveItem(index);
    navigate(path);
  };

  const sidebarItems = [
    {
      text: "Happy Diwali",
      path: "/world-bicycle-day",
      date: new Date(2024, 9, 31),
    }, // October is 9 (0-based index)
    {
      text: "Merry Christmas",
      path: "/world-bicycle-day",
      date: new Date(2024, 11, 25),
    },
    {
      text: "Happy Pongal",
      path: "/happy-pongal",
      date: new Date(2024, 0, 14),
    },
    {
      text: "Maha Shivaratri",
      path: "/maha-shivaratri",
      date: new Date(2024, 1, 8),
    },
    {
      text: "Independence Day",
      path: "/independence-day",
      date: new Date(2024, 7, 15),
    },
  ];

  return (
    <Box sx={{ display: "flex" }}>
      <CssBaseline />
      <AppBar
        position="fixed"
        sx={{
          width: `calc(100% - ${drawerWidth}px)`,
          ml: `${drawerWidth}px`,
          backgroundColor: "#B1B1B1",
        }}
      >
        <Toolbar>
          <img
            src={image3}
            alt="Logo"
            style={{ height: 50, marginRight: "auto" }}
          />
          <Button
            color="inherit"
            endIcon={<LogoutIcon />}
            sx={{ marginLeft: "auto", border: "1px solid black" }}
          >
            Logout
          </Button>
        </Toolbar>
      </AppBar>
      <Drawer
        variant="permanent"
        sx={{
          width: drawerWidth,
          flexShrink: 0,
          [`& .MuiDrawer-paper`]: {
            width: drawerWidth,
            boxSizing: "border-box",
            backgroundColor: "#E2E2E2",
          }, // Apply background color to Drawer
        }}
      >
        <Toolbar />
        <Box
          sx={{
            textAlign: "center",
            padding: 2,
            backgroundColor: "#B1B1B1",
            marginTop: "-70px",
          }}
        >
          <Typography
            sx={{ fontSize: "55px", fontFamily: "Roboto, sans-serif" }}
            variant="h6"
          >
            2024
          </Typography>
        </Box>
        <Divider />
        <List>
          {sidebarItems.map((item, index) => (
            <ListItem
              button
              key={item.text}
              selected={activeItem === index}
              onClick={() => handleListItemClick(index, item.path)}
              sx={{
                padding: 2,
                backgroundImage:
                  activeItem === index
                    ? "linear-gradient(to right, #487981 0%, #081517 100%)"
                    : "inherit",
                color: activeItem === index ? "white" : "#487981",
                fontSize: "100px",
                fontFamily: "Roboto, sans-serif",
              }}
            >
              <ListItemText
                primary={item.text}
                secondary={format(item.date, "EEEE, dd MMMM")}
                sx={{
                  "& .MuiListItemText-primary": {
                    fontSize: "1.5rem",
                    fontFamily: "Roboto, sans-serif",
                  },
                  "& .MuiListItemText-secondary": {
                    fontSize: "1rem",
                    fontFamily: "Roboto, sans-serif",
                  },
                }}
              />
            </ListItem>
          ))}
        </List>
      </Drawer>
      <Box
        component="main"
        sx={{ flexGrow: 1, bgcolor: "background.default", p: 3 }}
      >
        <Toolbar />
        {/* <Typography paragraph>
          Your main content goes here.
        </Typography> */}
      </Box>
    </Box>
  );
};

export default Sidebar;


// import React, { useState } from "react";
// import {
//   AppBar,
//   Toolbar,
//   Button,
//   Drawer,
//   List,
//   ListItem,
//   ListItemText,
//   CssBaseline,
//   Box,
//   Divider,
//   Typography,
//   IconButton,
//   Grid
// } from "@mui/material";
// import MenuIcon from "@mui/icons-material/Menu";
// import LogoutIcon from "@mui/icons-material/Logout";
// import { useNavigate } from "react-router-dom";
// import { useTheme } from "@mui/material/styles";
// import useMediaQuery from "@mui/material/useMediaQuery";
// import { format } from "date-fns";
// import image3 from "../assets/img3.png";
// import ArrowBackIosIcon from '@mui/icons-material/ArrowBackIos';
// import '../css/yoga.css';

// const Sidebar = () => {
//   const [activeItem, setActiveItem] = useState(null);
//   const [mobileOpen, setMobileOpen] = useState(false);
//   const navigate = useNavigate();
//   const theme = useTheme();
//   const isMobile = useMediaQuery(theme.breakpoints.down("sm"));

//   const handleDrawerToggle = () => {
//     setMobileOpen(!mobileOpen);
//   };

//   const handleListItemClick = (index, path) => {
//     setActiveItem(index);
//     navigate(path);
//     if (isMobile) {
//       setMobileOpen(false);
//     }
//   };

//   const sidebarItems = [
//     {
//       text: "World Cycle Day",
//       path: "/world-bicycle-day",
//       date: new Date(2024, 5, 27), // Month is 0-indexed, so June is 5
//     },
//     {
//       text: "International Yoga Day",
//       path: "/yoga-day",
//       date: new Date(2024, 5, 21), // Month is 0-indexed, so June is 5
//     },
//     {
//       text: "International Men's Day",
//       path: "/yoga-day",
//       date: new Date(2024, 5, 25), // Month is 0-indexed, so June is 5
//     },
//   ];

//   const currentDate = new Date();
//   const upcomingItems = sidebarItems.filter((item) => item.date >= currentDate);
//   const pastItems = sidebarItems.filter((item) => item.date < currentDate);

//   const drawer = (
//     <div>
//       <Toolbar />
//       <Divider />
//       <p variant="h6" className="upcome" style={{ padding: 2, color: "#fff", background:'#d99959', borderRadius:'50px', textAlign:'center', padding:'10px' }}>
//         Upcoming Festivals
//       </p>
//       <List>
//         {upcomingItems.map((item, index) => (
//           <ListItem
//             className="list"
//             button
//             key={item.text}
//             selected={activeItem === index}
//             onClick={() => handleListItemClick(index, item.path)}
//             sx={{
//               padding: '0',
//               backgroundColor: activeItem === index ? "red" : "inherit",
//               fontFamily: "Roboto, sans-serif",
//             }}
//           >
//             <ListItemText
//               className="list"
//               primary={item.text}
//               secondary={format(item.date, "EEEE, dd MMMM")}
//               sx={{
//                 "& .MuiListItemText-primary": {
//                   fontSize: "22px",
//                   fontFamily: "Roboto, sans-serif",
//                   color:'#fff',
//                   textAlign:'center'
//                 },
//                 "& .MuiListItemText-secondary": {
//                   fontSize: "14px",
//                   fontFamily: "Roboto, sans-serif",
//                   color:'#fff',
//                   textAlign:'center'
//                 },
//               }}
//             />
//           </ListItem>
//         ))}
//       </List>

//       <Divider />
//       <p variant="h6" className="upcome1" style={{ padding: 2, color: "#fff", background:'red', borderRadius:'50px', textAlign:'center', padding:'10px' }}>
//         Others 
//       </p>
//       <List sx={{ maxHeight: "calc(100vh - 400px)", overflowY: "auto" }}>
//         {pastItems.map((item, index) => (
//           <ListItem 
//             button
//             key={item.text}
//             selected={activeItem === index + upcomingItems.length} // Adjust the index for past items
//             onClick={() =>
//               handleListItemClick(index + upcomingItems.length, item.path)
//             }
//             sx={{
//               padding: 2,
//               backgroundImage:
//                 activeItem === index + upcomingItems.length
//                   ? "linear-gradient(to right, #487981 0%, #081517 100%)"
//                   : "inherit",
//               color:
//                 activeItem === index + upcomingItems.length
//                   ? "white"
//                   : "#487981",
//               fontSize: "100px",
//               fontFamily: "Roboto, sans-serif",
//               opacity: 0.6, // Slightly dimmed for past festivals
//             }}
//           >
//             <ListItemText className="list"
//               primary={item.text}
//               secondary={format(item.date, "EEEE, dd MMMM")}
//               sx={{
//                 "& .MuiListItemText-primary": {
//                   fontSize: "22px",
//                   fontFamily: "Roboto, sans-serif",
//                   color:'#fff',
//                   textAlign:'center'

//                 },
//                 "& .MuiListItemText-secondary": {
//                   fontSize: "18px",
//                   fontFamily: "Roboto, sans-serif",
//                   color:'#fff',
//                   textAlign:'center'

//                 },
//               }}
//             />
//           </ListItem>
//         ))}
//       </List>
//     </div>
//   );

//   return (
//     <Box sx={{ display: "flex"}}>
//       <CssBaseline />
//       <AppBar className="appbar" position="fixed">
//         <Toolbar sx={{ background:'#7f223d', display:'flex', justifyContent:'space-evenly' }}>
//           {isMobile && (
//             <IconButton
//               color="inherit"
//               aria-label="open drawer"
//               edge="start"
//               onClick={handleDrawerToggle}
//               sx={{ mr: 2, display: { sm: "none" } }}
//             >
//               <MenuIcon />
//             </IconButton>
//           )}
//           <div style={{ background:'red', borderRadius:'10px', height:'50px', width:'50px', padding: '5px 10px' }}>
//             <ArrowBackIosIcon sx={{ fontSize:'40px', fontWeight:700 }} />
//           </div>
//           <div>
//             <img
//               src={image3}
//               alt="Logo"
//               style={{ height: 50, marginRight: "auto" }}
//             />
//           </div>
//           <div>
//             <Button
//               color="inherit"
//               endIcon={
//                 <LogoutIcon
//                   sx={{
//                     height: '30px',
//                     width: '30px',
//                     backgroundColor: 'red',
//                     borderRadius: '50%',
//                     padding: '5px',
//                   }}
//                 />
//               }
//               sx={{
//                 marginLeft: "auto",
//                 color: "#fff",
//                 textAlign: 'end',
//               }}
//             >
//               Logout
//             </Button>
//           </div>
//         </Toolbar>
//       </AppBar>
//       <Box component="nav" sx={{ flexShrink: { sm: 0 } }} position={'fixed'}>
//         <Drawer
//           variant="permanent"
//           sx={{
//             display: { xs: "none", sm: "block" },
//             "& .MuiDrawer-paper": {
//               boxSizing: "border-box",
//               width: '50vh',
//               backgroundColor: "#fee2d6",
//               zIndex: 1,
//             },
//           }}
//           open
//         >
//           {drawer}
//         </Drawer>
//       </Box>
//     </Box>
//   );
// };

// export default Sidebar;