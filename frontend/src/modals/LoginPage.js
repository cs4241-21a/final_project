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

const RedTypography = withStyles({
  root: {
    color: "#DC143C",
  },
})(Typography);

async function loginUser(credentials) {
  return fetch("/login", {
    method: "POST",
    headers: {
      "Content-Type": "application/json",
    },
    body: JSON.stringify(credentials),
  }).then((data) => data.json());
}

function LoginPage(props) {
  const [inputError, setError] = React.useState(false);
  const usernameRef = React.useRef();
  const passwordRef = React.useRef();

  const handleSubmit = async (e) => {
    e.preventDefault();

    const username = usernameRef.current.value;
    const password = passwordRef.current.value;

    const registerData = {
      username,
      password,
    };

    const token = await loginUser(registerData);
    console.log(token.failed);
    if (token.failed === "false") {
      props.setToken(token);
      setError(false);
    } else {
      setError(true);
    }
  };

  return (
    <Box>
      <Dialog
        fullWidth
        maxWidth="xs"
        onClose={props.handleClose}
        open={props.loginOpen}
      >
        <BootstrapDialogTitle onClose={props.handleClose}>
          Sign In
        </BootstrapDialogTitle>
        <DialogContent dividers>
          <Typography gutterBottom>
            <b>Login Credentials:</b>
          </Typography>

          <TextField
            autoFocus
            inputRef={usernameRef}
            margin="dense"
            id="username"
            label="Username"
            type="text"
            fullWidth
            variant="standard"
          />

          <TextField
            autoFocus
            inputRef={passwordRef}
            margin="dense"
            id="password"
            label="Password"
            type="password"
            fullWidth
            variant="standard"
          />
          {inputError && (
            <RedTypography variant="h7">
              The inputted username and password is incorrect.
            </RedTypography>
          )}
        </DialogContent>
        <DialogActions>
          <Button autoFocus onClick={handleSubmit}>
            Sign In
          </Button>
        </DialogActions>
      </Dialog>
    </Box>
  );
}

export default LoginPage;
