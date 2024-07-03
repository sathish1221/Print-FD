// MobileMenuBar.js
import React from "react";
import { AppBar, Toolbar, IconButton, Typography, Button } from "@mui/material";
import MenuIcon from "@mui/icons-material/Menu";
import LogoutIcon from "@mui/icons-material/Logout";

const MobileMenuBar = ({ handleDrawerToggle }) => {
  return (
    <AppBar
      position="fixed"
      sx={{
        zIndex: (theme) => theme.zIndex.drawer + 1,
        backgroundColor: "#B1B1B1",
      }}
    >
      <Toolbar>
        <IconButton
          color="inherit"
          aria-label="open drawer"
          edge="start"
          onClick={handleDrawerToggle}
          sx={{ mr: 2 }}
        >
          <MenuIcon />
        </IconButton>
        <Typography variant="h6" noWrap>
          Your App Name
        </Typography>
        <Button
          color="inherit"
          endIcon={<LogoutIcon />}
          sx={{ marginLeft: "auto" }}
        >
          Logout
        </Button>
      </Toolbar>
    </AppBar>
  );
};

export default MobileMenuBar;
