import DryerItem from "./DryerItem";
import WasherItem from "./WasherItem";
import { Container, Grid } from "@mui/material";

function MachineList(props) {
  return (
    <Container sx={{ py: 4 }} maxWidth="lg">
      <Grid container spacing={3}>
        {props.washerInfo.map((item, index) => (
          <Grid item key={index} md={3}>
            <WasherItem
              show={props.show}
              hide={props.onHide}
              key={index + 1}
              index={index + 1}
              item={item}
            />
          </Grid>
        ))}

        {props.dryerInfo.map((item, index) => (
          <Grid item key={index} md={3}>
            <DryerItem
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
