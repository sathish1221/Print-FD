import React, { useState, useEffect } from "react";
import {
  Table,
  TableBody,
  TableCell,
  TableContainer,
  TableHead,
  TableRow,
  Paper,
  makeStyles,
  Box,
  Collapse,
  IconButton,
  Typography,
  Button,
  Dialog,
  DialogTitle,
  DialogContent,
  DialogActions,
  TextField,
  MenuItem,
  FormControl,
  FormLabel,
} from "@material-ui/core";
import KeyboardArrowDownIcon from "@mui/icons-material/KeyboardArrowDown";
import KeyboardArrowUpIcon from "@mui/icons-material/KeyboardArrowUp";
import Axios from "../Axios";
import PropTypes from "prop-types";
import Swal from "sweetalert2";
import Logo from '../assets/logo1.png';

const useStyles = makeStyles({
  tableContainer: {
    maxHeight: 440,
    border: "1px solid #fff",
    borderRadius: "15px",
  },
  tableHeader: {
    backgroundColor: "#014550",
    color: "#fff",
    textAlign: 'center',
  },
  tableHeader1: {
    fontWeight: 600,
    textAlign: 'center',
  },
  tableRow: {
    backgroundColor: "#f5f5f5",
  },
  tableCell: {
    backgroundColor: "rgba(255, 255, 255, 0.8)",
  },
  tableBorder: {
    borderColor: "#000",
  },
  tabledata: {
    textAlign: 'center',
  },
  editButton: {
    color: "white",
    backgroundColor: "green",
    padding: "7px !important",
    marginRight: "5px",
    '&:hover': {
      backgroundColor: "darkgreen",
    },
  },
  deleteButton: {
    color: "white",
    backgroundColor: "red",
    padding: "7px !important",
    '&:hover': {
      backgroundColor: "darkred",
    },
  },
  addButton: {
    marginBottom: 10,
    backgroundColor: "#014550",
    color: "#fff",
    '&:hover': {
      backgroundColor: "#013440",
    },
  },
});

function Row(props) {
  const { row, handleEdit, handleDelete, classes } = props;
  const [open, setOpen] = useState(false);

  return (
    <React.Fragment>
      <TableRow>
        <TableCell className={classes.tabledata}>
          <IconButton
            aria-label="expand row"
            size="small"
            onClick={() => setOpen(!open)}
          >
            {open ? <KeyboardArrowUpIcon /> : <KeyboardArrowDownIcon />}
          </IconButton>
        </TableCell>
        <TableCell className={classes.tabledata}>{row.title}</TableCell>
        <TableCell className={classes.tabledata}>{row.description}</TableCell>
        <TableCell className={classes.tabledata}>{row.event_date}</TableCell>
        <TableCell className={classes.tabledata}>{row.status}</TableCell>
        <TableCell className={classes.tabledata}>
          <Button className={classes.editButton} onClick={() => handleEdit(row)}>Edit</Button>
          <Button className={classes.deleteButton} onClick={() => handleDelete(row.id)}>Delete</Button>
        </TableCell>
      </TableRow>
      <TableRow>
        <TableCell style={{ paddingBottom: 0, paddingTop: 0, background: '#e9e9e9' }} colSpan={6}>
          <Collapse in={open} timeout="auto" unmountOnExit>
            <Box sx={{ margin: 1 }}>
              <Typography variant="h6" gutterBottom component="div">
                Details
              </Typography>
              <Table size="small" aria-label="details">
                <TableHead>
                  <TableRow>
                    <TableCell className={classes.tableHeader1}>Title</TableCell>
                    <TableCell className={classes.tableHeader1}>Description</TableCell>
                    <TableCell className={classes.tableHeader1}>Event Date</TableCell>
                    <TableCell className={classes.tableHeader1}>Status</TableCell>
                  </TableRow>
                </TableHead>
                <TableBody>
                  <TableRow>
                    <TableCell className={classes.tabledata}>{row.title}</TableCell>
                    <TableCell className={classes.tabledata}>{row.description}</TableCell>
                    <TableCell className={classes.tabledata}>{row.event_date}</TableCell>
                    <TableCell className={classes.tabledata}>{row.status}</TableCell>
                    <TableCell>
                    </TableCell>
                  </TableRow>
                </TableBody>
              </Table>
            </Box>
          </Collapse>
        </TableCell>
      </TableRow>
    </React.Fragment>
  );
}

Row.propTypes = {
  row: PropTypes.shape({
    id: PropTypes.number.isRequired,
    title: PropTypes.string.isRequired,
    description: PropTypes.string.isRequired,
    event_date: PropTypes.string.isRequired,
    status: PropTypes.string.isRequired,
  }).isRequired,
  handleEdit: PropTypes.func.isRequired,
  handleDelete: PropTypes.func.isRequired,
  classes: PropTypes.object.isRequired,
};

