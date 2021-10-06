import MachineItem from "./MachineItem";
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

function MachineList(props) {
  return (
    <Container sx={{ py: 3 }} fullwidth maxWidth="md">
      <Grid container spacing={1}>
        {props.machineInfo.map((item, index) => (
          <Grid item key={props.item}>
            <MachineItem
              show={props.show}
              hide={props.onHide}
              key={index + 1}
              index={index + 1}
              item={item}
            />
          </Grid>
        ))}
      </Grid>
    </Container>
  );
}

export default MachineList;
