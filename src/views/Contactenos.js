import React from "react";
import {
  Typography,
  Divider,
  Grid,
  Card,
  CardContent,
  makeStyles,
  TextField,
  Button,
} from "@material-ui/core";
import BusinessIcon from "@material-ui/icons/Business";

const useStyles = makeStyles((theme) => ({
  card: {
    margin: 10,
    padding: "50px 0px",
    textAlign: "center",
  },
}));

export default function Contactenos() {
  const classes = useStyles();
  return (
    <div>
      <Typography variant="h4">Contáctenos</Typography>
      <Typography variant="subtitle2" gutterBottom>
        Información de contacto y soporte
      </Typography>
      <Divider />
      <Grid container justify="center">
        {[1, 2, 3].map((id, index) => (
          <Grid item xs={6} lg={4} key={index}>
            <Card className={classes.card}>
              <CardContent>
                <BusinessIcon fontSize="large" />
                <Typography variant="h6">Organización {id}</Typography>
                <Typography variant="caption">
                  Av. Brasil 1223 - Dpto 3, Piso 7<br />
                </Typography>
                <Typography variant="caption">
                  Lince, Lima - Perú
                  <br />
                </Typography>
                <Typography variant="caption">
                  Tlf: (511) 123 - 5678
                  <br />
                </Typography>
              </CardContent>
            </Card>
          </Grid>
        ))}
        <Grid item xs={12}>
          <Card>
            <CardContent>
              <TextField
                variant="outlined"
                label="Comentarios"
                rows={5}
                multiline
                fullWidth
              />
              <Button
                color="primary"
                variant="contained"
                style={{ marginTop: 10 }}
                fullWidth
              >
                Enviar
              </Button>
            </CardContent>
          </Card>
        </Grid>
      </Grid>
    </div>
  );
}
