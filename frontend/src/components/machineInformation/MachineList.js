import MachineItem from "./MachineItem";
import { Container, Grid } from "@mui/material";

function MachineList(props) {
  return (
    <Container sx={{ py: 4 }} maxWidth="lg">
      <Grid container spacing={3}>
        {props.machineInfo.map((item, index) => (
          <Grid item key={index} md={3}>
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
