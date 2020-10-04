import React from "react";
import {
  Typography,
  Divider,
  TextField,
  InputAdornment,
  IconButton,
  Grid,
  Button,
  TableContainer,
  Table,
  TableHead,
  TableRow,
  TableCell,
  TableBody,
  Paper,
  Dialog,
  DialogTitle,
  DialogContent,
  DialogActions,
  MenuItem,
} from "@material-ui/core";
import SearchIcon from "@material-ui/icons/Search";
import AddIcon from "@material-ui/icons/Add";
import EditIcon from "@material-ui/icons/Edit";
import VisibilityIcon from "@material-ui/icons/Visibility";
import DeleteIcon from "@material-ui/icons/Delete";
import DataService from "../services/DataService";
import { useHistory, useRouteMatch, Route, Switch } from "react-router-dom";
import PacienteCrear from "./PacienteCrear";

export default function Pacientes(props) {
  const history = useHistory();
  const { path, url } = useRouteMatch();
  const [pacientes, setPacientes] = React.useState([]);
  const [pacienteDialogData, setPacienteDialogData] = React.useState({
    open: false,
    isEditar: false,
    paciente: {
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
    },
  });
  const [departamentos, setDepartamentos] = React.useState([]);
  const [provincias, setProvincias] = React.useState([]);
  const [distritos, setDistritos] = React.useState([]);
  const [idDepartamento, setIdDepartamento] = React.useState("");
  const [idProvincia, setIdProvincia] = React.useState("");
  const [clinicas, setClinicas] = React.useState([]);
  React.useEffect(() => {
    let mounted = true;
    DataService.getPacientes().then((data) => {
      if (mounted) setPacientes(data);
    });
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
    return () => {
      mounted = false;
    };
  }, [props.history.action, clinicas.length, departamentos.length, idDepartamento, idProvincia]);
  return (
    <Switch>
      <Route exact path={`${path}`}>
        <div>
          <Typography variant="h4">Pacientes</Typography>
          <Typography variant="subtitle2" gutterBottom>
            Lista de pacientes
          </Typography>
          <Divider />
          <Grid
            container
            alignItems="center"
            justify="space-between"
            style={{ margin: "20px 0px" }}
          >
            <div>
              <TextField
                label="Filtro por nombres y apellidos"
                color="primary"
                variant="outlined"
                margin="dense"
                style={{ width: 300, marginRight: 10 }}
                InputProps={{
                  endAdornment: (
                    <InputAdornment position="end">
                      <IconButton>
                        <SearchIcon></SearchIcon>
                      </IconButton>
                    </InputAdornment>
                  ),
                }}
              />
              <TextField
                label="Filtro por clínica"
                color="primary"
                variant="outlined"
                margin="dense"
                style={{ width: 300 }}
                InputProps={{
                  endAdornment: (
                    <InputAdornment position="end">
                      <IconButton>
                        <SearchIcon></SearchIcon>
                      </IconButton>
                    </InputAdornment>
                  ),
                }}
              />
            </div>
            <Button
              color="primary"
              variant="contained"
              startIcon={<AddIcon />}
              onClick={() => {
                history.push(`${url}/crear`);
              }}
            >
              Nuevo
            </Button>
          </Grid>
          <TableContainer component={Paper}>
            <Table>
              <TableHead>
                <TableRow>
                  <TableCell>Nombres</TableCell>
                  <TableCell>Apellidos</TableCell>
                  <TableCell>Fecha de nacimiento</TableCell>
                  <TableCell>Acciones</TableCell>
                </TableRow>
              </TableHead>
              <TableBody>
                {pacientes.map((paciente, index) => (
                  <TableRow key={paciente.id}>
                    <TableCell>{paciente.firstName}</TableCell>
                    <TableCell>{paciente.lastName}</TableCell>
                    <TableCell>
                      {new Date(paciente.birthDate).toLocaleDateString(
                        "es-PE",
                        { day: "2-digit", month: "2-digit", year: "numeric" }
                      )}
                    </TableCell>
                    <TableCell>
                      <IconButton
                        onClick={() => {
                          const mPaciente = {
                            ...paciente,
                            clinic: { id: paciente.clinicID },
                          };
                          setPacienteDialogData({
                            ...pacienteDialogData,
                            open: true,
                            isEditar: true,
                            paciente: mPaciente,
                          });
                        }}
                      >
                        <EditIcon fontSize="small" />
                      </IconButton>
                      <IconButton
                        onClick={() => {
                          const mPaciente = {
                            ...paciente,
                            clinic: { id: paciente.clinicID },
                          };
                          setPacienteDialogData({
                            ...pacienteDialogData,
                            open: true,
                            isEditar: false,
                            paciente: mPaciente,
                          });
                        }}
                      >
                        <VisibilityIcon fontSize="small" />
                      </IconButton>
                      <IconButton
                        onClick={() => {
                          // DataService.deleteAdministrador(
                          //   paciente.id
                          // ).then(() => {
                          //   DataService.getAdministradores().then((data) =>
                          //     setAdministradores(data)
                          //   );
                          // });
                        }}
                      >
                        <DeleteIcon fontSize="small" />
                      </IconButton>
                    </TableCell>
                  </TableRow>
                ))}
              </TableBody>
            </Table>
          </TableContainer>
          <Dialog
            maxWidth="lg"
            open={pacienteDialogData.open}
            onClose={() =>
              setPacienteDialogData({
                ...pacienteDialogData,
                open: false,
              })
            }
            fullWidth
          >
            <DialogTitle>
              {pacienteDialogData.isEditar
                ? `Editar clínica: ${pacienteDialogData.paciente?.firstName} ${pacienteDialogData.paciente?.lastName}`
                : `Ver clínica: ${pacienteDialogData.paciente?.firstName} ${pacienteDialogData.paciente?.lastName}`}
            </DialogTitle>
            <DialogContent>
              <Grid container>
                <Grid item xs={12} sm={6}>
                  <div style={{ margin: 10 }}>
                    <Typography variant="subtitle1">
                      Información general
                    </Typography>
                    <Divider style={{ marginBottom: 10 }} />
                    <TextField
                      color="primary"
                      variant="outlined"
                      margin="dense"
                      label="Nombres"
                      value={pacienteDialogData.paciente.firstName}
                      onChange={(e) =>
                        setPacienteDialogData({
                          ...pacienteDialogData,
                          paciente: {
                            ...pacienteDialogData.paciente,
                            firstName: e.target.value,
                          },
                        })
                      }
                      disabled={!pacienteDialogData.isEditar}
                      fullWidth
                    />
                    <TextField
                      color="primary"
                      variant="outlined"
                      margin="dense"
                      label="Apellidos"
                      value={pacienteDialogData.paciente.lastName}
                      onChange={(e) =>
                        setPacienteDialogData({
                          ...pacienteDialogData,
                          paciente: {
                            ...pacienteDialogData.paciente,
                            lastName: e.target.value,
                          },
                        })
                      }
                      disabled={!pacienteDialogData.isEditar}
                      fullWidth
                    />
                    <TextField
                      color="primary"
                      variant="outlined"
                      margin="dense"
                      label="Email"
                      value={pacienteDialogData.paciente.email}
                      onChange={(e) =>
                        setPacienteDialogData({
                          ...pacienteDialogData,
                          paciente: {
                            ...pacienteDialogData.paciente,
                            email: e.target.value,
                          },
                        })
                      }
                      disabled={!pacienteDialogData.isEditar}
                      fullWidth
                    />
                    <TextField
                      color="primary"
                      variant="outlined"
                      margin="dense"
                      label="Fecha de nacimiento"
                      type="date"
                      value={pacienteDialogData.paciente.birthDate}
                      onChange={(e) => {
                        const bDate = new Date(e.target.value);
                        setPacienteDialogData({
                          ...pacienteDialogData,
                          paciente: {
                            ...pacienteDialogData.paciente,
                            birthDate: bDate.toISOString(),
                          },
                        });
                      }}
                      InputLabelProps={{ shrink: true }}
                      disabled={!pacienteDialogData.isEditar}
                      fullWidth
                    />
                    <TextField
                      color="primary"
                      variant="outlined"
                      margin="dense"
                      label="DNI"
                      value={pacienteDialogData.paciente.dni}
                      onChange={(e) =>
                        setPacienteDialogData({
                          ...pacienteDialogData,
                          paciente: {
                            ...pacienteDialogData.paciente,
                            dni: e.target.value,
                          },
                        })
                      }
                      disabled={!pacienteDialogData.isEditar}
                      fullWidth
                    />
                    <TextField
                      color="primary"
                      variant="outlined"
                      margin="dense"
                      label="CE"
                      disabled={!pacienteDialogData.isEditar}
                      fullWidth
                    />
                    <TextField
                      select
                      color="primary"
                      variant="outlined"
                      margin="dense"
                      label="Género"
                      value={pacienteDialogData.paciente.gender}
                      onChange={(e) =>
                        setPacienteDialogData({
                          ...pacienteDialogData,
                          paciente: {
                            ...pacienteDialogData.paciente,
                            gender: e.target.value,
                          },
                        })
                      }
                      disabled={!pacienteDialogData.isEditar}
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
                      value={pacienteDialogData.paciente.cellPhone}
                      onChange={(e) =>
                        setPacienteDialogData({
                          ...pacienteDialogData,
                          paciente: {
                            ...pacienteDialogData.paciente,
                            cellPhone: e.target.value,
                          },
                        })
                      }
                      disabled={!pacienteDialogData.isEditar}
                      fullWidth
                    />
                  </div>
                </Grid>
                <Grid item xs={12} sm={6}>
                  <div style={{ margin: 10 }}>
                    <Typography variant="subtitle1">Dirección</Typography>
                    <Divider style={{ marginBottom: 10 }} />
                    <TextField
                      color="primary"
                      variant="outlined"
                      margin="dense"
                      label="Dirección fiscal"
                      value={pacienteDialogData.paciente.address}
                      onChange={(e) =>
                        setPacienteDialogData({
                          ...pacienteDialogData,
                          paciente: {
                            ...pacienteDialogData.paciente,
                            address: e.target.value,
                          },
                        })
                      }
                      disabled={!pacienteDialogData.isEditar}
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
                        setPacienteDialogData({
                          ...pacienteDialogData,
                          paciente: {
                            ...pacienteDialogData.paciente,
                            ubigeo: "",
                          },
                        });
                        setIdDepartamento(e.target.value);
                      }}
                      disabled={
                        departamentos.length < 1 || !pacienteDialogData.isEditar
                      }
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
                        setPacienteDialogData({
                          ...pacienteDialogData,
                          paciente: {
                            ...pacienteDialogData.paciente,
                            ubigeo: "",
                          },
                        });
                        setIdProvincia(e.target.value);
                      }}
                      disabled={
                        (idDepartamento === "" && provincias.length < 1) ||
                        !pacienteDialogData.isEditar
                      }
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
                      value={pacienteDialogData.paciente.ubigeo}
                      onChange={(e) =>
                        setPacienteDialogData({
                          ...pacienteDialogData,
                          paciente: {
                            ...pacienteDialogData.paciente,
                            ubigeo: e.target.value,
                          },
                        })
                      }
                      disabled={
                        (idProvincia === "" && distritos.length < 1) ||
                        !pacienteDialogData.isEditar
                      }
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
                      value={pacienteDialogData.paciente.password}
                      onChange={(e) =>
                        setPacienteDialogData({
                          ...pacienteDialogData,
                          paciente: {
                            ...pacienteDialogData.paciente,
                            password: e.target.value,
                          },
                        })
                      }
                      disabled={!pacienteDialogData.isEditar}
                      fullWidth
                    />
                    <TextField
                      color="primary"
                      variant="outlined"
                      margin="dense"
                      label="Repetir contraseña"
                      type="password"
                      disabled={!pacienteDialogData.isEditar}
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
                      value={pacienteDialogData.paciente.clinic.id}
                      onChange={(e) =>
                        setPacienteDialogData({
                          ...pacienteDialogData,
                          paciente: {
                            ...pacienteDialogData.paciente,
                            clinic: { id: e.target.value },
                          },
                        })
                      }
                      disabled={
                        clinicas.length < 1 || !pacienteDialogData.isEditar
                      }
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
            </DialogContent>
            <DialogActions>
              <Button
                color="primary"
                onClick={() => {
                  setPacienteDialogData({
                    ...pacienteDialogData,
                    open: false,
                  });
                }}
              >
                {pacienteDialogData.isEditar ? "CANCELAR" : "CERRAR"}
              </Button>
              {pacienteDialogData.isEditar && (
                <Button
                  color="primary"
                  onClick={() => {
                    // DataService.updateClinica(clinicaDialogData.clinica).then(
                    //   () =>
                    //     DataService.getClinicas().then((data) => {
                    //       setClinicas(data);
                    //       setClinicaDialogData({
                    //         ...clinicaDialogData,
                    //         open: false,
                    //       });
                    //     })
                    // );
                    DataService.updatePaciente(
                      pacienteDialogData.paciente
                    ).then(() => {
                      DataService.getPacientes().then((data) => {
                        setPacientes(data);
                        setPacienteDialogData({
                          ...pacienteDialogData,
                          open: false,
                        });
                      });
                    });
                  }}
                >
                  Guardar
                </Button>
              )}
            </DialogActions>
          </Dialog>
        </div>
      </Route>
      <Route path={`${path}/crear`} component={PacienteCrear} />
    </Switch>
  );
}
