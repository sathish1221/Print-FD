import React, { useState } from "react";
import {
  Button,
  Container,
  FormControl,
  IconButton,
  InputAdornment,
  TextField,
  Typography,
  FormLabel,
} from "@material-ui/core";
import Visibility from "@material-ui/icons/Visibility";
import VisibilityOff from "@material-ui/icons/VisibilityOff";
import { makeStyles } from "@material-ui/core/styles";
import Axios from "../Axios";
import { useNavigate } from "react-router-dom";
import '../css/style.css';

const useStyles = makeStyles((theme) => ({
  "@keyframes glow": {
    "0%": {
      boxShadow: "0 0 5px rgba(0, 123, 255, 0.4)",
    },
    "50%": {
      boxShadow: "0 0 20px rgba(0, 123, 255, 0.8)",
    },
    "100%": {
      boxShadow: "0 0 5px rgba(0, 123, 255, 0.4)",
    },
  },
  
  container: {
    marginTop: theme.spacing(8),
    display: "flex",
    flexDirection: "column",
    alignItems: "center",
    backgroundColor: "white", 
    padding: theme.spacing(4),
    borderRadius: theme.spacing(1),
    width: "100%", 
    [theme.breakpoints.up("sm")]: {
      maxWidth: "600px", 
    },
  },
  formControlInline: {
    display: "flex",
    alignItems: "center",
    justifyContent: "space-between",
    "& > div": {
      width: "48%",
      marginBottom: theme.spacing(2), 
    },
    [theme.breakpoints.down("sm")]: {
      flexDirection: "column", 
      "& > div": {
        width: "100%", 
      },
    },
  },
  submit: {
    margin: theme.spacing(3, 0, 2),
    backgroundColor: theme.palette.primary.main,
    color: "#fff",
    transition: "background-color 0.3s, box-shadow 0.3s", 
    "&:hover": {
      animation: "$glow 1.5s infinite",
      backgroundColor: theme.palette.primary.dark,
    },
  },
  glowTypography: {
    "&:hover": {
      animation: "$glow 1.5s infinite",
      color: theme.palette.primary.main,
    },
  },
  fileInput: {
    display: 'none',
  },
  customFileUpload: {
    border: '1px solid #ccc',
    display: 'inline-block',
    padding: '6px 12px',
    cursor: 'pointer',
    width: '100%',
    boxSizing: 'border-box',
    height: '56px',
    borderRadius: '4px',
    '&:hover': {
      borderColor: theme.palette.primary.main,
    },
  },
  fileLabel: {
    display: 'flex',
    alignItems: 'center',
    justifyContent: 'center',
    height: '100%',
    color: '#888',
    fontWeight: 'bold',
  }
}));

