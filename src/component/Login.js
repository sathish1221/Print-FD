import React, { useState } from "react";
import {
  Avatar,
  Button,
  Container,
  FormControl,
  IconButton,
  InputAdornment,
  Link,
  TextField,
  Typography,
} from "@material-ui/core";
import AccountCircleIcon from "@material-ui/icons/AccountCircle";
import Visibility from "@material-ui/icons/Visibility";
import VisibilityOff from "@material-ui/icons/VisibilityOff";
import { makeStyles } from "@material-ui/core/styles";
import images3 from "../assets/logo.png";
import Axios from "../Axios";
import { useNavigate } from "react-router-dom";
import Swal from "sweetalert2";

const useStyles = makeStyles((theme) => ({
  container: {
    marginTop: theme.spacing(15),
    display: "flex",
    flexDirection: "column",
    alignItems: "center",
    backgroundColor: "#fff",
    padding: theme.spacing(4),
    borderRadius: theme.spacing(1),
  },
  submit: {
    margin: theme.spacing(1, 0, 2),
    backgroundColor: "#7f223d !important",
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
  errorText: {
    color: "red",
    fontSize: "14px",
    marginTop: theme.spacing(1),
  },
  passwordContainer: {
    display: "flex",
    justifyContent: "space-between",
    alignItems: "center",
    marginTop: theme.spacing(2),
  },
  passwordChar: {
    width: "25px",
    height: "25px",
    border: "1px solid #000",
    display: "flex",
    justifyContent: "center",
    alignItems: "center",
    margin: "0 2px",
  },
  dot: {
    width: "10px",
    height: "10px",
    borderRadius: "50%",
    backgroundColor: "#000",
  },
  hiddenInput: {
    position: "absolute",
    opacity: 0,
    width: "100%",
    height: "100%",
    cursor: "pointer",
  },
}));

function Signin() {
  const classes = useStyles();
  const navigate = useNavigate();

  const [login, setLogin] = useState("");
  const [password, setPassword] = useState("");
  const [showPassword, setShowPassword] = useState(false);
  const [errors, setErrors] = useState({ login: "", password: "" });

  const handleLoginChange = (event) => {
    setLogin(event.target.value);
  };

  const handlePasswordChange = (event) => {
    if (event.target.value.length <= 4) {
      setPassword(event.target.value);
    }
  };

  const handleClickShowPassword = () => {
    setShowPassword(!showPassword);
  };

  const handleMouseDownPassword = (event) => {
    event.preventDefault();
  };

  const validateForm = () => {
    let valid = true;
    const newErrors = { login: "", password: "" };

    const isEmail = /^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(login);
    const isMobile = /^\d{10}$/.test(login);

    if (!login.trim()) {
      newErrors.login = "Email or Mobile is required";
      valid = false;
    } else if (!isEmail && !isMobile) {
      newErrors.login = "Enter a valid Email or Mobile number";
      valid = false;
    }
    if (!password.trim()) {
      newErrors.password = "Password is required";
      valid = false;
    }

    setErrors(newErrors);
    return valid;
  };

  const showAlert = (title, text, icon = "warning") => {
    Swal.fire({
      title: title,
      icon: icon,
      text: text,
      showConfirmButton: true,
      confirmButtonText: "OK",
    });
  };

  const showSuccessAlert = (text) => {
    Swal.fire({
        title: 'Welcome.',
        icon: 'success',
        text: text,
        showConfirmButton: true,
        confirmButtonText: "OK",
    });
  };

  const handleLoginSubmit = async (event) => {
    event.preventDefault();

    if (!validateForm()) {
      return;
    }

    try {
      console.log("Attempting to login with:", { login, password });

      const response = await Axios.post("/auth/login", {
        login: login,
        password: password,
      });

      console.log("API Response:", response);
      if (response?.status === 200) {
        localStorage.setItem("token", response?.data?.token);
        localStorage.setItem("userId", response?.data?.id);

        if (response?.data?.role === "admin") {
          showSuccessAlert(response?.data?.message);
          navigate("/side");
        } else {
          showSuccessAlert(response?.data?.message);
          navigate("/EventsList");
        }
      } else {
        showAlert("Error", "Invalid response from server. Please try again later.");
      }
    } catch (error) {
      console.error("Login Error:", error);
      if (error.response) {
        if (error.response.status === 401) {
          if (error.response.data.error === "Unauthorized") {
            showAlert("Error", "Invalid email or password. Please try again.");
          } else if (error.response.data.error === "Incorrect password") {
            showAlert("Error", "Incorrect password. Please try again.");
          } else {
            showAlert("Error", `Error: ${error.response.data.message}`);
          }
        } else {
          showAlert("Warning", `${error.response.data.message}`);
        }
      } else if (error.request) {
        showAlert("Error", "No response from server. Please try again later.");
      } else {
        showAlert("Error", "An error occurred. Please try again later.");
      }
    }
  };

  const renderPassword = () => {
    const passwordChars = password.split("");
    const placeholders = Array(4).fill("");

    return placeholders.map((_, index) => (
      <div key={index} className={classes.passwordChar}>
        {passwordChars[index] ? <div className={classes.dot}></div> : null}
      </div>
    ));
  };

  return (
    <div
    style={{
      backgroundColor: "#7f223d",
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
        style={{ display: "flex", justifyContent: "center", height: "150px", width: "150px" }}
      />
    </div>
    <Container component="main" maxWidth="xs" className={classes.container}>
      <Typography component="h1" variant="h5">
        Sign in
      </Typography>
      <form className={classes.form} onSubmit={handleLoginSubmit}>
        <FormControl margin="normal" required fullWidth>
          <label htmlFor="login">Email or Mobile</label>
          <TextField
            id="login"
            name="login"
            value={login}
            onChange={handleLoginChange}
            variant="outlined"
            autoFocus
            error={!!errors.login}
            helperText={errors.login}
            InputProps={{
              endAdornment: (
                <InputAdornment position="end">
                  <Avatar>
                    <AccountCircleIcon />
                  </Avatar>
                </InputAdornment>
              ),
            }}
          />
        </FormControl>
        <FormControl margin="normal" required fullWidth>
          <label htmlFor="password">Password</label>
          <div className={classes.passwordContainer}>
            {renderPassword()}
            <input
              type={showPassword ? "text" : "password"}
              value={password}
              onChange={handlePasswordChange}
              className={classes.hiddenInput}
              maxLength={4}
              autoComplete="off"
            />
            <IconButton
              aria-label="toggle password visibility"
              onClick={handleClickShowPassword}
              onMouseDown={handleMouseDownPassword}
            >
              {showPassword ? <Visibility /> : <VisibilityOff />}
            </IconButton>
          </div>
          {errors.password && <Typography className={classes.errorText}>{errors.password}</Typography>}
        </FormControl>
        <Typography variant="body2">
          <Link href="/forgot-pass" onClick={() => console.log("Forgot password clicked")}>
            Forgot password?
          </Link>
        </Typography>
        <Button
          type="submit"
          fullWidth
          variant="contained"
          color="primary"
          className={classes.submit}
        >
          Sign In
        </Button>
      </form>
    </Container>
  </div>
);
}

export default Signin;
