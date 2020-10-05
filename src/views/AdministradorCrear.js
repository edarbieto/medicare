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
import ReactSwal from "../components/ReactSwal";

export default function AdministradorCrear() {
  const history = useHistory();
  const [administrador, setAdministrador] = React.useState({
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
        if (mounted) setClinicas(data.data ? data.data : []);
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
      <Typography variant="h4">Nueva administrador de clínica</Typography>
      <Typography variant="subtitle2" gutterBottom>
        Registrar administrador de clínica
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
              !administrador.firstName ||
              !administrador.lastName ||
              !administrador.email ||
              !administrador.birthDate ||
              !administrador.dni ||
              administrador.dni.length !== 8 ||
              !/^\d+$/.test(administrador.dni) ||
              !administrador.cellPhone ||
              !administrador.address ||
              !administrador.ubigeo ||
              !administrador.password ||
              !administrador.passwordR ||
              administrador.password !== administrador.passwordR ||
              !administrador.clinic.id
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
              const bDate = new Date(administrador.birthDate);
              ReactSwal.fire({
                icon: "info",
                title: "Por favor, espere...",
              });
              ReactSwal.showLoading();
              administrador.birthDate = bDate.toISOString();
              DataService.postAdministrador(administrador)
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
        <Grid item xs={12} sm={6}>
          <div style={{ margin: 10 }}>
            <Typography variant="subtitle1">Información general</Typography>
            <Divider style={{ marginBottom: 10 }} />
            <TextField
              required
              color="primary"
              variant="outlined"
              margin="dense"
              label="Nombres"
              value={administrador.firstName}
              onChange={(e) =>
                setAdministrador({
                  ...administrador,
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
              value={administrador.lastName}
              onChange={(e) =>
                setAdministrador({
                  ...administrador,
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
              value={administrador.email}
              onChange={(e) =>
                setAdministrador({
                  ...administrador,
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
              value={administrador.birthDate}
              onChange={(e) =>
                setAdministrador({
                  ...administrador,
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
              value={administrador.dni}
              onChange={(e) =>
                setAdministrador({
                  ...administrador,
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
              value={administrador.gender}
              onChange={(e) =>
                setAdministrador({
                  ...administrador,
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
              value={administrador.cellPhone}
              onChange={(e) =>
                setAdministrador({
                  ...administrador,
                  cellPhone: e.target.value,
                })
              }
              fullWidth
            />
          </div>
        </Grid>
        <Grid item xs={12} sm={6}>
          <div style={{ margin: 10 }}>
            <Typography variant="subtitle1">Dirección</Typography>
            <Divider style={{ marginBottom: 10 }} />
            <TextField
              required
              color="primary"
              variant="outlined"
              margin="dense"
              label="Dirección fiscal"
              value={administrador.address}
              onChange={(e) =>
                setAdministrador({ ...administrador, address: e.target.value })
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
                setAdministrador({ ...administrador, ubigeo: "" });
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
                setAdministrador({ ...administrador, ubigeo: "" });
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
              value={administrador.ubigeo}
              onChange={(e) =>
                setAdministrador({ ...administrador, ubigeo: e.target.value })
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
              value={administrador.password}
              onChange={(e) =>
                setAdministrador({
                  ...administrador,
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
              value={administrador.passwordR}
              onChange={(e) =>
                setAdministrador({
                  ...administrador,
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
              value={administrador.clinic.id}
              onChange={(e) =>
                setAdministrador({
                  ...administrador,
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
      </Grid>
    </div>
  );
}
