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
  Switch
} from "@material-ui/core";
import KeyboardArrowDownIcon from '@mui/icons-material/KeyboardArrowDown';
import KeyboardArrowUpIcon from '@mui/icons-material/KeyboardArrowUp';
import Axios from "../Axios";
import PropTypes from 'prop-types';
import Swal from 'sweetalert2'; // Import SweetAlert2

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
});

function Row(props) {
  const { row, handleEdit, handleDelete, classes } = props;

  const [open, setOpen] = useState(false);
  const [status, setStatus] = useState(row.status);

  const handleStatusChange = async () => {
    try {
      const updatedStatus = status === 'active' ? 'inactive' : 'active';
      await Axios.put(`/auth/users/${row.id}/status`, { status: updatedStatus }, {
        headers: {
          Authorization: `Bearer ${localStorage.getItem("token")}`,
          "Content-Type": "application/json",
        },
      });
      setStatus(updatedStatus);
    } catch (error) {
      console.warn("Error updating status", error);
    }
  };

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
        <TableCell>{row.first_name} {row.last_name}</TableCell>
        <TableCell>{row.company_name}</TableCell>
        <TableCell>{row.email}</TableCell>
        <TableCell>{row.phone}</TableCell>
        <TableCell>{row.address1}</TableCell>
        <TableCell>
          <Button onClick={() => handleEdit(row)}>Edit</Button>
          <Button onClick={() => handleDelete(row.id)}>Delete</Button>
        </TableCell>
      </TableRow>
      <TableRow>
        <TableCell style={{ paddingBottom: 0, paddingTop: 0 }} colSpan={8}>
          <Collapse in={open} timeout="auto" unmountOnExit>
            <Box sx={{ margin: 1 }}>
              <Typography variant="h6" gutterBottom component="div">
                Details
              </Typography>
              <Table size="small" aria-label="details">
                <TableHead>
                  <TableRow>
                    <TableCell>Whatsapp</TableCell>
                    <TableCell>GST</TableCell>
                    <TableCell>City</TableCell>
                    <TableCell>Pincode</TableCell>
                    <TableCell>State</TableCell>
                    <TableCell>Status</TableCell>
                  </TableRow>
                </TableHead>
                <TableBody>
                  <TableRow>
                    <TableCell>{row.whatsapp}</TableCell>
                    <TableCell>{row.gst}</TableCell>
                    <TableCell>{row.city}</TableCell>
                    <TableCell>{row.pincode}</TableCell>
                    <TableCell>{row.state}</TableCell>
                    <TableCell>
                      <Switch
                        checked={status === 'active'}
                        onChange={handleStatusChange}
                        color="success"
                      />
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
    first_name: PropTypes.string.isRequired,
    last_name: PropTypes.string.isRequired,
    company_name: PropTypes.string.isRequired,
    email: PropTypes.string.isRequired,
    phone: PropTypes.string.isRequired,
    address1: PropTypes.string.isRequired,
    whatsapp: PropTypes.string.isRequired,
    gst: PropTypes.string.isRequired,
    city: PropTypes.string.isRequired,
    pincode: PropTypes.string.isRequired,
    state: PropTypes.string.isRequired,
    status: PropTypes.string.isRequired, // Change this to string
  }).isRequired,
  handleEdit: PropTypes.func.isRequired,
  handleDelete: PropTypes.func.isRequired,
  classes: PropTypes.object.isRequired,
};

