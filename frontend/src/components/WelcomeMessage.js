import {
  Typography,
  Box,
  Button,
  ButtonGroup,
  ToggleButton,
  ToggleButtonGroup,
} from "@mui/material";

import * as React from "react";

function WelcomeMessage(props) {
  const [alignment, setAlignment] = React.useState("All");

  const handleChange = (event, newAlignment) => {
    if (newAlignment !== null) setAlignment(newAlignment);
  };
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
        <Typography variant="h4">
          <b>Welcome to LaundryConnect 2.0! </b>
        </Typography>
        <Typography variant="h6">
          A passion project by students for students.
        </Typography>
        <ToggleButtonGroup
          color="primary"
          value={alignment}
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
