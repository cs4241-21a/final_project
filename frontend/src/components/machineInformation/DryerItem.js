import { Typography, Card, CardContent } from "@mui/material";
import CircleIcon from "@mui/icons-material/Circle";
import LocalLaundryServiceIcon from "@mui/icons-material/LocalLaundryService";
import DryCleaningTwoToneIcon from "@mui/icons-material/DryCleaningTwoTone";

function getColor(value, status) {
  if (value >= 35) return "#fc647d";
  else if (value >= 25) return "#fdb996";
  else if (value >= 15) return "#fdec96";
  else if (value >= 0) return "#90ee90";
  else return "#000000";
}

function DryerItem(props) {
  return (
    <Card sx={{ height: "100%", display: "flex", flexDirection: "column" }}>
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
          <span>Empty</span>
          <CircleIcon
            paddingfontsize="small"
            style={{ minWidth: "40px", color: "#90ee90" }}
          />
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
