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
import ReactSwal from "../components/ReactSwal";

export default function PacienteCrear() {
  const history = useHistory();
  const [paciente, setPaciente] = React.useState({
    address: "",
    firstName: "",
    lastName: "",
    password: "",
    passwordR: "",
    email: "",
    birthDate: "",
    dni: "",
    cellPhone: "",
    ubigeo: "",
    gender: true,
    clinic: { id: "" },
    height: "",
    weight: "",
    smoker: false,
    hasTfcpc: false,
    hasCardiovascularProblems: false,
    hasDiabetes: false,
    bloodTypeID: "",
  });
  const [clinicas, setClinicas] = React.useState([]);
  const [departamentos, setDepartamentos] = React.useState([]);
  const [provincias, setProvincias] = React.useState([]);
  const [distritos, setDistritos] = React.useState([]);
  const [idDepartamento, setIdDepartamento] = React.useState("");
  const [idProvincia, setIdProvincia] = React.useState("");
  const [tiposSangre, setTiposSangre] = React.useState([]);
  React.useEffect(() => {
    let mounted = true;
    if (clinicas.length < 1) {
      DataService.getClinicas(1, 100).then((data) => {
        if (mounted) setClinicas(data.data ? data.data : []);
      });
    }
    if (tiposSangre.length < 1) {
      DataService.getTiposSangre().then((data) => {
        if (mounted) setTiposSangre(data ? data : []);
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
  }, [
    clinicas.length,
    departamentos.length,
    idDepartamento,
    idProvincia,
    tiposSangre.length,
  ]);
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
            if (
              !paciente.firstName ||
              !paciente.lastName ||
              !paciente.email ||
              !paciente.birthDate ||
              !paciente.dni ||
              paciente.dni.length !== 8 ||
              !/^\d+$/.test(paciente.dni) ||
              !paciente.cellPhone ||
              !paciente.address ||
              !paciente.ubigeo ||
              !paciente.password ||
              !paciente.passwordR ||
              paciente.password !== paciente.passwordR ||
              !paciente.clinic.id ||
              !parseFloat(paciente.height) ||
              !parseFloat(paciente.weight) ||
              !paciente.bloodTypeID
            ) {
              ReactSwal.fire({
                icon: "error",
                title: "Faltan datos",
                text:
                  "Revisar que todos los campos requeridos han sido completados y sean correctos",
                allowOutsideClick: false,
                allowEscapeKey: false,
                allowEnterKey: false,
              });
            } else {
              const bDate = new Date(paciente.birthDate);
              paciente.birthDate = bDate;
              ReactSwal.fire({
                icon: "info",
                title: "Por favor, espere...",
              });
              ReactSwal.showLoading();
              DataService.postPaciente(paciente)
                .then(() => {
                  history.goBack();
                  ReactSwal.close();
                })
                .catch((error) => {
                  let errs = [];
                  for (const key in error.response.data.errors) errs.push(key);
                  ReactSwal.fire({
                    icon: "error",
                    title: "Error al guardar datos",
                    text: `${error.response.data.message}: ${errs.join(", ")}`,
                  });
                });
            }
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
              required
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
              required
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
              required
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
              required
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
              required
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
              required
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
              required
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
              required
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
              required
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
              required
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
              required
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
              required
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
              required
              color="primary"
              variant="outlined"
              margin="dense"
              label="Repetir contraseña"
              type="password"
              value={paciente.passwordR}
              onChange={(e) =>
                setPaciente({
                  ...paciente,
                  passwordR: e.target.value,
                })
              }
              fullWidth
            />
          </div>
          <div style={{ margin: 10 }}>
            <Typography variant="subtitle1">Clínica</Typography>
            <Divider style={{ marginBottom: 10 }} />
            <TextField
              required
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
              required
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
              required
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
              required
              select
              color="primary"
              variant="outlined"
              margin="dense"
              label="Grupo sanguíneo"
              value={paciente.bloodTypeID}
              onChange={(e) => {
                setPaciente({
                  ...paciente,
                  bloodTypeID: e.target.value,
                });
              }}
              disabled={tiposSangre.length < 1}
              fullWidth
            >
              {tiposSangre.map((tipoSangre) => (
                <MenuItem key={tipoSangre.id} value={tipoSangre.id}>
                  {tipoSangre.name}
                </MenuItem>
              ))}
            </TextField>
          </div>
        </Grid>
      </Grid>
    </div>
  );
}
