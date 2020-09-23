import React from "react";
import {
  Card,
  CardContent,
  Button,
  makeStyles,
  TextField,
  Grid,
} from "@material-ui/core";
import logo from "../img/logo.png";
import { useHistory } from "react-router-dom";
import AuthService from "../services/AuthService";

const useStyles = makeStyles({
  card: {
    maxWidth: 350,
    padding: 10,
  },
  control: {
    margin: "10px 0px",
  },
});

export default function Login() {
  const classes = useStyles();
  const history = useHistory();
  const [email, setEmail] = React.useState("");
  const [password, setPassword] = React.useState("");
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
            <form onSubmit={(e) => e.preventDefault()}>
              <TextField
                className={classes.control}
                label="E-mail"
                value={email}
                onChange={(e) => setEmail(e.target.value)}
                fullWidth
              />
              <TextField
                className={classes.control}
                label="Contraseña"
                type="password"
                value={password}
                onChange={(e) => setPassword(e.target.value)}
                fullWidth
              />
              <Button
                className={classes.control}
                color="primary"
                variant="contained"
                type="submit"
                onClick={async () => {
                  const loginResult = await AuthService.login(email, password);
                  if (loginResult) {
                    history.push("/dashboard");
                  }
                }}
                fullWidth
              >
                Ingresar
              </Button>
            </form>
          </Grid>
        </CardContent>
      </Card>
    </Grid>
  );
}
