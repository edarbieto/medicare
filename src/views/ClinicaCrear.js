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

export default function ClinicaCrear() {
  const history = useHistory();
  const [clinica, setClinica] = React.useState({
    address: "",
    bannerUrl: "",
    businessName: "",
    commercialName: "",
    contactCellphone: "",
    contactEmail: "",
    contactName: "",
    contactPhone: "",
  });
  return (
    <div>
      <Typography variant="h4">Nueva clínica</Typography>
      <Typography variant="subtitle2" gutterBottom>
        Registrar clínica
      </Typography>
      <Divider />
      <Grid container>
        <Grid item xs={12}>
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
            >
              Guardar
            </Button>
          </Grid>
        </Grid>
        <Grid item xs={12} sm={6} md={4}>
          <div style={{ margin: 10 }}>
            <Typography variant="subtitle1">Información general</Typography>
            <Divider style={{ marginBottom: 10 }} />
            <TextField
              color="primary"
              variant="outlined"
              margin="dense"
              label="RUC"
              fullWidth
            />
            <TextField
              color="primary"
              variant="outlined"
              margin="dense"
              label="Razón social"
              fullWidth
            />
            <TextField
              color="primary"
              variant="outlined"
              margin="dense"
              label="Nombre comercial"
              fullWidth
            />
          </div>
          <div style={{ margin: 10 }}>
            <Typography variant="subtitle1">Logo</Typography>
            <Divider />
          </div>
          <div style={{ margin: 10 }}>
            <Typography variant="subtitle1">Banner</Typography>
            <Divider />
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
              fullWidth
            />
            <TextField
              select
              color="primary"
              variant="outlined"
              margin="dense"
              label="Departamento"
              fullWidth
            >
              <MenuItem value="Lima">Lima</MenuItem>
            </TextField>
            <TextField
              select
              color="primary"
              variant="outlined"
              margin="dense"
              label="Provincias"
              fullWidth
            >
              <MenuItem value="Lima">Lima</MenuItem>
            </TextField>
            <TextField
              select
              color="primary"
              variant="outlined"
              margin="dense"
              label="Distrito"
              fullWidth
            >
              <MenuItem value="Lima">Lima</MenuItem>
            </TextField>
          </div>
        </Grid>
        <Grid item xs={12} sm={6} md={4}>
          <div style={{ margin: 10 }}>
            <Typography variant="subtitle1">Información de contacto</Typography>
            <Divider style={{ marginBottom: 10 }} />
            <TextField
              color="primary"
              variant="outlined"
              margin="dense"
              label="Horario"
              fullWidth
            />
            <TextField
              color="primary"
              variant="outlined"
              margin="dense"
              label="Nombre de contacto"
              fullWidth
            />
            <TextField
              color="primary"
              variant="outlined"
              margin="dense"
              label="Email de contacto"
              fullWidth
            />
            <TextField
              color="primary"
              variant="outlined"
              margin="dense"
              label="Teléfono fijo"
              fullWidth
            />
            <TextField
              color="primary"
              variant="outlined"
              margin="dense"
              label="Celular"
              fullWidth
            />
          </div>
          <div style={{ margin: 10 }}>
            <Typography variant="subtitle1">Información de contacto</Typography>
            <Divider style={{ marginBottom: 10 }} />
            <TextField
              color="primary"
              variant="outlined"
              margin="dense"
              label="Contraseña"
              type="password"
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
        </Grid>
      </Grid>
    </div>
  );
}
