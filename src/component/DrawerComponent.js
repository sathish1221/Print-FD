// DrawerComponent.js
import React from "react";
import {
  Box,
  Divider,
  Drawer,
  List,
  ListItem,
  ListItemText,
  Typography,
} from "@mui/material";
import { Link } from "react-router-dom";
import { ExpandLess, ExpandMore } from "@mui/icons-material";

const drawerWidth = 240;

const DrawerComponent = ({ open, setOpen, activeItem, handleItemClick }) => {
  const handleClick = () => {
    setOpen(!open);
  };

  const getListItemStyles = (item) => ({
    minHeight: "60px",
    padding: "20px 16px",
    backgroundColor: activeItem === item ? "#3a656c" : "inherit",
    color: activeItem === item ? "white" : "inherit",
  });

  const getListItemTextStyles = (item) => ({
    fontSize: "25px",
    color: activeItem === item ? "white" : "#3a656c",
  });

  return (
    <Drawer
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
      open={open}
    >
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
        </List>
      </Box>
    </Drawer>
  );
};

export default DrawerComponent;
