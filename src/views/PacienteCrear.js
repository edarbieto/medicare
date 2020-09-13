import React from "react";
import {
  Grid,
  Typography,
  Divider,
  TextField,
  MenuItem,
  Button,
} from "@material-ui/core";
import ArrowBackIcon from "@material-ui/icons/ArrowBack";
import SaveIcon from "@material-ui/icons/Save";
import { useHistory } from "react-router-dom";
import DataService from "../services/DataService";

export default function PacienteCrear() {
  const history = useHistory();
  const [paciente, setPaciente] = React.useState({
    address: "",
    firstName: "",
    lastName: "",
    password: "",
    email: "",
    birthDate: "",
    dni: "",
    cellPhone: "",
    ubigeo: "",
    gender: "",
    clinic: { id: "" },
    height: "",
    weight: "",
    smoker: false,
    hasTfcpc: false,
    hasCardiovascularProblems: false,
    hasDiabetes: false,
    bloodTypeID: 1,
  });
  return (
    <div>
      <Typography variant="h4">Nuevo paciente</Typography>
      <Typography variant="subtitle2" gutterBottom>
        Registrar paciente
      </Typography>
      <Divider />
      <Grid
        container
        alignItems="center"
        justify="space-between"
        style={{ margin: "30px 0px 10px 0px" }}
      >
        <Button
          color="primary"
          variant="contained"
          startIcon={<ArrowBackIcon />}
          onClick={() => history.goBack()}
        >
          Atrás
        </Button>
        <Button
          color="primary"
          variant="contained"
          startIcon={<SaveIcon />}
          onClick={() => {
            // DataService.postClinica(clinica).then((data) =>
            //   console.log(data.id)
            // );
          }}
        >
          Guardar
        </Button>
      </Grid>
      <Grid container>
        <Grid item xs={12} sm={6} md={4}>
          <div style={{ margin: 10 }}>
            <Typography variant="subtitle1">Información general</Typography>
            <Divider style={{ marginBottom: 10 }} />
            <TextField
              color="primary"
              variant="outlined"
              margin="dense"
              label="Clínica"
              value={paciente.clinic.id}
              onChange={(e) =>
                setPaciente({ ...paciente, clinic: { id: e.target.value } })
              }
              fullWidth
            />
          </div>
        </Grid>
      </Grid>
    </div>
  );
}
