import { Typography, Card, CardContent } from "@mui/material";
import CircleIcon from "@mui/icons-material/Circle";
import LocalLaundryServiceIcon from "@mui/icons-material/LocalLaundryService";
import DryCleaningTwoToneIcon from "@mui/icons-material/DryCleaningTwoTone";

var orange = "fdb996";
var yellow = "#fdec96";
var red = "#fc647d";
var green = "#90ee90";
var black = "#000000";

function getColor(value, status) {
  if (value === null && status === "Ready For Pickup") return yellow;
  else if (status === "Available") return green;
  else if (status === "Offline") return black;
  else if (value === null && status === "Ready To Start") return red;
  else if (value >= 35) return red;
  else if (value >= 15) return orange;
  else if (value >= 0) return yellow;
  else if (status === "Offline") return black;
  else return black;
}

function DryerItem(props) {
  const dryerColor = getColor(props.item.minutes_left, props.item.status);

  return (
    <Card
      sx={{
        height: "100%",
        display: "flex",
        flexDirection: "column",
        boxShadow: 3,
      }}
    >
      <CardContent sx={{ flexGrow: 1 }}>
        <div
          style={{
            display: "flex",
            alignItems: "center",
            flexWrap: "wrap",
          }}
        >
          <Typography gutterBottom variant="h6">
            Dryer - #{props.index}
          </Typography>
          <DryCleaningTwoToneIcon
            style={{ minWidth: "120px" }}
            paddingfontsize="large"
          />
          {/* <DryCleaningTwoToneIcon
            style={{ minWidth: "40px" }}
            paddingfontsize="large"
          /> */}
        </div>

        <div
          style={{
            display: "flex",
            alignItems: "center",
            flexWrap: "wrap",
          }}
        >
          <CircleIcon
            paddingfontsize="small"
            style={{ minWidth: "40px", color: dryerColor }}
          />

          <span> {props.item.status} </span>
          {props.item.minutes_left !== null && (
            <span> : {props.item.minutes_left} Minutes</span>
          )}
        </div>
      </CardContent>
      {/* <CardActions>
        <Button size="small">View</Button>
        <Button size="small">Edit</Button>
      </CardActions> */}
    </Card>
  );
}

export default DryerItem;
