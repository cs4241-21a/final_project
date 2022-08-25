import {
  Typography,
  Box,
  ToggleButton,
  ToggleButtonGroup,
} from "@mui/material";

import * as React from "react";

import Card from "@mui/material/Card";
import CircleIcon from "@mui/icons-material/Circle";
import List from "@mui/material/List";
import ListItem from "@mui/material/ListItem";
import Alert from "@mui/material/Alert"

function WelcomeMessage(props) {
  const handleChange = (event, newAlignment) => {
    if (newAlignment !== null) props.setAlignment(newAlignment);
  };

  console.log(props.timestamp);
  let timestring;

  try {
    const lu = new Date(props.timestamp[0].timestamp * 1000);
    timestring =
      lu.toLocaleString(navigator.language, {
        year: "numeric",
        month: "long",
        day: "numeric",
      }) +
      " at " +
      lu.toLocaleString(navigator.language, {
        hour: "numeric",
        minute: "numeric",
      });
  } catch (e) {
    timestring = "Loading...";
  }

  return (
    <div>
      <Box
        sx={{
          display: "flex",
          flexDirection: "column",
          alignItems: "center",
          "& > *": {
            m: 1,
          },
        }}
      >
        <Alert severity="warning">Laundry Connect 2 has moved to <a href="https://lc2.owenthe.dev">lc2.owenthe.dev</a> due to Heroku discontinuing free dynos. Laundry Connect 2 will continue to be accessible from here until November 28, 2022.</Alert>
        <Typography variant="h4">
          <b>Welcome to LaundryConnect 2.0! </b>
        </Typography>
        <Typography variant="h5">
          Because Laundry Connect sucks at web design, and WPI deserves a better
          how-busy-is-the-laundry-room experience.
        </Typography>

        <Card sx={{ boxShadow: 3 }}>
          <List>
            <div style={{ display: "inline-flex" }}>
              <List>
                <ListItem>
                  <CircleIcon fontSize="small" style={{ color: "#90ee90" }} />
                  &nbsp;
                  <Typography>Available</Typography>
                </ListItem>
              </List>
            </div>
            <div style={{ display: "inline-flex" }}>
              <List>
                <ListItem>
                  <CircleIcon fontSize="small" style={{ color: "#fdec96" }} />
                  &nbsp;
                  <Typography>Almost Done</Typography>
                </ListItem>
              </List>
            </div>
            <div style={{ display: "inline-flex" }}>
              <List>
                <ListItem>
                  <CircleIcon fontSize="small" style={{ color: "#fdb996" }} />
                  &nbsp;
                  <Typography>In Use</Typography>
                </ListItem>
              </List>
            </div>
            <div style={{ display: "inline-flex" }}>
              <List>
                <ListItem>
                  <CircleIcon fontSize="small" style={{ color: "#fc647d" }} />
                  &nbsp;
                  <Typography>Just Started</Typography>
                </ListItem>
              </List>
            </div>
            <div style={{ display: "inline-flex" }}>
              <List>
                <ListItem>
                  <CircleIcon fontSize="small" style={{ color: "#000000" }} />
                  &nbsp;
                  <Typography>Out of Order</Typography>
                </ListItem>
              </List>
            </div>
          </List>
        </Card>
        <Typography variant="small">Last updated: {timestring}</Typography>
        <ToggleButtonGroup
          color="primary"
          value={props.alignment}
          exclusive
          onChange={handleChange}
        >
          <ToggleButton
            onClick={() => {
              props.setFavorites(false);
            }}
            value="All"
          >
            All Locations
          </ToggleButton>
          <ToggleButton
            onClick={() => {
              props.setFavorites(true);
            }}
            value="Selected"
          >
            Favorite Locations
          </ToggleButton>
        </ToggleButtonGroup>
      </Box>
    </div>
  );
}

export default WelcomeMessage;
