import React, { useState } from "react";
import {
  Button,
  Container,
  FormControl,
  Select,
  TextField,
  Typography,
} from "@material-ui/core";
import { makeStyles } from "@material-ui/core/styles";
import Axios from "../Axios";
import { useNavigate } from "react-router-dom";
import { MenuItem } from "@mui/material";

const useStyles = makeStyles((theme) => ({
  container: {
    marginTop: theme.spacing(8),
    display: "flex",
    flexDirection: "column",
    alignItems: "center",
    backgroundColor: "rgba(255, 255, 255, 0.8)",
    padding: theme.spacing(4),
    borderRadius: theme.spacing(1),
    width: "50%",
  },
  form: {
    width: "100%",
    marginTop: theme.spacing(1),
  },
  submit: {
    margin: theme.spacing(3, 0, 2),
  },
  formControlInline: {
    display: "flex",
    alignItems: "center",
    justifyContent: "space-between",
    "& > div": {
      width: "48%",
    },
  },
}));

function AddFestival() {
  const classes = useStyles();
  const navigate = useNavigate();

  const [inputs, setInputs] = useState({
    title: "",
    description: "",
    event_date: "",
    status: "",
  });

  const [responseMessage, setResponseMessage] = useState("");

  const handleChange = (event) => {
    setInputs({ ...inputs, [event.target.name]: event.target.value });
  };

  const handleEvent = async (event) => {
    event.preventDefault();

    const data = {
      title: inputs.title,
      description: inputs.description,
      event_date: inputs.event_date,
      status: inputs.status,
    };

    try {
      const token = localStorage.getItem("token");
      if (!token) {
        setResponseMessage("No token found. Please log in.");
        throw new Error("No token found");
      }
      const response = await Axios.post("store-events", data, {
        headers: {
          "Content-Type": "application/json",
          Authorization: `Bearer ${token}`,
        },
      });

      console.log("Success ========>", response);
      if (response?.status === 201) {
        alert("Event created successfully.");
        navigate("/image-upload");
      } else {
        setResponseMessage("Invalid response from server. Please try again later.");
      }
    } catch (error) {
      console.error("Error ========>", error);
      if (error.response) {
        if (error.response.status === 401) {
          setResponseMessage("Unauthorized access. Please log in again.");
        } else if (error.response.status === 422) {
          setResponseMessage("Validation error: " + error.response.data.message);
        } else if (error.response.status === 404) {
          setResponseMessage("Endpoint not found. Please check the URL.");
        } else {
          setResponseMessage("Server error: " + error.response.status);
        }
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
        <Typography component="h1" variant="h5">
          Add Festival
        </Typography>
        <form className={classes.form} onSubmit={handleEvent}>
          <div className={classes.formControlInline}>
            <FormControl margin="normal" required fullWidth>
              <TextField
                label="Title"
                name="title"
                onChange={handleChange}
                variant="outlined"
              />
            </FormControl>
            <FormControl margin="normal" required fullWidth>
              <TextField
                label="Description"
                name="description"
                onChange={handleChange}
                variant="outlined"
              />
            </FormControl>
          </div>
          <div className={classes.formControlInline}>
            <FormControl margin="normal" required fullWidth>
              <TextField
                type="date"
                name="event_date"
                onChange={handleChange}
                variant="outlined"
              />
            </FormControl>
            <FormControl fullWidth variant="outlined" margin="normal">
              <Select
                onChange={handleChange}
                variant="outlined"
                name="status"
                value={inputs.status}
                displayEmpty
              >
                <MenuItem value="" disabled>
                  Select Status
                </MenuItem>
                <MenuItem value="soon">Soon</MenuItem>
                <MenuItem value="start">Start</MenuItem>
                <MenuItem value="complete">Complete</MenuItem>
              </Select>
            </FormControl>
          </div>
          <Button
            type="submit"
            fullWidth
            variant="contained"
            color="primary"
            className={classes.submit}
          >
            Add
          </Button>
          {responseMessage && <p>{responseMessage}</p>}
        </form>
      </Container>
    </div>
  );
}

export default AddFestival;
