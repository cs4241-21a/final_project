import * as React from "react";
import PropTypes from "prop-types";
import Button from "@mui/material/Button";
import { styled } from "@mui/material/styles";
import Dialog from "@mui/material/Dialog";
import DialogTitle from "@mui/material/DialogTitle";
import DialogContent from "@mui/material/DialogContent";
import DialogActions from "@mui/material/DialogActions";
import IconButton from "@mui/material/IconButton";
import CloseIcon from "@mui/icons-material/Close";

import TextField from "@mui/material/TextField";
import { Typography, Box } from "@mui/material";

const BootstrapDialogTitle = (props) => {
  const { children, onClose, ...other } = props;

  return (
    <DialogTitle sx={{ m: 0, p: 2 }} {...other}>
      {children}
      {onClose ? (
        <IconButton
          aria-label="close"
          onClick={onClose}
          sx={{
            position: "absolute",
            right: 8,
            top: 8,
            color: (theme) => theme.palette.grey[500],
          }}
        >
          <CloseIcon />
        </IconButton>
      ) : null}
    </DialogTitle>
  );
};

BootstrapDialogTitle.propTypes = {
  children: PropTypes.node,
  onClose: PropTypes.func.isRequired,
};

function RegisterPage(props) {
  return (
    <Box>
      <Dialog
        fullWidth
        maxWidth="xs"
        onClose={props.handleClose}
        open={props.registerOpen}
      >
        <BootstrapDialogTitle onClose={props.handleClose}>
          Register
        </BootstrapDialogTitle>
        <DialogContent dividers>
          <Typography gutterBottom>
            <b>Account Credentials:</b>
          </Typography>
          <TextField
            autoFocus
            margin="dense"
            id="username"
            label="Username"
            type="text"
            fullWidth
            variant="standard"
            helperText="Username already taken!"
          />
          <TextField
            autoFocus
            margin="dense"
            id="email"
            label="Email"
            type="email"
            fullWidth
            variant="standard"
            helperText="Email already in use!"
          />

          <TextField
            autoFocus
            margin="dense"
            id="password"
            label="Password"
            type="password"
            fullWidth
            variant="standard"
          />
        </DialogContent>
        <DialogActions>
          <Button autoFocus onClick={props.handleRegister}>
            Register
          </Button>
        </DialogActions>
      </Dialog>
    </Box>
  );
}

export default RegisterPage;