function NewUser() {
  const classes = useStyles();
  const navigate = useNavigate();

  const initialFormData = {
    first_name: "",
    last_name: "",
    company_name: "",
    email: "",
    phone: "",
    whatsapp: "",
    password: "",
    password_confirmation: "",
    gst: "",
    address1: "",
    address2: "",
    city: "",
    pincode: "",
    state: "",
    status: "",
    role: "user",
    company_logo: null,
    join_date: "",
  };

  const [formData, setFormData] = useState(initialFormData);
  const [showPassword, setShowPassword] = useState(false);
  const [showConfirm, setShowConfirm] = useState(false);
  const [responseMessage, setResponseMessage] = useState("");

  const handleChange = (event) => {
    const { name, value } = event.target;
    setFormData((prevData) => ({
      ...prevData,
      [name]: value,
    }));
  };

  const handleClickShowPassword = () => {
    setShowPassword(!showPassword);
  };

  const handleShowConfirmPass = () => {
    setShowConfirm(!showConfirm);
  };

  const handleMouseDownPassword = (event) => {
    event.preventDefault();
  };

  const handleMouseDownPassword1 = (event) => {
    event.preventDefault();
  };

  const handleCompanyLogoChange = (event) => {
    const file = event.target.files[0];
    if (file) {
      convertFileToBase64(file)
        .then((base64) => {
          setFormData((prevData) => ({
            ...prevData,
            company_logo: base64,
          }));
        })
        .catch((error) => {
          console.error("Error converting file to base64:", error);
        });
    }
  };

  const convertFileToBase64 = (file) => {
    return new Promise((resolve, reject) => {
      const reader = new FileReader();
      reader.readAsDataURL(file);
      reader.onload = () => resolve(reader.result.split(",")[1]);
      reader.onerror = (error) => reject(error);
    });
  };

  const handleRegister = async (event) => {
    event.preventDefault();
    try {
      const token = localStorage.getItem("token");
      if (!token) {
        throw new Error("No token found");
      }
      const response = await Axios.post("/auth/register", formData, {
        headers: {
          "Content-Type": "application/json",
          Authorization: "Bearer " + token,
        },
      });

      console.log("Success ========>", response);
      if (response?.status === 200) {
        localStorage.setItem("token", response?.data?.token);
        alert("User created successfully.");
        setFormData(initialFormData); 
        setResponseMessage(""); 
        navigate("");
      } else {
        setResponseMessage(
          "Invalid response from server. Please try again later."
        );
      }
    } catch (error) {
      console.error("Error ========>", error);
      if (error.response && error.response.status === 401) {
        setResponseMessage("Invalid email or password. Please try again.");
      } else if (error.request) {
        setResponseMessage("No response from server. Please try again later.");
      } else {
        setResponseMessage("An error occurred. Please try again later.");
      }
    }
  };

  return (
    <div
      style={{
        backgroundColor: "transparent",
        height: "100vh",
        display: "flex",
        alignItems: "center",
        justifyContent: "center",
        position: "relative",
      }}
    >
      <Container component="main" maxWidth="xs" className={classes.container}>
        <Typography component="h1" variant="h5" className={classes.glowTypography}>
          Register
        </Typography>
        <form className={classes.form} onSubmit={handleRegister}>
          <div className={classes.formControlInline}>
            <FormControl margin="normal" required fullWidth>
              <TextField
                label="Firstname"
                name="first_name"
                value={formData.first_name}
                onChange={handleChange}
                variant="outlined"
              />
            </FormControl>
            <FormControl margin="normal" required fullWidth>
              <TextField
                label="Lastname"
                name="last_name"
                value={formData.last_name}
                onChange={handleChange}
                variant="outlined"
              />
            </FormControl>
          </div>
          <div className={classes.formControlInline}>
            <FormControl margin="normal" required fullWidth>
              <TextField
                label="Email"
                type="email"
                name="email"
                value={formData.email}
                onChange={handleChange}
                variant="outlined"
              />
            </FormControl>
            <FormControl margin="normal" required>
              <TextField
                label="Phone Number"
                name="phone"
                value={formData.phone}
                onChange={handleChange}
                variant="outlined"
              />
            </FormControl>
          </div>
          <div className={classes.formControlInline}>
            <FormControl margin="normal" required fullWidth>
              <TextField
                label="Company Name"
                name="company_name"
                value={formData.company_name}
                onChange={handleChange}
                variant="outlined"
              />
            </FormControl>
            <FormControl margin="normal" required>
              <TextField
                label="Whatsapp Number"
                name="whatsapp"
                value={formData.whatsapp}
                onChange={handleChange}
                variant="outlined"
              />
            </FormControl>
          </div>
          <div className={classes.formControlInline}>
            <FormControl margin="normal" required fullWidth>
              <TextField
                label="Password"
                type={showPassword ? "text" : "password"}
                name="password"
                value={formData.password}
                onChange={handleChange}
                variant="outlined"
                InputProps={{
                  endAdornment: (
                    <InputAdornment position="end">
                      <IconButton
                        aria-label="toggle password visibility"
                        onClick={handleClickShowPassword}
                        onMouseDown={handleMouseDownPassword}
                      >
                        {showPassword ? <Visibility /> : <VisibilityOff />}
                      </IconButton>
                    </InputAdornment>
                  ),
                }}
              />
            </FormControl>
            <FormControl margin="normal" required>
              <TextField
                label="Confirm Password"
                type={showConfirm ? "text" : "password"}
                name="password_confirmation"
                value={formData.password_confirmation}
                onChange={handleChange}
                variant="outlined"
                InputProps={{
                  endAdornment: (
                    <InputAdornment position="end">
                      <IconButton
                        aria-label="toggle password visibility"
                        onClick={handleShowConfirmPass}
                        onMouseDown={handleMouseDownPassword1}
                      >
                        {showConfirm ? <Visibility /> : <VisibilityOff />}
                      </IconButton>
                    </InputAdornment>
                  ),
                }}
              />
            </FormControl>
          </div>
          <div className={classes.formControlInline}>
            <FormControl margin="normal" required fullWidth>
              <TextField
                label="Address 1"
                name="address1"
                value={formData.address1}
                onChange={handleChange}
                variant="outlined"
              />
            </FormControl>
            <FormControl margin="normal" required fullWidth>
              <TextField
                label="Address 2"
                name="address2"
                value={formData.address2}
                onChange={handleChange}
                variant="outlined"
              />
            </FormControl>
          </div>
          <div className={classes.formControlInline}>
            <FormControl margin="normal" required>
              <TextField
                label="City"
                name="city"
                value={formData.city}
                onChange={handleChange}
                variant="outlined"
              />
            </FormControl>
            <FormControl margin="normal" required>
              <TextField
                label="Pincode"
                name="pincode"
                value={formData.pincode}
                onChange={handleChange}
                variant="outlined"
              />
            </FormControl>
          </div>
          <div className={classes.formControlInline}>
            <FormControl margin="normal" fullWidth>
              <TextField
                label="State"
                name="state"
                value={formData.state}
                onChange={handleChange}
                variant="outlined"
              />
            </FormControl>
            <FormControl margin="normal" required fullWidth>
              <input
                type="file"
                name="company_logo"
                onChange={handleCompanyLogoChange}
                accept="image/*"
                id="company-logo"
                className={classes.fileInput}
              />
              <label htmlFor="company-logo" className={classes.customFileUpload}>
                <span className={classes.fileLabel}>Upload Company Logo</span>
              </label>
            </FormControl>
          </div>
          <div className={classes.formControlInline}>
            <FormControl margin="normal" required fullWidth>
              <TextField
                label="GST Number"
                name="gst"
                value={formData.gst}
                onChange={handleChange}
                variant="outlined"
              />
            </FormControl>
            <FormControl margin="normal" required fullWidth>
              <TextField
                label="Status"
                name="status"
                value={formData.status}
                onChange={handleChange}
                variant="outlined"
              />
            </FormControl>
          </div>
          <div className={classes.formControlInline}>
          <FormControl margin="normal" required fullWidth>
              <FormLabel>Event Date</FormLabel>
              <TextField
                name="join_date"
                type="date"
                value={formData.join_date}
                variant="outlined"
                onChange={handleChange}
                InputLabelProps={{
                  shrink: true,
                }}
              />
          </FormControl>
          </div>
          <Button
            type="submit"
            fullWidth
            variant="contained"
            color="primary"
            className={classes.submit}
          >
            Add User
          </Button>
          {responseMessage && (
            <Typography color="error" variant="body1" align="center">
              {responseMessage}
            </Typography>
          )}
        </form>
      </Container>
    </div>
  );
}

export default NewUser;