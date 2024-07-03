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

const useStyles = makeStyles({
  tableContainer: {
    maxHeight: 440,
    border: "1px solid #fff",
    borderRadius: "15px",
  },
  tableHeader: {
    backgroundColor: "#014550",
    color: "#fff",
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
        <TableCell>
          <IconButton
            aria-label="expand row"
            size="small"
            onClick={() => setOpen(!open)}
          >
            {open ? <KeyboardArrowUpIcon /> : <KeyboardArrowDownIcon />}
          </IconButton>
        </TableCell>
        <TableCell>{row.title}</TableCell>
        <TableCell>{row.description}</TableCell>
        <TableCell>{row.event_date}</TableCell>
        <TableCell>{row.status}</TableCell>
        <TableCell>
          <Button className={classes.editButton} onClick={() => handleEdit(row)}>Edit</Button>
          <Button className={classes.deleteButton} onClick={() => handleDelete(row.id)}>Delete</Button>
        </TableCell>
      </TableRow>
      <TableRow>
        <TableCell style={{ paddingBottom: 0, paddingTop: 0 }} colSpan={6}>
          <Collapse in={open} timeout="auto" unmountOnExit>
            <Box sx={{ margin: 1 }}>
              <Typography variant="h6" gutterBottom component="div">
                Details
              </Typography>
              <Table size="small" aria-label="details">
                <TableBody>
                  <TableRow>
                    <TableCell>Title</TableCell>
                    <TableCell>{row.title}</TableCell>
                  </TableRow>
                  <TableRow>
                    <TableCell>Description</TableCell>
                    <TableCell>{row.description}</TableCell>
                  </TableRow>
                  <TableRow>
                    <TableCell>Event Date</TableCell>
                    <TableCell>{row.event_date}</TableCell>
                  </TableRow>
                  <TableRow>
                    <TableCell>Status</TableCell>
                    <TableCell>{row.status}</TableCell>
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
  };

  const handleSubmit = async () => {
    try {
      if (isAddMode) {
        await Axios.post("/store-events", selectedEvent, {
          headers: {
            Authorization: `Bearer ${localStorage.getItem("token")}`,
            "Content-Type": "application/json",
          },
        });
        Swal.fire("Success", "Event added successfully", "success");
      } else {
        await Axios.put(`/events/${selectedEvent.id}`, selectedEvent, {
          headers: {
            Authorization: `Bearer ${localStorage.getItem("token")}`,
            "Content-Type": "application/json",
          },
        });
        Swal.fire("Success", "Event updated successfully", "success");
      }
      getEventList();
      handleClose();
    } catch (error) {
      console.warn("Error in saving event", error);
      Swal.fire("Error", `Failed to ${isAddMode ? "add" : "update"} event`, "error");
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
              <TableCell />
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
              />
              <TextField
                margin="dense"
                name="description"
                label="Description"
                type="text"
                fullWidth
                value={selectedEvent.description}
                onChange={handleChange}
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
              >
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