const AllUsers = () => {
  const classes = useStyles();
  const [userList, setUserList] = useState([]);
  const [open, setOpen] = useState(false);
  const [selectedUser, setSelectedUser] = useState(null);
  const [newPassword, setNewPassword] = useState('');
  const [confirmPassword, setConfirmPassword] = useState('');

  const getUserList = async () => {
    try {
      const response = await Axios.get("/auth/users", {
        headers: {
          Authorization: `Bearer ${localStorage.getItem("token")}`,
          "Content-Type": "application/json",
        },
      });
      setUserList(response.data.users);
    } catch (error) {
      console.warn("Error in getting user list", error);
    }
  };

  const handlePasswordChange = async () => {
    if (newPassword !== confirmPassword) {
      Swal.fire("Error", "Passwords do not match", "error");
      return;
    }

    try {
      await Axios.put(`/auth/users/${selectedUser.id}/password`, { password: newPassword, password_confirmation: confirmPassword }, {
        headers: {
          Authorization: `Bearer ${localStorage.getItem("token")}`,
          "Content-Type": "application/json",
        },
      });
      Swal.fire("Success", "Password changed successfully", "success");
    } catch (error) {
      console.warn("Error changing password", error);
      Swal.fire("Error", "Failed to change password", "error");
    }
  };

  const handleEdit = (user) => {
    setSelectedUser(user);
    setNewPassword('');
    setConfirmPassword('');
    setOpen(true);
  };

  const handleDelete = async (id) => {
    try {
      await Axios.delete(`/auth/delete-user/${id}`, {
        headers: {
          Authorization: `Bearer ${localStorage.getItem("token")}`,
          "Content-Type": "application/json",
        },
      });
      setUserList(userList.filter((user) => user.id !== id));
      Swal.fire("Success", "User deleted successfully", "success");
    } catch (error) {
      console.warn("Error in deleting user", error);
      Swal.fire("Error", "Failed to delete user", "error");
    }
  };

  const handleClose = () => {
    setOpen(false);
    setSelectedUser(null);
  };

  const handleSubmit = async () => {
    try {
      await Axios.put(`/auth/users/${selectedUser.id}`, selectedUser, {
        headers: {
          Authorization: `Bearer ${localStorage.getItem("token")}`,
          "Content-Type": "application/json",
        },
      });
      if (newPassword && confirmPassword) {
        await handlePasswordChange();
      }
      if(newPassword && confirmPassword) {
        await handlePasswordChange();
      }
      getUserList();
      handleClose();
      Swal.fire("Success", "User updated successfully", "success");
    } catch (error) {
      console.warn("Error in updating user", error);
      Swal.fire("Error", "Failed to update user", "error");
    }
  };

  useEffect(() => {
    getUserList();
  }, []);

  const handleChange = (e) => {
    const { name, value } = e.target;
    setSelectedUser({
      ...selectedUser,
      [name]: value,
    });
  };

  return (
    <>
      <TableContainer component={Paper} className={classes.tableContainer}>
        <Table stickyHeader className={classes.tableBorder}>
          <TableHead>
            <TableRow>
              <TableCell />
              <TableCell className={classes.tableHeader}>NAME</TableCell>
              <TableCell className={classes.tableHeader}>COMPANY NAME</TableCell>
              <TableCell className={classes.tableHeader}>EMAIL ID</TableCell>
              <TableCell className={classes.tableHeader}>PHONE NO</TableCell>
              <TableCell className={classes.tableHeader}>ADDRESS</TableCell>
              <TableCell className={classes.tableHeader}>ACTION</TableCell>
            </TableRow>
          </TableHead>
          <TableBody>
            {userList?.map((row, index) => (
              <Row key={index} row={row} handleEdit={handleEdit} handleDelete={handleDelete} classes={classes} />
            ))}
          </TableBody>
        </Table>
      </TableContainer>

      <Dialog open={open} onClose={handleClose}>
        <DialogTitle>Edit User</DialogTitle>
        <DialogContent>
          {selectedUser && (
            <>
              <TextField
                autoFocus
                margin="dense"
                name="first_name"
                label="First Name"
                type="text"
                fullWidth
                value={selectedUser.first_name}
                onChange={handleChange}
              />
              <TextField
                margin="dense"
                name="last_name"
                label="Last Name"
                type="text"
                fullWidth
                value={selectedUser.last_name}
                onChange={handleChange}
              />
              <TextField
                margin="dense"
                name="company_name"
                label="Company Name"
                type="text"
                fullWidth
                value={selectedUser.company_name}
                onChange={handleChange}
              />
              <TextField
                margin="dense"
                name="email"
                label="Email"
                type="email"  
                fullWidth
                value={selectedUser.email}
                onChange={handleChange}
              />
              <TextField
                margin="dense"
                name="phone"
                label="Phone"
                type="text"
                fullWidth
                value={selectedUser.phone}
                onChange={handleChange}
              />
              <TextField
                margin="dense"
                name="address1"
                label="Address"
                type="text"
                fullWidth
                value={selectedUser.address1}
                onChange={handleChange}
              />
              <TextField
                margin="dense"
                name="whatsapp"
                label="Whats App"
                type="text"
                fullWidth
                value={selectedUser.whatsapp}
                onChange={handleChange}
              />
              {/* Password fields */}
              <TextField
                margin="dense"
                name="newPassword"
                label="New Password"
                type="password"
                fullWidth
                value={newPassword}
                onChange={(e) => setNewPassword(e.target.value)}
              />
              <TextField
                margin="dense"
                name="confirmPassword"
                label="Confirm Password"
                type="password"
                fullWidth
                value={confirmPassword}
                onChange={(e) => setConfirmPassword(e.target.value)}
              />
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

export default AllUsers;
