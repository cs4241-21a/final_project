import MuiAccordion from "@mui/material/Accordion";
import MuiAccordionSummary from "@mui/material/AccordionSummary";
import MuiAccordionDetails from "@mui/material/AccordionDetails";
import Typography from "@mui/material/Typography";
import { Grid, Container } from "@mui/material";
import * as React from "react";

import StarOutlineIcon from "@mui/icons-material/StarOutline";
import StarRateIcon from "@mui/icons-material/StarRate";

import MenuItem from "@mui/material/MenuItem";
import Menu from "@mui/material/Menu";

import CircleIcon from "@mui/icons-material/Circle";

import { styled } from "@mui/material/styles";
import ArrowForwardIosSharpIcon from "@mui/icons-material/ArrowForwardIosSharp";
import MachineList from "../machineInformation/MachineList";

const list = [32, 2, 2, 2, 1, 2, 1, 1, 1];

const Accordion = styled((props) => (
  <MuiAccordion disableGutters elevation={0} square {...props} />
))(({ theme }) => ({
  border: `1px solid ${theme.palette.divider}`,
  "&:not(:last-child)": {
    borderBottom: 0,
  },
  "&:before": {
    display: "none",
  },
}));

const AccordionSummary = styled((props) => (
  <MuiAccordionSummary
    expandIcon={<ArrowForwardIosSharpIcon sx={{ fontSize: "medium" }} />}
    {...props}
  />
))(({ theme }) => ({
  backgroundColor:
    theme.palette.mode === "dark"
      ? "rgba(255, 255, 255, .05)"
      : "rgba(0, 0, 0, .03)",
  flexDirection: "row-reverse",
  "& .MuiAccordionSummary-expandIconWrapper.Mui-expanded": {
    transform: "rotate(90deg)",
  },
  "& .MuiAccordionSummary-content": {
    marginLeft: theme.spacing(0),
  },
}));

const AccordionDetails = styled(MuiAccordionDetails)(({ theme }) => ({
  padding: theme.spacing(2),
  borderTop: "1px solid rgba(0, 0, 0, .125)",
}));

function AccordianItem(props) {
  const [auth, setAuth] = React.useState(true);
  const [anchorEl, setAnchorEl] = React.useState(null);

  const handleMenu = (event) => {
    setAnchorEl(event.currentTarget);
  };

  const handleClose = () => {
    setAnchorEl(null);
  };

  return (
    <div>
      <Accordion
        expanded={props.expanded === "panel" + props.index}
        onChange={props.handleChange("panel" + props.index)}
      >
        <AccordionSummary aria-controls="panel1d-content" id="panel1d-header">
          <Container>
            <Grid container spacing={4}>
              <Grid item>
                <Typography>Building Number {props.item}</Typography>{" "}
              </Grid>
              <Grid item>
                <CircleIcon fontSize="small" style={{ color: "#90ee90" }} />
              </Grid>
              <Grid item>
                <Typography>79% Availability</Typography>
              </Grid>
              <Grid item>
                <StarOutlineIcon
                  onClick={() => {
                    console.log("HELLOS");
                  }}
                  fontSize="small"
                />

                <Menu
                  id="menu-appbar"
                  anchorEl={anchorEl}
                  open={Boolean(anchorEl)}
                  onClose={handleClose}
                >
                  <MenuItem onClick={handleClose}>Profile</MenuItem>
                  <MenuItem onClick={handleClose}>My account</MenuItem>
                </Menu>
              </Grid>
            </Grid>
          </Container>
        </AccordionSummary>
        <AccordionDetails>
          <MachineList machineInfo={list} />
        </AccordionDetails>
      </Accordion>
    </div>
  );
}

export default AccordianItem;
