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

function MachineItem(props) {
  return (
    <Card sx={{ height: "100%", display: "flex", flexDirection: "column" }}>
      <CardContent sx={{ flexGrow: 1 }}>
        <Typography gutterBottom variant="h6">
          Washer #1
        </Typography>
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
      <CardActions>
        <Button size="small">View</Button>
        <Button size="small">Edit</Button>
      </CardActions>
    </Card>
  );
}

export default MachineItem;
