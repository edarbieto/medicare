import React from "react";
import {
  Typography,
  Divider,
  TextField,
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
  TablePagination,
} from "@material-ui/core";
import AddIcon from "@material-ui/icons/Add";
import EditIcon from "@material-ui/icons/Edit";
import VisibilityIcon from "@material-ui/icons/Visibility";
import DeleteIcon from "@material-ui/icons/Delete";
import DataService from "../services/DataService";
import { useHistory, useRouteMatch, Route, Switch } from "react-router-dom";
import AdministradorCrear from "./AdministradorCrear";
import ReactSwal from "../components/ReactSwal";

export default function Administradores(props) {
  const history = useHistory();
  const { path, url } = useRouteMatch();
  const [administradores, setAdministradores] = React.useState([]);
  const [administradorDialogData, setAdministradorDialogData] = React.useState({
    open: false,
    isEditar: false,
    administrador: {
      address: "",
      firstName: "",
      lastName: "",
      password: "",
      email: "",
      birthDate: "",
      dni: "",
      cellPhone: "",
      ubigeo: "",
      gender: true,
      clinic: { id: "" },
    },
  });
  const [departamentos, setDepartamentos] = React.useState([]);
  const [provincias, setProvincias] = React.useState([]);
  const [distritos, setDistritos] = React.useState([]);
  const [idDepartamento, setIdDepartamento] = React.useState("");
  const [idProvincia, setIdProvincia] = React.useState("");
  const [clinicas, setClinicas] = React.useState([]);
  const [filter, setFilter] = React.useState("");
  const [page, setPage] = React.useState(1);
  const [count, setCount] = React.useState(0);
  React.useEffect(() => {
    let mounted = true;
    DataService.getAdministradores({ filter: filter, page: page }).then(
      (data) => {
        if (mounted) {
          setAdministradores(data.data);
          if (page === 1) setCount(data.count);
        }
      }
    );
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
  }, [
    props.history.action,
    clinicas.length,
    departamentos.length,
    idDepartamento,
    idProvincia,
    filter,
    page,
  ]);
  return (
    <Switch>
      <Route exact path={`${path}`}>
        <div>
          <Typography variant="h4">Administradores de clínicas</Typography>
          <Typography variant="subtitle2" gutterBottom>
            Lista de administradores de clínicas
          </Typography>
          <Divider />
          <Grid
            container
            alignItems="center"
            justify="space-between"
            style={{ margin: "20px 0px" }}
          >
            <TextField
              label="Filtro por nombre"
              color="primary"
              variant="outlined"
              margin="dense"
              style={{ width: 300 }}
              value={filter}
              onChange={(e) => {
                setPage(1);
                setFilter(e.target.value);
              }}
            />
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
                  <TableCell>Clínica</TableCell>
                  <TableCell>Acciones</TableCell>
                </TableRow>
              </TableHead>
              <TableBody>
                {administradores.map((administrador, index) => (
                  <TableRow key={administrador.id}>
                    <TableCell>{administrador.firstName}</TableCell>
                    <TableCell>{administrador.lastName}</TableCell>
                    <TableCell>{administrador.clinicCommercialName}</TableCell>
                    <TableCell>
                      <IconButton
                        onClick={() => {
                          const mAdmin = {
                            ...administrador,
                            clinic: { id: administrador.clinicID },
                          };
                          setAdministradorDialogData({
                            ...administradorDialogData,
                            open: true,
                            isEditar: true,
                            administrador: mAdmin,
                          });
                        }}
                      >
                        <EditIcon fontSize="small" />
                      </IconButton>
                      <IconButton
                        onClick={() => {
                          const mAdmin = {
                            ...administrador,
                            clinic: { id: administrador.clinicID },
                          };
                          setAdministradorDialogData({
                            ...administradorDialogData,
                            open: true,
                            isEditar: false,
                            administrador: mAdmin,
                          });
                        }}
                      >
                        <VisibilityIcon fontSize="small" />
                      </IconButton>
                      <IconButton
                        onClick={() => {
                          DataService.deleteAdministrador(
                            administrador.id
                          ).then(() => {
                            DataService.getAdministradores().then((data) => {
                              setAdministradores(data.data);
                              setCount(data.count);
                              setPage(1);
                              setFilter("");
                            });
                          });
                        }}
                      >
                        <DeleteIcon fontSize="small" />
                      </IconButton>
                    </TableCell>
                  </TableRow>
                ))}
              </TableBody>
            </Table>
            <TablePagination
              component="div"
              rowsPerPageOptions={[]}
              rowsPerPage={10}
              count={count}
              page={page - 1}
              onChangePage={(e, p) => setPage(p + 1)}
            />
          </TableContainer>
          <Dialog
            maxWidth="lg"
            open={administradorDialogData.open}
            onClose={() =>
              setAdministradorDialogData({
                ...administradorDialogData,
                open: false,
              })
            }
            fullWidth
          >
            <DialogTitle>
              {administradorDialogData.isEditar
                ? `Editar clínica: ${administradorDialogData.administrador?.firstName} ${administradorDialogData.administrador?.lastName}`
                : `Ver clínica: ${administradorDialogData.administrador?.firstName} ${administradorDialogData.administrador?.lastName}`}
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
                      value={administradorDialogData.administrador.firstName}
                      onChange={(e) =>
                        setAdministradorDialogData({
                          ...administradorDialogData,
                          administrador: {
                            ...administradorDialogData.administrador,
                            firstName: e.target.value,
                          },
                        })
                      }
                      disabled={!administradorDialogData.isEditar}
                      fullWidth
                    />
                    <TextField
                      color="primary"
                      variant="outlined"
                      margin="dense"
                      label="Apellidos"
                      value={administradorDialogData.administrador.lastName}
                      onChange={(e) =>
                        setAdministradorDialogData({
                          ...administradorDialogData,
                          administrador: {
                            ...administradorDialogData.administrador,
                            lastName: e.target.value,
                          },
                        })
                      }
                      disabled={!administradorDialogData.isEditar}
                      fullWidth
                    />
                    <TextField
                      color="primary"
                      variant="outlined"
                      margin="dense"
                      label="Email"
                      value={administradorDialogData.administrador.email}
                      onChange={(e) =>
                        setAdministradorDialogData({
                          ...administradorDialogData,
                          administrador: {
                            ...administradorDialogData.administrador,
                            email: e.target.value,
                          },
                        })
                      }
                      disabled={!administradorDialogData.isEditar}
                      fullWidth
                    />
                    <TextField
                      color="primary"
                      variant="outlined"
                      margin="dense"
                      label="Fecha de nacimiento"
                      type="date"
                      value={administradorDialogData.administrador.birthDate}
                      onChange={(e) => {
                        const bDate = new Date(e.target.value);
                        setAdministradorDialogData({
                          ...administradorDialogData,
                          administrador: {
                            ...administradorDialogData.administrador,
                            birthDate: bDate.toISOString(),
                          },
                        });
                      }}
                      InputLabelProps={{ shrink: true }}
                      disabled={!administradorDialogData.isEditar}
                      fullWidth
                    />
                    <TextField
                      color="primary"
                      variant="outlined"
                      margin="dense"
                      label="DNI"
                      value={administradorDialogData.administrador.dni}
                      onChange={(e) =>
                        setAdministradorDialogData({
                          ...administradorDialogData,
                          administrador: {
                            ...administradorDialogData.administrador,
                            dni: e.target.value,
                          },
                        })
                      }
                      disabled={!administradorDialogData.isEditar}
                      fullWidth
                    />
                    <TextField
                      select
                      color="primary"
                      variant="outlined"
                      margin="dense"
                      label="Género"
                      value={administradorDialogData.administrador.gender}
                      onChange={(e) =>
                        setAdministradorDialogData({
                          ...administradorDialogData,
                          administrador: {
                            ...administradorDialogData.administrador,
                            gender: e.target.value,
                          },
                        })
                      }
                      disabled={!administradorDialogData.isEditar}
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
                      value={administradorDialogData.administrador.cellPhone}
                      onChange={(e) =>
                        setAdministradorDialogData({
                          ...administradorDialogData,
                          administrador: {
                            ...administradorDialogData.administrador,
                            cellPhone: e.target.value,
                          },
                        })
                      }
                      disabled={!administradorDialogData.isEditar}
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
                      value={administradorDialogData.administrador.address}
                      onChange={(e) =>
                        setAdministradorDialogData({
                          ...administradorDialogData,
                          administrador: {
                            ...administradorDialogData.administrador,
                            address: e.target.value,
                          },
                        })
                      }
                      disabled={!administradorDialogData.isEditar}
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
                        setAdministradorDialogData({
                          ...administradorDialogData,
                          administrador: {
                            ...administradorDialogData.administrador,
                            ubigeo: "",
                          },
                        });
                        setIdDepartamento(e.target.value);
                      }}
                      disabled={
                        departamentos.length < 1 ||
                        !administradorDialogData.isEditar
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
                        setAdministradorDialogData({
                          ...administradorDialogData,
                          administrador: {
                            ...administradorDialogData.administrador,
                            ubigeo: "",
                          },
                        });
                        setIdProvincia(e.target.value);
                      }}
                      disabled={
                        (idDepartamento === "" && provincias.length < 1) ||
                        !administradorDialogData.isEditar
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
                      value={administradorDialogData.administrador.ubigeo}
                      onChange={(e) =>
                        setAdministradorDialogData({
                          ...administradorDialogData,
                          administrador: {
                            ...administradorDialogData.administrador,
                            ubigeo: e.target.value,
                          },
                        })
                      }
                      disabled={
                        (idProvincia === "" && distritos.length < 1) ||
                        !administradorDialogData.isEditar
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
                    <Typography variant="subtitle1">Clínica</Typography>
                    <Divider style={{ marginBottom: 10 }} />
                    <TextField
                      select
                      color="primary"
                      variant="outlined"
                      margin="dense"
                      label="Clínica"
                      value={administradorDialogData.administrador.clinic.id}
                      onChange={(e) =>
                        setAdministradorDialogData({
                          ...administradorDialogData,
                          administrador: {
                            ...administradorDialogData.administrador,
                            clinic: { id: e.target.value },
                          },
                        })
                      }
                      disabled={
                        clinicas.length < 1 || !administradorDialogData.isEditar
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
                  setAdministradorDialogData({
                    ...administradorDialogData,
                    open: false,
                  });
                }}
              >
                {administradorDialogData.isEditar ? "CANCELAR" : "CERRAR"}
              </Button>
              {administradorDialogData.isEditar && (
                <Button
                  color="primary"
                  onClick={() => {
                    if (
                      !administradorDialogData.administrador.firstName ||
                      !administradorDialogData.administrador.lastName ||
                      !administradorDialogData.administrador.email ||
                      !administradorDialogData.administrador.birthDate ||
                      !administradorDialogData.administrador.dni ||
                      administradorDialogData.administrador.dni.length !== 8 ||
                      !/^\d+$/.test(administradorDialogData.administrador.dni) ||
                      !administradorDialogData.administrador.cellPhone ||
                      !administradorDialogData.administrador.address ||
                      !administradorDialogData.administrador.ubigeo ||
                      !administradorDialogData.administrador.clinic.id
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
                      ReactSwal.fire({
                        icon: "info",
                        title: "Por favor, espere...",
                      });
                      ReactSwal.showLoading();
                      DataService.updateAdministrador(
                        administradorDialogData.administrador
                      )
                        .then(() => {
                          DataService.getAdministradores().then((data) => {
                            setAdministradores(data.data);
                            setCount(data.count);
                            setPage(1);
                            setFilter("");
                            setAdministradorDialogData({
                              ...administradorDialogData,
                              open: false,
                            });
                          });
                          ReactSwal.close();
                        })
                        .catch((error) => {
                          let errs = [];
                          for (const key in error.response.data.errors)
                            errs.push(key);
                          ReactSwal.fire({
                            icon: "error",
                            title: "Error al guardar datos",
                            text: `${error.response.data.message}: ${errs.join(
                              ", "
                            )}`,
                          });
                        });
                    }
                  }}
                >
                  Guardar
                </Button>
              )}
            </DialogActions>
          </Dialog>
        </div>
      </Route>
      <Route path={`${path}/crear`} component={AdministradorCrear} />
    </Switch>
  );
}
