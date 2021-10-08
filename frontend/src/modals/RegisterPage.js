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
import AccountCircle from "@mui/icons-material/AccountCircle";
import LockIcon from "@mui/icons-material/Lock";
import InputAdornment from "@mui/material/InputAdornment";
import Visibility from "@mui/icons-material/Visibility";
import VisibilityOff from "@mui/icons-material/VisibilityOff";
import FormControl from "@mui/material/FormControl";
import Input from "@mui/material/Input";
import InputLabel from "@mui/material/InputLabel";
import EmailIcon from "@mui/icons-material/Email";

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
  const [values, setValues] = React.useState({
    amount: "",
    password: "",
    weight: "",
    weightRange: "",
    showPassword: false,
  });

  const handleChange = (prop) => (event) => {
    setValues({ ...values, [prop]: event.target.value });
  };

  const handleClickShowPassword = () => {
    setValues({
      ...values,
      showPassword: !values.showPassword,
    });
  };

  const handleMouseDownPassword = (event) => {
    event.preventDefault();
  };

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
          <Box sx={{ display: "flex", alignItems: "flex-end" }}>
            <AccountCircle sx={{ color: "action.active", mr: 1, my: 0.5 }} />
            <FormControl fullWidth variant="standard">
              <InputLabel htmlFor="standard-adornment-password">
                Username
              </InputLabel>
              <Input
                autoFocus
                inputRef={usernameRef}
                margin="dense"
                id="username standard-required input-with-icon-textfield"
                label="Username"
                type="text"
                fullWidth
                variant="standard"
              />
            </FormControl>
          </Box>
          {existsError && !emptyError && (
            <RedTypography variant="h7">
              The inputted username is taken.
            </RedTypography>
          )}
          <Box sx={{ display: "flex", alignItems: "flex-end", mt: 1.5 }}>
            <EmailIcon sx={{ color: "action.active", mr: 1, my: 0.5 }} />
            <FormControl fullWidth variant="standard">
              <InputLabel htmlFor="standard-adornment-email">Email</InputLabel>
              <Input
                inputRef={emailRef}
                autoFocus
                margin="dense"
                id="email standard-required input-with-icon-textfield"
                label="Email"
                type="email"
                fullWidth
                variant="standard"
              />
            </FormControl>
          </Box>
          <Box sx={{ display: "flex", alignItems: "flex-end", my: 1.5 }}>
            <LockIcon sx={{ color: "action.active", mr: 1, my: 0.5 }} />
            <FormControl fullWidth variant="standard">
              <InputLabel htmlFor="standard-adornment-password">
                Password
              </InputLabel>
              <Input
                autoFocus
                required
                inputRef={passwordRef}
                margin="dense"
                id="password standard-required standard-adornment-password"
                type={values.showPassword ? "text" : "password"}
                value={values.password}
                onChange={handleChange("password")}
                endAdornment={
                  <InputAdornment position="end">
                    <IconButton
                      aria-label="toggle password visibility"
                      onClick={handleClickShowPassword}
                      onMouseDown={handleMouseDownPassword}
                    >
                      {values.showPassword ? <VisibilityOff /> : <Visibility />}
                    </IconButton>
                  </InputAdornment>
                }
                variant="standard"
                fullWidth
              />
            </FormControl>
          </Box>
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
