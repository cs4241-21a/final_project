import {
  Typography,
  Box,
  Container,
  Grid,
  Card,
  CardMedia,
  CardContent,
  CardActions,
  Button,
  ButtonGroup,
  ToggleButton,
  ToggleButtonGroup,
} from "@mui/material";
import CircleIcon from "@mui/icons-material/Circle";
import LocalLaundryServiceIcon from "@mui/icons-material/LocalLaundryService";
import DryCleaningTwoToneIcon from "@mui/icons-material/DryCleaningTwoTone";

function MachineItem(props) {
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
            Washer #1
          </Typography>
          <LocalLaundryServiceIcon
            style={{ minWidth: "120px" }}
            paddingfontSize="large"
          />
          {/* <DryCleaningTwoToneIcon
            style={{ minWidth: "40px" }}
            paddingfontSize="large"
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
            paddingfontSize="small"
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

export default MachineItem;
