import React from "react";
import {
  Grid,
  Typography,
  Divider,
  TextField,
  MenuItem,
  Button,
  FormControlLabel,
  Switch,
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
  const [clinicas, setClinicas] = React.useState([]);
  const [departamentos, setDepartamentos] = React.useState([]);
  const [provincias, setProvincias] = React.useState([]);
  const [distritos, setDistritos] = React.useState([]);
  const [idDepartamento, setIdDepartamento] = React.useState("");
  const [idProvincia, setIdProvincia] = React.useState("");
  React.useEffect(() => {
    let mounted = true;
    if (clinicas.length < 1) {
      DataService.getClinicas(1, 100).then((data) => {
        if (mounted) setClinicas(data ? data : []);
      });
    }
    if (departamentos.length < 1) {
      DataService.getDepartamentos().then((data) => {
        if (mounted) setDepartamentos(data ? data : []);
      });
    }
    DataService.getProvincias(idDepartamento).then((data) => {
      if (mounted) setProvincias(data ? data : []);
    });
    DataService.getDistritos(idProvincia).then((data) => {
      if (mounted) setDistritos(data ? data : []);
    });
    return () => (mounted = false);
  }, [clinicas.length, departamentos.length, idDepartamento, idProvincia]);
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
            const bDate = new Date(paciente.birthDate);
            paciente.birthDate = bDate;
            DataService.postPaciente(paciente).then((data) => history.goBack());
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
              label="Nombres"
              value={paciente.firstName}
              onChange={(e) =>
                setPaciente({
                  ...paciente,
                  firstName: e.target.value,
                })
              }
              fullWidth
            />
            <TextField
              color="primary"
              variant="outlined"
              margin="dense"
              label="Apellidos"
              value={paciente.lastName}
              onChange={(e) =>
                setPaciente({
                  ...paciente,
                  lastName: e.target.value,
                })
              }
              fullWidth
            />
            <TextField
              color="primary"
              variant="outlined"
              margin="dense"
              label="Email"
              value={paciente.email}
              onChange={(e) =>
                setPaciente({
                  ...paciente,
                  email: e.target.value,
                })
              }
              fullWidth
            />
            <TextField
              color="primary"
              variant="outlined"
              margin="dense"
              label="Fecha de nacimiento"
              type="date"
              value={paciente.birthDate}
              onChange={(e) =>
                setPaciente({
                  ...paciente,
                  birthDate: e.target.value,
                })
              }
              InputLabelProps={{ shrink: true }}
              fullWidth
            />
            <TextField
              color="primary"
              variant="outlined"
              margin="dense"
              label="DNI"
              value={paciente.dni}
              onChange={(e) =>
                setPaciente({
                  ...paciente,
                  dni: e.target.value,
                })
              }
              fullWidth
            />
            <TextField
              color="primary"
              variant="outlined"
              margin="dense"
              label="CE"
              fullWidth
            />
            <TextField
              select
              color="primary"
              variant="outlined"
              margin="dense"
              label="Género"
              value={paciente.gender}
              onChange={(e) =>
                setPaciente({
                  ...paciente,
                  gender: e.target.value,
                })
              }
              fullWidth
            >
              <MenuItem value={true}>Masculino</MenuItem>
              <MenuItem value={false}>Femenino</MenuItem>
            </TextField>
            <TextField
              color="primary"
              variant="outlined"
              margin="dense"
              label="Celular"
              value={paciente.cellPhone}
              onChange={(e) =>
                setPaciente({
                  ...paciente,
                  cellPhone: e.target.value,
                })
              }
              fullWidth
            />
          </div>
        </Grid>
        <Grid item xs={12} sm={6} md={4}>
          <div style={{ margin: 10 }}>
            <Typography variant="subtitle1">Dirección</Typography>
            <Divider style={{ marginBottom: 10 }} />
            <TextField
              color="primary"
              variant="outlined"
              margin="dense"
              label="Dirección fiscal"
              value={paciente.address}
              onChange={(e) =>
                setPaciente({ ...paciente, address: e.target.value })
              }
              fullWidth
            />
            <TextField
              select
              color="primary"
              variant="outlined"
              margin="dense"
              label="Departamento"
              value={idDepartamento}
              onChange={(e) => {
                setIdProvincia("");
                setPaciente({ ...paciente, ubigeo: "" });
                setIdDepartamento(e.target.value);
              }}
              disabled={departamentos.length < 1}
              fullWidth
            >
              {departamentos?.map((departamento) => (
                <MenuItem key={departamento.id} value={departamento.id}>
                  {departamento.name}
                </MenuItem>
              ))}
            </TextField>
            <TextField
              select
              color="primary"
              variant="outlined"
              margin="dense"
              label="Provincia"
              value={idProvincia}
              onChange={(e) => {
                setPaciente({ ...paciente, ubigeo: "" });
                setIdProvincia(e.target.value);
              }}
              disabled={idDepartamento === "" && provincias.length < 1}
              fullWidth
            >
              {provincias.map((provincia) => (
                <MenuItem key={provincia.id} value={provincia.id}>
                  {provincia.name}
                </MenuItem>
              ))}
            </TextField>
            <TextField
              select
              color="primary"
              variant="outlined"
              margin="dense"
              label="Distrito"
              value={paciente.ubigeo}
              onChange={(e) =>
                setPaciente({ ...paciente, ubigeo: e.target.value })
              }
              disabled={idProvincia === "" && distritos.length < 1}
              fullWidth
            >
              {distritos.map((distrito) => (
                <MenuItem key={distrito.ubigeo} value={distrito.ubigeo}>
                  {distrito.name}
                </MenuItem>
              ))}
            </TextField>
          </div>
          <div style={{ margin: 10 }}>
            <Typography variant="subtitle1">Contraseña</Typography>
            <Divider style={{ marginBottom: 10 }} />
            <TextField
              color="primary"
              variant="outlined"
              margin="dense"
              label="Contraseña"
              type="password"
              value={paciente.password}
              onChange={(e) =>
                setPaciente({
                  ...paciente,
                  password: e.target.value,
                })
              }
              fullWidth
            />
            <TextField
              color="primary"
              variant="outlined"
              margin="dense"
              label="Repetir contraseña"
              type="password"
              fullWidth
            />
          </div>
          <div style={{ margin: 10 }}>
            <Typography variant="subtitle1">Clínica</Typography>
            <Divider style={{ marginBottom: 10 }} />
            <TextField
              select
              color="primary"
              variant="outlined"
              margin="dense"
              label="Clínica"
              value={paciente.clinic.id}
              onChange={(e) =>
                setPaciente({
                  ...paciente,
                  clinic: { id: e.target.value },
                })
              }
              disabled={clinicas.length < 1}
              fullWidth
            >
              {clinicas.map((clinicas) => (
                <MenuItem key={clinicas.id} value={clinicas.id}>
                  {clinicas.commercialName}
                </MenuItem>
              ))}
            </TextField>
          </div>
        </Grid>
        <Grid item xs={12} sm={6} md={4}>
          <div style={{ margin: 10 }}>
            <Typography variant="subtitle1">Perfil de paciente</Typography>
            <Divider style={{ marginBottom: 10 }} />
            <TextField
              color="primary"
              variant="outlined"
              margin="dense"
              label="Altura (metros)"
              type="number"
              value={paciente.height}
              onChange={(e) =>
                setPaciente({ ...paciente, height: parseInt(e.target.value) })
              }
              fullWidth
            />
            <TextField
              color="primary"
              variant="outlined"
              margin="dense"
              label="Peso (KG)"
              type="number"
              value={paciente.weight}
              onChange={(e) =>
                setPaciente({ ...paciente, weight: parseInt(e.target.value) })
              }
              fullWidth
            />
            <FormControlLabel
              label="¿Es fumador?"
              control={
                <Switch
                  checked={paciente.smoker}
                  onChange={(e) => {
                    setPaciente({
                      ...paciente,
                      smoker: e.target.checked,
                    });
                  }}
                />
              }
            />
            <FormControlLabel
              label="¿Tiene problemas cardiovasculares?"
              control={
                <Switch
                  checked={paciente.hasCardiovascularProblems}
                  onChange={(e) => {
                    setPaciente({
                      ...paciente,
                      hasCardiovascularProblems: e.target.checked,
                    });
                  }}
                />
              }
            />
            <FormControlLabel
              label="¿Tiene familiares con problemas cardiacos?"
              control={
                <Switch
                  checked={paciente.hasTfcpc}
                  onChange={(e) => {
                    setPaciente({
                      ...paciente,
                      hasTfcpc: e.target.checked,
                    });
                  }}
                />
              }
            />
            <FormControlLabel
              label="¿Tiene diabetes?"
              control={
                <Switch
                  checked={paciente.hasDiabetes}
                  onChange={(e) => {
                    setPaciente({
                      ...paciente,
                      hasDiabetes: e.target.checked,
                    });
                  }}
                />
              }
            />
            <TextField
              select
              color="primary"
              variant="outlined"
              margin="dense"
              label="Grupo sanguíneo"
              // value={paciente.bloodTypeID}
              // onChange={(e) => {
              //   setPaciente({
              //     ...paciente,
              //     bloodTypeID: e.target.checked,
              //   });
              // }}
              fullWidth
            >
              <MenuItem>A+</MenuItem>
            </TextField>
          </div>
        </Grid>
      </Grid>
    </div>
  );
}
