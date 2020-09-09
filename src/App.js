import React from "react";
import {
  Card,
  CardContent,
  Button,
  makeStyles,
  TextField,
  Grid,
} from "@material-ui/core";
import logo from "./img/logo.png";

const useStyles = makeStyles({
  card: {
    maxWidth: 350,
    padding: 10,
  },
  control: {
    margin: "10px 0px",
  },
});

export default function App() {
  const classes = useStyles();
  return (
    <Grid
      container
      spacing={0}
      direction="column"
      alignItems="center"
      justify="center"
      style={{ minHeight: "100vh", backgroundColor: "#f3f6f8" }}
    >
      <Card className={classes.card} elevation={10}>
        <CardContent>
          <Grid container justify="center">
            <img src={logo} alt="logo" />
            <TextField
              className={classes.control}
              id="email"
              label="E-mail"
              fullWidth
            />
            <TextField
              className={classes.control}
              id="contrasena"
              label="Contraseña"
              type="password"
              fullWidth
            />
            <Button
              className={classes.control}
              color="primary"
              variant="contained"
              fullWidth
            >
              Ingresar
            </Button>
          </Grid>
        </CardContent>
      </Card>
    </Grid>
  );
}
