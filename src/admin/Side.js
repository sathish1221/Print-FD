import React, { useState } from "react";
import { AppBar, Toolbar, Button, CssBaseline, Box } from "@mui/material";
import LogoutIcon from "@mui/icons-material/Logout";
import Images3 from "../assets/img3.png";
import bg from "../assets/bg.png";
import ImageUpload from "../component/ImageUpload";
import MobileDrawer from "../component/MobileDrawer";
import { makeStyles } from "@material-ui/core/styles";
import "../index.css";
import AllUsers from "../component/AllUsers";
import NewUser from "../component/NewUser";
import Festival from "../Pages/AddEventsPage";

const drawerWidth = 240;

const useStyles = makeStyles((theme) => ({
  headerClass: {
    display: "block", // Ensure it is visible by default
    [theme.breakpoints.up("xs")]: {
      display: "none !important", // Hide on small screens and up (600px and larger)
    },
  },
}));

const Side = () => {
  const classes = useStyles();
  const [open, setOpen] = useState(false);
  const [activeItem, setActiveItem] = useState("All User");

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
    <>
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
            color="inherit"
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
          marginTop: 8, // Adjusting to avoid overlapping with AppBar
          marginLeft: 0, // Adjusting to avoid overlapping with Drawer
          overflow: "auto", // To ensure main content is scrollable if needed
        }}
      >
        <AllUsers />
       
      </Box>
    </Box>
    </>
  );
};

export default Side;

// import React, { useState } from "react";
// import { Drawer, List, ListItem, ListItemButton, ListItemIcon, ListItemText, Toolbar, Divider, Box, IconButton, Typography, AppBar, CssBaseline } from "@mui/material";
// import { Link } from 'react-router-dom';
// import InboxIcon from '@mui/icons-material/MoveToInbox';
// import MailIcon from '@mui/icons-material/Mail';
// import MenuIcon from '@mui/icons-material/Menu';
// import Images3 from '../assets/img3.png';
// import bg from '../assets/bg.png';
// import { makeStyles, ThemeProvider } from '@mui/styles';
// import { createTheme } from "@mui/material/styles";

// const drawerWidth = 240;

// const useStyles = makeStyles((theme) => ({
//   drawer: {
//     width: drawerWidth,
//     flexShrink: 0,
//   },
//   drawerPaper: {
//     width: drawerWidth,
//     backgroundColor: "#014550",
//     color: "#fff",
//   },
//   listItem: {
//     minHeight: "60px",
//     padding: "20px 16px",
//     "&:hover": {
//       backgroundColor: "#3a656c",
//     },
//   },
//   listItemText: {
//     fontSize: "18px",
//     color: "#fff",
//   },
//   listItemActive: {
//     backgroundColor: "#3a656c",
//     "&:hover": {
//       backgroundColor: "#3a656c",
//     },
//   },
//   listItemTextActive: {
//     color: "#fff",
//     fontWeight: "bold",
//   },
//   appBar: {
//     zIndex: (theme.zIndex && theme.zIndex.drawer) || 1201, // Fallback value
//     backgroundColor: "#1976d2",
//   },
//   content: {
//     flexGrow: 1,
//     padding: (theme.spacing && theme.spacing(3)) || 24, // Fallback value
//     backgroundImage: `url(${bg})`,
//     backgroundColor: '#014550',
//     marginTop: 8,
//     marginLeft: drawerWidth,
//     overflow: 'auto',
//   },
// }));

// const Side = () => {
//   const classes = useStyles();
//   const [mobileOpen, setMobileOpen] = useState(false);
//   const [activeItem, setActiveItem] = useState("All Users");

//   const handleDrawerToggle = () => {
//     setMobileOpen(!mobileOpen);
//   };

//   const handleListItemClick = (item) => {
//     setActiveItem(item);
//     if (mobileOpen) {
//       setMobileOpen(false); // Close the mobile drawer on item click
//     }
//   };

//   const menuItems = [
//     { text: "All Users", to: "/all-user" },
//     { text: "Add User", to: "/new-user" },
//     { text: "Festivals", to: "/festival" },
//     { text: "Add Designs", to: "/image-upload" }
//   ];

//   return (
//     <Box sx={{ display: "flex" }}>
//       <CssBaseline />
//       <AppBar position="fixed" className={classes.appBar}>
//         <Toolbar>
//           <IconButton
//             color="inherit"
//             aria-label="open drawer"
//             edge="start"
//             onClick={handleDrawerToggle}
//             sx={{ mr: 2, display: { sm: 'none' } }}
//           >
//             <MenuIcon />
//           </IconButton>
//           <Typography variant="h6" noWrap component="div">
//             <img
//               src={Images3}
//               alt="Logo"
//               style={{ height: 45, marginRight: 'auto' }}
//             />
//           </Typography>
//         </Toolbar>
//       </AppBar>
//       <Drawer
//         variant="permanent"
//         className={classes.drawer}
//         classes={{
//           paper: classes.drawerPaper,
//         }}
//         sx={{
//           display: { xs: 'none', sm: 'block' },
//         }}
//       >
//         <Toolbar />
//         <Divider />
//         <List>
//           {menuItems.map((item, index) => (
//             <ListItem
//               key={item.text}
//               disablePadding
//               className={`${classes.listItem} ${activeItem === item.text ? classes.listItemActive : ""}`}
//             >
//               <ListItemButton
//                 component={Link}
//                 to={item.to}
//                 onClick={() => handleListItemClick(item.text)}
//               >
//                 <ListItemIcon>
//                   {index % 2 === 0 ? <InboxIcon /> : <MailIcon />}
//                 </ListItemIcon>
//                 <ListItemText
//                   primary={item.text}
//                   className={`${classes.listItemText} ${activeItem === item.text ? classes.listItemTextActive : ""}`}
//                 />
//               </ListItemButton>
//             </ListItem>
//           ))}
//         </List>
//         <Divider />
//       </Drawer>
//       <Drawer
//         anchor="left"
//         open={mobileOpen}
//         onClose={handleDrawerToggle}
//         classes={{
//           paper: classes.drawerPaper,
//         }}
//         ModalProps={{
//           keepMounted: true,
//         }}
//         sx={{
//           display: { xs: 'block', sm: 'none' },
//           '& .MuiDrawer-paper': {
//             boxSizing: 'border-box',
//             width: drawerWidth,
//           },
//         }}
//       >
//         <Toolbar />
//         <Divider />
//         <List>
//           {menuItems.map((item, index) => (
//             <ListItem
//               key={item.text}
//               disablePadding
//               className={`${classes.listItem} ${activeItem === item.text ? classes.listItemActive : ""}`}
//             >
//               <ListItemButton
//                 component={Link}
//                 to={item.to}
//                 onClick={() => handleListItemClick(item.text)}
//               >
//                 <ListItemIcon>
//                   {index % 2 === 0 ? <InboxIcon /> : <MailIcon />}
//                 </ListItemIcon>
//                 <ListItemText
//                   primary={item.text}
//                   className={`${classes.listItemText} ${activeItem === item.text ? classes.listItemTextActive : ""}`}
//                 />
//               </ListItemButton>
//             </ListItem>
//           ))}
//         </List>
//         <Divider />
//       </Drawer>
//       <Box component="main" className={classes.content}>
//         <Toolbar />
//         <Typography paragraph>
//           {/* Main content area where your page content will be rendered */}
//         </Typography>
//       </Box>
//     </Box>
//   );
// };

// const theme = createTheme();

// const App = () => (
//   <ThemeProvider theme={theme}>
//     <Side />
//   </ThemeProvider>
// );

// export default App;
