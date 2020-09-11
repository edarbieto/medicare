import React from "react";
import {
  Typography,
  Divider,
  Grid,
  Card,
  CardContent,
  makeStyles,
  IconButton,
} from "@material-ui/core";
import MenuBookIcon from "@material-ui/icons/MenuBook";
import DesktopWindowsIcon from "@material-ui/icons/DesktopWindows";
import QuestionAnswerIcon from "@material-ui/icons/QuestionAnswer";
import LaunchIcon from "@material-ui/icons/Launch";

const useStyles = makeStyles((theme) => ({
  Card: {
    margin: 10,
    padding: "50px 0px",
    textAlign: "center",
  },
}));

export default function Ayuda() {
  const classes = useStyles();
  return (
    <div>
      <Typography variant="h4">Ayuda</Typography>
      <Typography variant="subtitle2" gutterBottom>
        Manuales del sistema
      </Typography>
      <Divider />
      <Grid container justify="center">
        {[
          {
            nombre: "Manual de uso",
            icono: <MenuBookIcon fontSize="large" />,
          },
          {
            nombre: "Video",
            icono: <DesktopWindowsIcon fontSize="large" />,
          },
          {
            nombre: "Preguntas frecuentes",
            icono: <QuestionAnswerIcon fontSize="large" />,
          },
        ].map((item, index) => (
          <Grid item xs={6} lg={4} key={index}>
            <Card className={classes.Card}>
              <CardContent>
                {item.icono}
                <Typography variant="h6">{item.nombre}</Typography>
              </CardContent>
              <IconButton>
                <LaunchIcon />
              </IconButton>
            </Card>
          </Grid>
        ))}
      </Grid>
    </div>
  );
}
