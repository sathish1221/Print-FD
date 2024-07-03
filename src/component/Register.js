import React, { useState } from "react";
import {
  Avatar,
  Button,
  Container,
  FormControl,
  FormControlLabel,
  Checkbox,
  Grid,
  IconButton,
  InputAdornment,
  Link,
  TextField,
  Typography,
} from "@material-ui/core";
import { Link as RouterLink } from "react-router-dom";
import AccountCircleIcon from "@material-ui/icons/AccountCircle";
import PersonIcon from "@mui/icons-material/Person";
import Visibility from "@material-ui/icons/Visibility";
import VisibilityOff from "@material-ui/icons/VisibilityOff";
import { makeStyles } from "@material-ui/core/styles";
import images3 from "../assets/logo.png";
import images4 from "../assets/images.jpg";
import "../index.css";
import LockOpenIcon from "@mui/icons-material/LockOpen";

const useStyles = makeStyles((theme) => ({
  fontSmall: {
    color: "#000000 !important",
    fontSize: "12px",
  },
  text: {
    paddingRight: "0px !important",
    backgroundColor: "#CDCDCD !important",
  },
  avatarStyle: {
    backgroundColor: "#ABABAB !important",
    width: "55px !important",
    height: "55px !important",
    borderRadius: "0px",
  },
  backToLogin: {
    margin: theme.spacing(1, 0, 2),
    backgroundColor: "#757575 !important",
    color: "#fff",
    fontSize: "16px",
    textTransform: "capitalize",
  },
  container: {
    marginTop: theme.spacing(18),
    display: "flex",
    flexDirection: "column",
    alignItems: "center",
    backgroundColor: "#fff", // Add a slight white overlay to improve text readability
    padding: theme.spacing(4),
    borderRadius: theme.spacing(1),

    // backgroundImage:`url(${images4})`,
    // backgroundSize: 'cover', // Ensure the image covers the container
    // backgroundPosition: 'center',
  },
  avatar: {
    margin: theme.spacing(1),
    backgroundColor: theme.palette.secondary.main,
  },
  form: {
    width: "100%",
    marginTop: theme.spacing(1),
  },
  submit: {
    margin: theme.spacing(1, 0, 2),
    backgroundColor: "#616161 !important",
    color: "#fff",
    fontSize: "18px",
    textTransform: "capitalize",
  },
  img: {
    width: "50px",
    height: "50px",
    marginBottom: theme.spacing(1),
  },
  logo: {
    position: "absolute",
    top: theme.spacing(2),
    display: "flex",
    justifyContent: "center",
    width: "100%",
    zIndex: 1,
  },
}));

function Register() {
  const classes = useStyles();
  const [username, setUsername] = useState("");
  const [password, setPassword] = useState("");
  const [showPassword, setShowPassword] = useState(false);
  const [rememberMe, setRememberMe] = useState(false);

  const handleUsernameChange = (event) => {
    setUsername(event.target.value);
  };

  const handlePasswordChange = (event) => {
    setPassword(event.target.value);
  };

  const handleClickShowPassword = () => {
    setShowPassword(!showPassword);
  };

  const handleMouseDownPassword = (event) => {
    event.preventDefault();
  };

  const handleSubmit = (event) => {
    event.preventDefault();
    // handle sign-in logic
  };

  const handleBackToLogin = () => {
    // Handle navigation to login page
    // This can be a redirect or a route change depending on your setup
    console.log("Back to Login clicked");
  };

  return (
    <div
      style={{
        backgroundImage: `url(${images4})`,
        backgroundSize: "cover",
        backgroundRepeat: "no-repeat",
        backgroundPosition: "center",
        height: "100vh",
        display: "flex",
        alignItems: "center",
        justifyContent: "center",
        position: "relative",
      }}
    >
      <div className={classes.logo}>
        <img
          src={images3}
          alt="Custom Icon"
          className={classes.img}
          style={{
            display: "flex",
            justifyContent: "center",
            height: "130px",
            width: "140px",
          }}
        />
      </div>
      <Container component="main" maxWidth="xs" className={classes.container}>
        <Typography component="h1" variant="h5">
          Register
        </Typography>
        <form className={classes.form} onSubmit={handleSubmit}>
          <FormControl margin="normal" required fullWidth>
            <TextField
              className={classes.text}
              id="username"
              name="username"
              value={username}
              placeholder="Username"
              onChange={handleUsernameChange}
              variant="outlined"
              autoFocus
              InputProps={{
                startAdornment: (
                  <InputAdornment position="start">
                    <Avatar className={classes.avatarStyle}>
                      <PersonIcon />
                    </Avatar>
                  </InputAdornment>
                ),
              }}
            />
          </FormControl>
          <FormControl margin="normal" required fullWidth>
            <TextField
              className={classes.text}
              id="password"
              name="password"
              placeholder="Password"
              type={showPassword ? "text" : "password"}
              value={password}
              onChange={handlePasswordChange}
              variant="outlined"
              InputProps={{
                startAdornment: (
                  <InputAdornment position="start">
                    <IconButton className={classes.avatarStyle}>
                      <LockOpenIcon />
                    </IconButton>
                  </InputAdornment>
                ),
              }}
            />
          </FormControl>
          <FormControl margin="normal" required fullWidth>
            <TextField
              className={classes.text}
              id="password"
              name="password"
              placeholder="Confirm Password"
              type={showPassword ? "text" : "password"}
              value={password}
              onChange={handlePasswordChange}
              variant="outlined"
              InputProps={{
                startAdornment: (
                  <InputAdornment position="start">
                    <IconButton className={classes.avatarStyle}>
                      <LockOpenIcon />
                    </IconButton>
                  </InputAdornment>
                ),
              }}
            />
          </FormControl>
          {/* <Grid container alignItems="center" justifyContent="space-between">
            <Grid item>
              <FormControlLabel
                className={classes.fontSmall}
                control={
                  <Checkbox
                    checked={rememberMe}
                    onChange={(e) => setRememberMe(e.target.checked)}
                    color="primary"
                  />
                }
                label="Remember me"
              />
            </Grid>
            <Grid item>
              <Link
                href="#"
                variant="body1"
                color="#000"
                onClick={() => console.log("Forgot password clicked")}
              >
                Forgot password?
              </Link>
            </Grid>
          </Grid> */}
          <Button
            type="submit"
            fullWidth
            variant="contained"
            className={classes.submit}
          >
            Register
          </Button>
          {/* <RouterLink to="/login" style={{ textDecoration: "none" }}>
            <Button
              fullWidth
              variant="contained"
              className={classes.backToLogin}
            >
              Back to Login
            </Button>
          </RouterLink> */}
        </form>
      </Container>
    </div>
  );
}

export default Register;
