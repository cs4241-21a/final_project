import * as React from "react";
import AppBar from "@mui/material/AppBar";
import Box from "@mui/material/Box";
import Toolbar from "@mui/material/Toolbar";
import Typography from "@mui/material/Typography";
import IconButton from "@mui/material/IconButton";

import AccountCircle from "@mui/icons-material/AccountCircle";

import MenuItem from "@mui/material/MenuItem";
import Menu from "@mui/material/Menu";

function NavBar(props) {
  
  const [anchorEl, setAnchorEl] = React.useState(null);

  console.log("Our login status: " + props.loggedIn);


  const handleChange = (event) => {
    setAuth(event.target.checked);
  };

  const handleMenu = (event) => {
    setAnchorEl(event.currentTarget);
  };

  const handleClose = () => {
    setAnchorEl(null);
  };

  const handleLogin = () => {
    props.handleLogin();
    setAnchorEl(null);
  };

  const handleRegister = () => {
    props.handleRegister();
    setAnchorEl(null);
  };

  return (
    <Box sx={{ flexGrow: 1 }}>
      <AppBar position="static">
        <Toolbar>
          <Typography variant="h6" component="div" sx={{ flexGrow: 1 }}>
            Laundry Connect 2.0
          </Typography>

          <div>
            <span style={{ cursor: "pointer" }} onClick={handleMenu}>
              {" "}
              Account Details{" "}
            </span>
            <IconButton
              size="large"
              aria-label="account of current user"
              aria-controls="menu-appbar"
              aria-haspopup="true"
              onClick={handleMenu}
              color="inherit"
            >
              <AccountCircle />
            </IconButton>
            <Menu
              id="menu-appbar"
              anchorEl={anchorEl}
              anchorOrigin={{
                vertical: "top",
                horizontal: "right",
              }}
              keepMounted
              transformOrigin={{
                vertical: "top",
                horizontal: "right",
              }}
              open={Boolean(anchorEl)}
              onClose={handleClose}
            >
              {!props.loggedIn && (
                <div>
                  <MenuItem onClick={handleRegister}>Register</MenuItem>
                  <MenuItem onClick={handleLogin}>Sign In</MenuItem>
                </div>
              )}

              {props.loggedIn && (
                <div>
                  <MenuItem onClick={handleRegister}>My Account</MenuItem>
                  <MenuItem onClick={handleLogin}>Sign Out</MenuItem>
                </div>
              )}
            </Menu>
          </div>
        </Toolbar>
      </AppBar>
    </Box>
  );
}
export default NavBar;
