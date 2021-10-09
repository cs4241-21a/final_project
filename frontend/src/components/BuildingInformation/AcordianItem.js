import MuiAccordion from "@mui/material/Accordion";
import MuiAccordionSummary from "@mui/material/AccordionSummary";
import MuiAccordionDetails from "@mui/material/AccordionDetails";
import Typography from "@mui/material/Typography";
import { Grid, Container } from "@mui/material";
import * as React from "react";

import StarOutlineIcon from "@mui/icons-material/StarOutline";
import StarRateIcon from "@mui/icons-material/StarRate";

import CircleIcon from "@mui/icons-material/Circle";

import { styled } from "@mui/material/styles";
import ArrowForwardIosSharpIcon from "@mui/icons-material/ArrowForwardIosSharp";
import MachineList from "../machineInformation/MachineList";

import ContactsContext from "../../store/favoriteContext";

import { useState, useContext } from "react";

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
    expandIcon={<ArrowForwardIosSharpIcon sx={{ fontSize: "0.9rem" }} />}
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
    marginLeft: theme.spacing(1),
  },
}));

const AccordionDetails = styled(MuiAccordionDetails)(({ theme }) => ({
  padding: theme.spacing(2),
  borderTop: "1px solid rgba(0, 0, 0, .125)",
}));

async function addFavorite(credentials) {
  return fetch("/addFavorite", {
    method: "POST",
    headers: {
      "Content-Type": "application/json",
    },
    body: JSON.stringify(credentials),
  }).then((data) => data.json());
}

async function removeFavorite(credentials) {
  return fetch("/delFavorite", {
    method: "POST",
    headers: {
      "Content-Type": "application/json",
    },
    body: JSON.stringify(credentials),
  }).then((data) => data.json());
}

function getColor(value) {
  if (value >= 75) return "#90ee90";
  else if (value >= 50) return "#fdec96";
  else if (value >= 25) return "#fdb996";
  else if (value >= 0) return "#fc647d";
  else return "#000000";
}

function AccordianItem(props) {
  const washerColor = getColor(props.item.washeravailable_percent);
  const dryerColor = getColor(props.item.dryeravailable_percent);

  console.log("favorite: " + props.favorite);
  const [isFav, setFav] = React.useState(props.favorite);

  const handleAddFavorite = async (event) => {
    event.preventDefault();

    const favoriteItem = {
      fav: props.item.humanname,
    };

    const token = await addFavorite(favoriteItem);
    console.log(token.failed);
    if (token.failed === "false") {
      setFav(true);
      props.addContactHandler(props.item.humanname);
    }
  };

  const handleRemoveFavorite = async (event) => {
    event.preventDefault();

    const favoriteItem = {
      fav: props.item.humanname,
    };

    const token = await removeFavorite(favoriteItem);
    console.log(token.failed);
    if (token.failed === "false") {
      props.removeContactHandler(props.item.humanname);
    }
  };

  return (
    <div>
      <Accordion
        expanded={props.expanded === "panel" + props.index}
        onChange={props.handleChange("panel" + props.index)}
      >
        <AccordionSummary aria-controls="panel1d-content" id="panel1d-header">
          <Grid container direction={"row"} spacing={2}>
            <Grid item xs={3}>
              <Typography>{props.item.humanname}</Typography>{" "}
            </Grid>
            <Grid item xs={4}>
              <div style={{ display: "inline-flex" }}>
                <CircleIcon fontSize="small" style={{ color: washerColor }} />
                &nbsp;
                <Typography>
                  {props.item.washeravailable_percent}% Washer Availability
                </Typography>
              </div>
            </Grid>
            <Grid item xs={4}>
              <div style={{ display: "inline-flex" }}>
                <CircleIcon fontSize="small" style={{ color: dryerColor }} />
                &nbsp;
                <Typography>
                  {props.item.dryeravailable_percent}% Dryer Availability
                </Typography>
              </div>
            </Grid>
          </Grid>
          <Grid item>
            {!props.favorite && (
              <StarOutlineIcon onClick={handleAddFavorite} fontSize="small" />
            )}
            {props.favorite && (
              <StarRateIcon onClick={handleRemoveFavorite} fontSize="small" />
            )}
          </Grid>
        </AccordionSummary>
        <AccordionDetails>
          <MachineList
            washerInfo={props.item.washers}
            dryerInfo={props.item.dryers}
          />
        </AccordionDetails>
      </Accordion>
    </div>
  );
}

export default AccordianItem;
