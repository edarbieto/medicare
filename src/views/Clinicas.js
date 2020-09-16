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
import ClinicaCrear from "./ClinicaCrear";

export default function Clinicas(props) {
  const history = useHistory();
  const { path, url } = useRouteMatch();
  const [clinicas, setClinicas] = React.useState([]);
  const [clinicaDialogData, setClinicaDialogData] = React.useState({
    open: false,
    isEditar: false,
    clinica: {
      address: "",
      bannerUrl: "",
      businessName: "",
      commercialName: "",
      contactCellphone: "",
      contactEmail: "",
      contactName: "",
      contactPhone: "",
      description: null,
      logoUrl: "",
      ruc: "",
      ubigeo: "",
    },
  });
  const [departamentos, setDepartamentos] = React.useState([]);
  const [provincias, setProvincias] = React.useState([]);
  const [distritos, setDistritos] = React.useState([]);
  const [idDepartamento, setIdDepartamento] = React.useState("");
  const [idProvincia, setIdProvincia] = React.useState("");
  React.useEffect(() => {
    let mounted = true;
    DataService.getClinicas().then((data) => {
      if (mounted) setClinicas(data);
    });
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
  }, [props.history.action, departamentos.length, idDepartamento, idProvincia]);
  return (
    <Switch>
      <Route exact path={`${path}`}>
        <div>
          <Typography variant="h4">Clínicas</Typography>
          <Typography variant="subtitle2" gutterBottom>
            Lista de clínicas
          </Typography>
          <Divider />
          <Grid
            container
            alignItems="center"
            justify="space-between"
            style={{ margin: "20px 0px" }}
          >
            <TextField
              label="Filtro por razón social"
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
                  <TableCell>Nombre comercial</TableCell>
                  <TableCell>Razón social</TableCell>
                  <TableCell>RUC</TableCell>
                  <TableCell>Acciones</TableCell>
                </TableRow>
              </TableHead>
              <TableBody>
                {clinicas.map((clinica, index) => (
                  <TableRow key={clinica.id}>
                    <TableCell>{clinica.businessName}</TableCell>
                    <TableCell>{clinica.commercialName}</TableCell>
                    <TableCell>{clinica.ruc}</TableCell>
                    <TableCell>
                      <IconButton
                        onClick={() => {
                          setClinicaDialogData({
                            ...clinicaDialogData,
                            open: true,
                            isEditar: true,
                            clinica: clinica,
                          });
                        }}
                      >
                        <EditIcon fontSize="small" />
                      </IconButton>
                      <IconButton
                        onClick={() => {
                          setClinicaDialogData({
                            ...clinicaDialogData,
                            open: true,
                            isEditar: false,
                            clinica: clinica,
                          });
                        }}
                      >
                        <VisibilityIcon fontSize="small" />
                      </IconButton>
                      <IconButton
                        onClick={() => {
                          DataService.deleteClinica(clinica.id).then(() => {
                            DataService.getClinicas().then((data) =>
                              setClinicas(data)
                            );
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
          </TableContainer>
          <Dialog
            maxWidth="lg"
            open={clinicaDialogData.open}
            onClose={() =>
              setClinicaDialogData({ ...clinicaDialogData, open: false })
            }
            fullWidth
          >
            <DialogTitle>
              {clinicaDialogData.isEditar
                ? `Editar clínica: ${clinicaDialogData.clinica?.commercialName}`
                : `Ver clínica: ${clinicaDialogData.clinica?.commercialName}`}
            </DialogTitle>
            <DialogContent>
              <Grid container>
                <Grid item xs={12} sm={6} md={4}>
                  <div style={{ margin: 10 }}>
                    <Typography variant="subtitle1">
                      Información general
                    </Typography>
                    <Divider style={{ marginBottom: 10 }} />
                    <TextField
                      color="primary"
                      variant="outlined"
                      margin="dense"
                      label="RUC"
                      value={clinicaDialogData.clinica.ruc}
                      onChange={(e) => {
                        setClinicaDialogData({
                          ...clinicaDialogData,
                          clinica: {
                            ...clinicaDialogData.clinica,
                            ruc: e.target.value,
                          },
                        });
                      }}
                      disabled={!clinicaDialogData.isEditar}
                      fullWidth
                    />
                    <TextField
                      color="primary"
                      variant="outlined"
                      margin="dense"
                      label="Razón social"
                      value={clinicaDialogData.clinica.businessName}
                      onChange={(e) => {
                        setClinicaDialogData({
                          ...clinicaDialogData,
                          clinica: {
                            ...clinicaDialogData.clinica,
                            businessName: e.target.value,
                          },
                        });
                      }}
                      disabled={!clinicaDialogData.isEditar}
                      fullWidth
                    />
                    <TextField
                      color="primary"
                      variant="outlined"
                      margin="dense"
                      label="Nombre comercial"
                      value={clinicaDialogData.clinica.commercialName}
                      onChange={(e) => {
                        setClinicaDialogData({
                          ...clinicaDialogData,
                          clinica: {
                            ...clinicaDialogData.clinica,
                            commercialName: e.target.value,
                          },
                        });
                      }}
                      disabled={!clinicaDialogData.isEditar}
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
                      value={clinicaDialogData.clinica.address}
                      onChange={(e) => {
                        setClinicaDialogData({
                          ...clinicaDialogData,
                          clinica: {
                            ...clinicaDialogData.clinica,
                            address: e.target.value,
                          },
                        });
                      }}
                      disabled={!clinicaDialogData.isEditar}
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
                        setClinicaDialogData({
                          ...clinicaDialogData,
                          clinica: { ...clinicaDialogData.clinica, ubigeo: "" },
                        });
                        setIdDepartamento(e.target.value);
                      }}
                      disabled={
                        departamentos.length < 1 || !clinicaDialogData.isEditar
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
                        setClinicaDialogData({
                          ...clinicaDialogData,
                          clinica: { ...clinicaDialogData.clinica, ubigeo: "" },
                        });
                        setIdProvincia(e.target.value);
                      }}
                      disabled={
                        (idDepartamento === "" && provincias.length < 1) ||
                        !clinicaDialogData.isEditar
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
                      value={clinicaDialogData.clinica.ubigeo}
                      onChange={(e) =>
                        setClinicaDialogData({
                          ...clinicaDialogData,
                          clinica: {
                            ...clinicaDialogData.clinica,
                            ubigeo: e.target.value,
                          },
                        })
                      }
                      disabled={
                        (idProvincia === "" && distritos.length < 1) ||
                        !clinicaDialogData.isEditar
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
                </Grid>
                <Grid item xs={12} sm={6} md={4}>
                  <div style={{ margin: 10 }}>
                    <Typography variant="subtitle1">
                      Información de contacto
                    </Typography>
                    <Divider style={{ marginBottom: 10 }} />
                    <TextField
                      color="primary"
                      variant="outlined"
                      margin="dense"
                      label="Nombre de contacto"
                      value={clinicaDialogData.clinica.contactName}
                      onChange={(e) => {
                        setClinicaDialogData({
                          ...clinicaDialogData,
                          clinica: {
                            ...clinicaDialogData.clinica,
                            contactName: e.target.value,
                          },
                        });
                      }}
                      disabled={!clinicaDialogData.isEditar}
                      fullWidth
                    />
                    <TextField
                      color="primary"
                      variant="outlined"
                      margin="dense"
                      label="Email de contacto"
                      value={clinicaDialogData.clinica.contactEmail}
                      onChange={(e) => {
                        setClinicaDialogData({
                          ...clinicaDialogData,
                          clinica: {
                            ...clinicaDialogData.clinica,
                            contactEmail: e.target.value,
                          },
                        });
                      }}
                      disabled={!clinicaDialogData.isEditar}
                      fullWidth
                    />
                    <TextField
                      color="primary"
                      variant="outlined"
                      margin="dense"
                      label="Teléfono fijo"
                      value={clinicaDialogData.clinica.contactPhone}
                      onChange={(e) => {
                        setClinicaDialogData({
                          ...clinicaDialogData,
                          clinica: {
                            ...clinicaDialogData.clinica,
                            contactPhone: e.target.value,
                          },
                        });
                      }}
                      disabled={!clinicaDialogData.isEditar}
                      fullWidth
                    />
                    <TextField
                      color="primary"
                      variant="outlined"
                      margin="dense"
                      label="Celular"
                      value={clinicaDialogData.clinica.contactCellphone}
                      onChange={(e) => {
                        setClinicaDialogData({
                          ...clinicaDialogData,
                          clinica: {
                            ...clinicaDialogData.clinica,
                            contactCellphone: e.target.value,
                          },
                        });
                      }}
                      disabled={!clinicaDialogData.isEditar}
                      fullWidth
                    />
                  </div>
                </Grid>
              </Grid>
            </DialogContent>
            <DialogActions>
              <Button
                color="primary"
                onClick={() => {
                  setClinicaDialogData({ ...clinicaDialogData, open: false });
                }}
              >
                {clinicaDialogData.isEditar ? "CANCELAR" : "CERRAR"}
              </Button>
              {clinicaDialogData.isEditar && (
                <Button
                  color="primary"
                  onClick={() => {
                    setClinicaDialogData({
                      ...clinicaDialogData,
                      clinica: {
                        ...clinicaDialogData.clinica,
                        email: clinicaDialogData.clinica.contactEmail,
                      },
                    });
                    console.log(clinicaDialogData.clinica);
                    DataService.updateClinica(clinicaDialogData.clinica).then(
                      () =>
                        DataService.getClinicas().then((data) => {
                          setClinicas(data);
                          setClinicaDialogData({
                            ...clinicaDialogData,
                            open: false,
                          });
                        })
                    );
                  }}
                >
                  Guardar
                </Button>
              )}
            </DialogActions>
          </Dialog>
        </div>
      </Route>
      <Route path={`${path}/crear`} component={ClinicaCrear} />
    </Switch>
  );
}
