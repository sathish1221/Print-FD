
import React, { useState, useEffect } from "react";
import {
  Table,
  TableBody,
  TableCell,
  TableContainer,
  TableHead,
  TableRow,
  Paper,
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
import Swal from "sweetalert2";
import PropTypes from "prop-types";
import Logo from '../assets/logo1.png'
import { makeStyles } from "@material-ui/core/styles";
import Pagination from '@material-ui/lab/Pagination';

const useStyles = makeStyles({
  tableContainer: {
    maxHeight: 440,
    border: "1px solid #fff",
    borderRadius: "15px",
  },
  tableHeader: {
    backgroundColor: "#014550",
    color: "#fff",
    textAlign:'center'
  },
  tableHeader1: {
    fontWeight:600,
    textAlign:'center'
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
  tabledata:{
textAlign:'center'
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
    backgroundColor: "green",
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
            {open ? <KeyboardArrowUpIcon  /> : <KeyboardArrowDownIcon />}
          </IconButton>
        </TableCell>
        <TableCell className={classes.tabledata}>{row.title}</TableCell>
        <TableCell className={classes.tabledata}>{row.description}</TableCell>
        <TableCell className={classes.tabledata}>
          <Button className={classes.editButton} onClick={() => handleEdit(row)}>Edit</Button>
          <Button className={classes.deleteButton} onClick={() => handleDelete(row.design_id)}>Delete</Button>
        </TableCell>
      </TableRow>
      <TableRow>
        <TableCell style={{ paddingBottom: 0, paddingTop: 0 ,background:'#e9e9e9'}} colSpan={6}>
          <Collapse in={open} timeout="auto" unmountOnExit>
            <Box sx={{ margin: 1 }}>
              <Typography variant="h6" gutterBottom component="div">
                Details
              </Typography>
              <Table size="small" aria-label="details">
                <TableBody>
                  <TableRow>
                    
                    <TableCell className={classes.tableHeader1} >Title</TableCell>
                    <TableCell>{row.title}</TableCell>
                  </TableRow>
                  <TableRow>
                    <TableCell className={classes.tableHeader1}>Description</TableCell>
                    <TableCell>{row.description}</TableCell>
                  </TableRow>
                  <TableRow>
                    <TableCell className={classes.tableHeader1}>Images</TableCell>
                    <TableCell>
                      {row.images.map((image, index) => (
                        <img key={index} src={`data:image/jpeg;base64,${image}`} alt="Event Design" style={{ width: '100px', margin: '5px' }} />
                      ))}
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
    design_id: PropTypes.number.isRequired,
    event_id: PropTypes.number.isRequired,
    title: PropTypes.string.isRequired,
    description: PropTypes.string.isRequired,
    images: PropTypes.arrayOf(PropTypes.string).isRequired,
  }).isRequired,
  handleEdit: PropTypes.func.isRequired,
  handleDelete: PropTypes.func.isRequired,
  classes: PropTypes.object.isRequired,
};

const AllEventDesigns = () => {
  const classes = useStyles();
  const [eventDesignList, setEventDesignList] = useState([]);
  const [open, setOpen] = useState(false);
  const [selectedEventDesign, setSelectedEventDesign] = useState(null);
  const [isAddMode, setIsAddMode] = useState(false);
  const [events, setEvents] = useState([]);
  const [pagination, setPagination] = useState({});
  const [page, setPage] = useState(1);

  const getEventDesignList = async (page = 1) => {
    try {
      const response = await Axios.get(`/event-designs?page=${page}`, {
        headers: {
          Authorization: `Bearer ${localStorage.getItem("token")}`,
          "Content-Type": "application/json",
        },
      });
      setEventDesignList(response.data.Design);
      setPagination(response.data.pagination); // Assuming you have a state for pagination data
    } catch (error) {
      console.warn("Error in getting event design list", error);
    }
  };

  const handlePageChange = (event, value) => {
    setPage(value);
    getEventDesignList(value);
  };

  useEffect(() => {
    getEventDesignList(page);
  }, [page]);

  const getEvents = async () => {
    try {
      const response = await Axios.get("/events", {
        headers: {
          Authorization: `Bearer ${localStorage.getItem("token")}`,
          "Content-Type": "application/json",
        },
      });
      setEvents(response.data);
    } catch (error) {
      console.warn("Error in getting events list", error);
    }
  };

  const handleEdit = (eventDesign) => {
    setSelectedEventDesign(eventDesign);
    setIsAddMode(false);
    setOpen(true);
  };

  const handleAdd = () => {
    setSelectedEventDesign({ event_id: "", title: "", description: "" });
    setIsAddMode(true);
    setOpen(true);
  };

  const handleDelete = async (id) => {
    try {
      await Axios.delete(`/event-designs/${id}`, {
        headers: {
          Authorization: `Bearer ${localStorage.getItem("token")}`,
          "Content-Type": "application/json",
        },
      });
      setEventDesignList(eventDesignList.filter((eventDesign) => eventDesign.design_id !== id));
      Swal.fire("Success", "Event design deleted successfully", "success");
    } catch (error) {
      console.warn("Error in deleting event design", error);
      Swal.fire("Error", "Failed to delete event design", "error");
    }
  };

  const handleClose = () => {
    setOpen(false);
    setSelectedEventDesign(null);
  };

  const handleSubmit = async () => {
    try {
      if (isAddMode) {
        await Axios.post("/event-designs", selectedEventDesign, {
          headers: {
            Authorization: `Bearer ${localStorage.getItem("token")}`,
            "Content-Type": "application/json",
          },
        });
        Swal.fire("Success", "Event design added successfully", "success");
      } else {
        await Axios.put(`/event-designs/${selectedEventDesign.design_id}`, selectedEventDesign, {
          headers: {
            Authorization: `Bearer ${localStorage.getItem("token")}`,
            "Content-Type": "application/json",
          },
        });
        Swal.fire("Success", "Event design updated successfully", "success");
      }
      getEventDesignList();
      handleClose();
    } catch (error) {
      console.warn("Error in saving event design", error);
      Swal.fire("Error", `Failed to ${isAddMode ? "add" : "update"} event design`, "error");
    }
  };

  const handleChange = (e) => {
    const { name, value } = e.target;
    setSelectedEventDesign({
      ...selectedEventDesign,
      [name]: value,
    });
  };

  useEffect(() => {
    getEventDesignList();
    getEvents();
  }, []);

  return (
    <>
      <Button className={classes.addButton} onClick={handleAdd}>
        Add Event Design
      </Button>
      <TableContainer component={Paper} className={classes.tableContainer}>
        <Table stickyHeader className={classes.tableBorder}>
          <TableHead>
            <TableRow>
              <TableCell className={classes.tableHeader}><img src={Logo} alt="Logo" style={{ width: '50px', height: '40px' }} /></TableCell>
              <TableCell className={classes.tableHeader}>TITLE</TableCell>
              <TableCell className={classes.tableHeader}>DESCRIPTION</TableCell>
              <TableCell className={classes.tableHeader}>ACTION</TableCell>
            </TableRow>
          </TableHead>
          <TableBody>
            {eventDesignList.map((row, index) => (
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
      <Pagination
        count={pagination.last_page}
        page={page}
        onChange={handlePageChange}
        color="primary"
      />
      <Dialog open={open} onClose={handleClose}>
        <DialogTitle>{isAddMode ? "Add Event Design" : "Edit Event Design"}</DialogTitle>
        <DialogContent>
          {selectedEventDesign && (
            <>
              <FormControl fullWidth margin="dense">
                <FormLabel>Event</FormLabel>
                <TextField
                  select
                  value={selectedEventDesign.event_id}
                  name="event_id"
                  onChange={handleChange}
                  variant="outlined"
                >
                  {Array.isArray(events) && events.map((event) => (
                    <MenuItem key={event.id} value={event.id}>
                      {event.title}
                    </MenuItem>
                  ))}
                </TextField>
              </FormControl>
              <FormControl fullWidth margin="dense">
                <FormLabel>Title</FormLabel>
                <TextField
                  value={selectedEventDesign.title}
                  name="title"
                  onChange={handleChange}
                  variant="outlined"
                />
              </FormControl>
              <FormControl fullWidth margin="dense">
                <FormLabel>Description</FormLabel>
                <TextField
                  value={selectedEventDesign.description}
                  name="description"
                  onChange={handleChange}
                  variant="outlined"
                  multiline
                  rows={4}
                />
              </FormControl>
              <FormControl fullWidth margin="dense">
                <FormLabel>Images</FormLabel>
                {selectedEventDesign.images && selectedEventDesign.images.map((image, index) => (
                  <img key={index} src={`data:image/jpeg;base64,${image}`} alt="Event Design" style={{ width: '100px', margin: '5px' }} />
                ))}
              </FormControl>
            </>
          )}
        </DialogContent>
        <DialogActions>
          <Button onClick={handleClose} color="primary">
            Cancel
          </Button>
          <Button onClick={handleSubmit} color="primary">
            {isAddMode ? "Add" : "Save"}
          </Button>
        </DialogActions>
      </Dialog>
    </>
  );
};

export default AllEventDesigns;