const AllEvents = () => {
  const classes = useStyles();
  const [eventList, setEventList] = useState([]);
  const [open, setOpen] = useState(false);
  const [selectedEvent, setSelectedEvent] = useState(null);
  const [isAddMode, setIsAddMode] = useState(false);
  const [errors, setErrors] = useState({});

  const getEventList = async () => {
    try {
      const response = await Axios.get("/events", {
        headers: {
          Authorization: `Bearer ${localStorage.getItem("token")}`,
          "Content-Type": "application/json",
        },
      });
      setEventList(response.data.events);
    } catch (error) {
      console.warn("Error in getting event list", error);
    }
  };

  const handleEdit = (event) => {
    setSelectedEvent(event);
    setIsAddMode(false);
    setOpen(true);
  };

  const handleAdd = () => {
    setSelectedEvent({ title: "", description: "", event_date: "", status: "start" });
    setIsAddMode(true);
    setOpen(true);
  };

  const handleDelete = async (id) => {
    try {
      await Axios.delete(`events/${id}`, {
        headers: {
          Authorization: `Bearer ${localStorage.getItem("token")}`,
          "Content-Type": "application/json",
        },
      });
      setEventList(eventList.filter((event) => event.id !== id));
      Swal.fire("Success", "Event deleted successfully", "success");
    } catch (error) {
      console.warn("Error in deleting event", error);
      Swal.fire("Error", "Failed to delete event", "error");
    }
  };

  const handleClose = () => {
    setOpen(false);
    setSelectedEvent(null);
    setErrors({});
  };

  const handleSubmit = async () => {
    try {
      const config = {
        headers: {
          Authorization: `Bearer ${localStorage.getItem("token")}`,
          "Content-Type": "application/json",
        },
      };
      if (isAddMode) {
        await Axios.post("/store-events", selectedEvent, config);
        Swal.fire("Success", "Event added successfully", "success");
      } else {
        await Axios.put(`/events/${selectedEvent.id}`, selectedEvent, config);
        Swal.fire("Success", "Event updated successfully", "success");
      }
      getEventList();
      handleClose();
    } catch (error) {
      if (error.response && error.response.data.errors) {
        setErrors(error.response.data.errors);
      } else {
        console.warn("Error in saving event", error);
        Swal.fire("Error", `Failed to ${isAddMode ? "add" : "update"} event`, "error");
      }
    }
  };

  const handleChange = (e) => {
    const { name, value } = e.target;
    setSelectedEvent({
      ...selectedEvent,
      [name]: value,
    });
  };

  useEffect(() => {
    getEventList();
  }, []);

  return (
    <>
      <Button className={classes.addButton} onClick={handleAdd}>
        Add Event
      </Button>
      <TableContainer component={Paper} className={classes.tableContainer}>
        <Table stickyHeader className={classes.tableBorder}>
          <TableHead>
            <TableRow>
              <TableCell className={classes.tableHeader}><img src={Logo} alt="Logo" style={{ width: '50px', height: '40px' }} /></TableCell>
              <TableCell className={classes.tableHeader}>TITLE</TableCell>
              <TableCell className={classes.tableHeader}>DESCRIPTION</TableCell>
              <TableCell className={classes.tableHeader}>EVENT DATE</TableCell>
              <TableCell className={classes.tableHeader}>STATUS</TableCell>
              <TableCell className={classes.tableHeader}>ACTION</TableCell>
            </TableRow>
          </TableHead>
          <TableBody>
            {eventList?.map((row, index) => (
              <Row
                key={index}
                row={row}
                handleEdit={handleEdit}
                handleDelete={handleDelete}
                classes={classes}
              />
            ))}
          </TableBody>
        </Table>
      </TableContainer>

      <Dialog open={open} onClose={handleClose}>
        <DialogTitle>{isAddMode ? "Add Event" : "Edit Event"}</DialogTitle>
        <DialogContent>
          {selectedEvent && (
            <>
              <TextField
                autoFocus
                margin="dense"
                name="title"
                label="Title"
                type="text"
                fullWidth
                value={selectedEvent.title}
                onChange={handleChange}
                error={!!errors.title}
                helperText={errors.title}
              />
              <TextField
                margin="dense"
                name="description"
                label="Description"
                type="text"
                fullWidth
                value={selectedEvent.description}
                onChange={handleChange}
                error={!!errors.description}
                helperText={errors.description}
              />
              <FormControl fullWidth margin="dense">
                <FormLabel>Event Date</FormLabel>
                <TextField
                  name="event_date"
                  type="date"
                  value={selectedEvent.event_date}
                  onChange={handleChange}
                  InputLabelProps={{
                    shrink: true,
                  }}
                  error={!!errors.event_date}
                  helperText={errors.event_date}
                />
              </FormControl>
              <TextField
                margin="dense"
                name="status"
                label="Status"
                type="text"
                fullWidth
                select
                value={selectedEvent.status}
                onChange={handleChange}
                error={!!errors.status}
                helperText={errors.status}
              >
                <MenuItem value="start">Start</MenuItem>
                <MenuItem value="start">Start</MenuItem>
                <MenuItem value="soon">Soon</MenuItem>
                <MenuItem value="complete">Complete</MenuItem>
              </TextField>
            </>
          )}
        </DialogContent>
        <DialogActions>
          <Button onClick={handleClose} color="primary">
            Cancel
          </Button>
          <Button onClick={handleSubmit} color="primary">
            Save
          </Button>
        </DialogActions>
      </Dialog>
    </>
  );
};

export default AllEvents;
