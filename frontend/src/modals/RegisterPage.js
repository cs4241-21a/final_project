import * as React from "react";
import PropTypes from "prop-types";
import Button from "@mui/material/Button";
import Dialog from "@mui/material/Dialog";
import DialogTitle from "@mui/material/DialogTitle";
import DialogContent from "@mui/material/DialogContent";
import DialogActions from "@mui/material/DialogActions";
import IconButton from "@mui/material/IconButton";
import CloseIcon from "@mui/icons-material/Close";
import { withStyles } from "@material-ui/core/styles";

import TextField from "@mui/material/TextField";
import { Typography, Box } from "@mui/material";

const RedTypography = withStyles({
  root: {
    color: "#DC143C",
  },
})(Typography);

async function registerUser(credentials) {
  return fetch("/register", {
    method: "POST",
    headers: {
      "Content-Type": "application/json",
    },
    body: JSON.stringify(credentials),
  }).then((data) => data.json());
}

async function loginUser(credentials) {
  return fetch("/login", {
    method: "POST",
    headers: {
      "Content-Type": "application/json",
    },
    body: JSON.stringify(credentials),
  }).then((data) => data.json());
}

function RegisterPage(props) {
  const [existsError, setExistsError] = React.useState(false);
  const [emptyError, setEmptyError] = React.useState(false);
  const usernameRef = React.useRef();
  const passwordRef = React.useRef();
  const emailRef = React.useRef();

  const handleSubmit = async (event) => {
    event.preventDefault();

    const u = usernameRef.current.value;
    const p = passwordRef.current.value;
    const e = emailRef.current.value;

    const registerData = {
      u,
      p,
      e,
    };

    const token = await registerUser(registerData);
    console.log(token.failed);
    if (token.failed === "exists") {
      setExistsError(true);
      console.log("This user already exists!");
    } else if (token.failed === "empty") {
      setEmptyError(true);
    } else {
      console.log("Registration success!");
      
      const loginData = {
        u,
        p,
      };

      const token = await loginUser(loginData);
      console.log(token.failed);
      if (token.failed === "false") {
        props.setToken(token);
        props.handleClose();
      } else {
        console.log("Error logging in after registration");
      }
    }
    console.log(registerData);
  };
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
            inputRef={usernameRef}
            autoFocus
            margin="dense"
            id="username"
            label="Username"
            type="text"
            fullWidth
            variant="standard"
          />
          {existsError && !emptyError && (
            <RedTypography variant="h7">
              The inputted username is taken.
            </RedTypography>
          )}
          <TextField
            inputRef={emailRef}
            autoFocus
            margin="dense"
            id="email"
            label="Email"
            type="email"
            fullWidth
            variant="standard"
          />
          <TextField
            inputRef={passwordRef}
            autoFocus
            margin="dense"
            id="password"
            label="Password"
            type="password"
            fullWidth
            variant="standard"
          />
          {emptyError && (
            <RedTypography variant="h7">
              The inputted username and password cannot be blank.
            </RedTypography>
          )}
        </DialogContent>
        <DialogActions>
          <Button autoFocus onClick={handleSubmit}>
            Register
          </Button>
        </DialogActions>
      </Dialog>
    </Box>
  );
}

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

export default RegisterPage;
