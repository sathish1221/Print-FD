import React, { useState } from 'react';
import { TextField, Button, Typography, Container, Box, Avatar, InputAdornment, Alert } from '@mui/material';
import { makeStyles } from '@material-ui/core/styles';
import AccountCircleIcon from '@material-ui/icons/AccountCircle';
import images3 from '../assets/logo.png';
import Swal from 'sweetalert2';

const useStyles = makeStyles((theme) => ({
  container: {
    marginTop: theme.spacing(15),
    display: 'flex',
    flexDirection: 'column',
    alignItems: 'center',
    backgroundColor: '#fff',
    padding: theme.spacing(4),
    borderRadius: theme.spacing(1),
  },
  logo: {
    position: 'absolute',
    top: theme.spacing(2),
    display: 'flex',
    justifyContent: 'center',
    width: '100%',
    zIndex: 1,
  },
  img: {
    width: '50px',
    height: '50px',
    marginBottom: theme.spacing(1),
  },
  form: {
    width: '100%',
    marginTop: theme.spacing(1),
  },
  submit: {
    margin: theme.spacing(1, 0, 2),
    backgroundColor: '#7f223d !important',
    color: '#fff',
    fontSize: '18px',
    textTransform: 'capitalize',
  },
}));

function VerifyAccount() {
  const classes = useStyles();
  const [verificationCode, setVerificationCode] = useState('');
  const [message, setMessage] = useState('');
  const [error, setError] = useState('');

  const showAlert = (text) => {
    Swal.fire({
      title: 'OOPS.',
      icon: 'warning',
      text: text,
      showConfirmButton: true,
      confirmButtonText: "OK",
    });
  };

  const showSuccessAlert = (text) => {
    Swal.fire({
      title: 'Success.',
      icon: 'success',
      text: text,
      showConfirmButton: true,
      confirmButtonText: "OK",
    });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setMessage('');
    setError('');

    try {
      // Mock API call to verify the code
      const response = await fetch('/api/verify-account', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({ verificationCode }),
      });

      if (response.ok) {
        setMessage('Account has been successfully verified.');
        showSuccessAlert('Account has been successfully verified.');
      } else {
        const data = await response.json();
        setError(data.message || 'Invalid verification code. Please try again.');
        showAlert(data.message || 'Invalid verification code. Please try again.');
      }
    } catch (err) {
      setError('Failed to verify account. Please try again later.');
      showAlert('Failed to verify account. Please try again later.');
    }
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
        <img src={images3} alt="Custom Icon" className={classes.img} style={{ display: "flex", justifyContent: "center", height: "150px", width: '150px' }} />
      </div>
      <Container component="main" maxWidth="xs" className={classes.container}>
        <Typography component="h1" variant="h5">
          Verify Account
        </Typography>
        <form className={classes.form} onSubmit={handleSubmit}>
          <TextField
            label="Verification Code"
            variant="outlined"
            fullWidth
            margin="normal"
            value={verificationCode}
            onChange={(e) => setVerificationCode(e.target.value)}
            required
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
          <Button href="/ResetPassword" variant="contained" color="primary" type="submit" fullWidth className={classes.submit}>
            Verify Account
          </Button>
        </form>
        {message && <Alert severity="success" sx={{ mt: 2 }}>{message}</Alert>}
        {error && <Alert severity="error" sx={{ mt: 2 }}>{error}</Alert>}
      </Container>
    </div>
  );
}

export default VerifyAccount;