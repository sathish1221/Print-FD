    import * as React from 'react';
    import PropTypes from 'prop-types';
    import AppBar from '@mui/material/AppBar';
    import Box from '@mui/material/Box';
    import CssBaseline from '@mui/material/CssBaseline';
    import Divider from '@mui/material/Divider';
    import Drawer from '@mui/material/Drawer';
    import IconButton from '@mui/material/IconButton';
    import InboxIcon from '@mui/icons-material/MoveToInbox';
    import List from '@mui/material/List';
    import ListItem from '@mui/material/ListItem';
    import ListItemButton from '@mui/material/ListItemButton';
    import ListItemIcon from '@mui/material/ListItemIcon';
    import ListItemText from '@mui/material/ListItemText';
    import MailIcon from '@mui/icons-material/Mail';
    import MenuIcon from '@mui/icons-material/Menu';
    import Toolbar from '@mui/material/Toolbar';
    import Typography from '@mui/material/Typography';
    import { Link } from 'react-router-dom';
    import Images3 from '../assets/img3.png';
    import bg from '../assets/bg.png';

    const drawerWidth = 240;

    function MobileDrawer(props) {
      const { window } = props;
      const [mobileOpen, setMobileOpen] = React.useState(false);

      const handleDrawerClose = () => {
        setMobileOpen(false);
      };

      const handleDrawerToggle = () => {
        setMobileOpen(!mobileOpen);
      };

      const drawer = (
        <div>
          <Toolbar />
          <Divider />
          <List>
            {[
              { text: "All Users", to: "/side" },
              { text: "Add User", to: "/new-user" },
              // { text: "Events", to: "/events" },
              { text: "View Events", to: "/view-events" },
              { text: "Add Designs", to: "/image-upload" },
              { text: "View Designs", to: "/view-designs" },
            ].map((item, index) => (
              <ListItem key={item.text} disablePadding>
                <ListItemButton component={Link} to={item.to}>
                  <ListItemIcon>
                    {index % 2 === 0 ? <InboxIcon /> : <MailIcon />}
                  </ListItemIcon>
                  <ListItemText primary={item.text} />
                </ListItemButton>
              </ListItem>
            ))}
          </List>
          <Divider />
        </div>
      );

      const container = window !== undefined ? () => window().document.body : undefined;

      return (
        <Box sx={{ display: 'flex' }}>
          <CssBaseline />
          <AppBar
            position="fixed"
            sx={{
              width: { sm: `calc(100% - ${drawerWidth}px)` },
              ml: { sm: `${drawerWidth}px` },
            }}
          >
            <Toolbar>
              <IconButton
                color="inherit"
                aria-label="open drawer"
                edge="start"
                onClick={handleDrawerToggle}
                sx={{ mr: 2, display: { sm: 'none' } }}
              >
                <MenuIcon />
              </IconButton>
              <Typography variant="h6" noWrap component="div">
                <img
                  src={Images3}
                  alt="Logo"
                  style={{ height: 45, marginRight: 'auto' }}
                />
              </Typography>
            </Toolbar>
          </AppBar>
          <Box
            component="nav"
            sx={{ width: { sm: drawerWidth }, flexShrink: { sm: 0 } }}
            aria-label="mailbox folders"
          >
            <Drawer
              container={container}
              variant="temporary"
              open={mobileOpen}
              onClose={handleDrawerClose}
              ModalProps={{
                keepMounted: true,
              }}
              sx={{
                display: { xs: 'block', sm: 'none' },
                '& .MuiDrawer-paper': {
                  boxSizing: 'border-box',
                  width: drawerWidth,
                },
              }}
            >
              {drawer}
            </Drawer>
            <Drawer
              variant="permanent"
              sx={{
                display: { xs: 'none', sm: 'block' },
                '& .MuiDrawer-paper': {
                  boxSizing: 'border-box',
                  width: drawerWidth,
                },
              }}
              open
            >
              {drawer}
            </Drawer>
          </Box>
          <Box
            component="main"
            sx={{
              flexGrow: 1,
              bgcolor: 'background.default',
              p: 3,
              backgroundImage: `url(${bg})`,
              backgroundColor: '#014550',
              marginTop: 8,
              marginLeft: 0,
              overflow: 'auto',
            }}
          >
            <Toolbar />
            <Typography paragraph>
              {/* This is where the main content will be rendered */}
            </Typography>
          </Box>
        </Box>
      );
    }

    MobileDrawer.propTypes = {
      window: PropTypes.func,
    };

    export default MobileDrawer;
