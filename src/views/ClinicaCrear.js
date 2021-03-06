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

export default function ClinicaCrear() {
  const history = useHistory();
  const [clinica, setClinica] = React.useState({
    address: "",
    bannerUrl: "",
    businessName: "",
    commercialName: "",
    contactCellphone: "",
    email: "",
    contactName: "",
    contactPhone: "",
    description: null,
    logoUrl: "",
    ruc: "",
    ubigeo: "",
  });
  const [departamentos, setDepartamentos] = React.useState([]);
  const [provincias, setProvincias] = React.useState([]);
  const [distritos, setDistritos] = React.useState([]);
  const [idDepartamento, setIdDepartamento] = React.useState("");
  const [idProvincia, setIdProvincia] = React.useState("");
  React.useEffect(() => {
    let mounted = true;
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
  }, [departamentos.length, idDepartamento, idProvincia]);
  return (
    <div>
      <Typography variant="h4">Nueva clínica</Typography>
      <Typography variant="subtitle2" gutterBottom>
        Registrar clínica
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
              !clinica.ruc ||
              clinica.ruc.length !== 11 ||
              !clinica.businessName ||
              !clinica.commercialName ||
              !clinica.address ||
              !clinica.ubigeo ||
              !clinica.contactName ||
              !clinica.email ||
              !clinica.contactPhone ||
              !clinica.contactCellphone
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
              DataService.postClinica(clinica)
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
              label="RUC"
              value={clinica.ruc}
              onChange={(e) => setClinica({ ...clinica, ruc: e.target.value })}
              fullWidth
            />
            <TextField
              required
              color="primary"
              variant="outlined"
              margin="dense"
              label="Razón social"
              value={clinica.businessName}
              onChange={(e) =>
                setClinica({ ...clinica, businessName: e.target.value })
              }
              fullWidth
            />
            <TextField
              required
              color="primary"
              variant="outlined"
              margin="dense"
              label="Nombre comercial"
              value={clinica.commercialName}
              onChange={(e) =>
                setClinica({ ...clinica, commercialName: e.target.value })
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
              value={clinica.address}
              onChange={(e) =>
                setClinica({ ...clinica, address: e.target.value })
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
                setClinica({ ...clinica, ubigeo: "" });
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
                setClinica({ ...clinica, ubigeo: "" });
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
              value={clinica.ubigeo}
              onChange={(e) =>
                setClinica({ ...clinica, ubigeo: e.target.value })
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
        </Grid>
        <Grid item xs={12} sm={6} md={4}>
          <div style={{ margin: 10 }}>
            <Typography variant="subtitle1">Información de contacto</Typography>
            <Divider style={{ marginBottom: 10 }} />
            <TextField
              required
              color="primary"
              variant="outlined"
              margin="dense"
              label="Nombre de contacto"
              value={clinica.contactName}
              onChange={(e) =>
                setClinica({ ...clinica, contactName: e.target.value })
              }
              fullWidth
            />
            <TextField
              required
              color="primary"
              variant="outlined"
              margin="dense"
              label="Email de contacto"
              value={clinica.email}
              onChange={(e) =>
                setClinica({ ...clinica, email: e.target.value })
              }
              fullWidth
            />
            <TextField
              required
              color="primary"
              variant="outlined"
              margin="dense"
              label="Teléfono fijo"
              value={clinica.contactPhone}
              onChange={(e) =>
                setClinica({ ...clinica, contactPhone: e.target.value })
              }
              fullWidth
            />
            <TextField
              required
              color="primary"
              variant="outlined"
              margin="dense"
              label="Celular"
              value={clinica.contactCellphone}
              onChange={(e) =>
                setClinica({ ...clinica, contactCellphone: e.target.value })
              }
              fullWidth
            />
          </div>
        </Grid>
      </Grid>
    </div>
  );
}
