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
    // ver | editar
    modo: "ver",
    clinica: null,
  });
  React.useEffect(() => {
    let mounted = true;
    DataService.getClinicas().then((data) => {
      if (mounted) setClinicas(data);
    });
    return () => {
      mounted = false;
    };
  }, [props.history.action]);
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
                            open: true,
                            modo: "editar",
                            clinica: clinica,
                          });
                        }}
                      >
                        <EditIcon fontSize="small" />
                      </IconButton>
                      <IconButton
                        onClick={() => {
                          setClinicaDialogData({
                            open: true,
                            modo: "ver",
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
              {clinicaDialogData.modo === "editar"
                ? `Editar clínica: ${clinicaDialogData.clinica?.commercialName}`
                : `Ver clínica: ${clinicaDialogData.clinica?.commercialName}`}
            </DialogTitle>
            <DialogContent></DialogContent>
            <DialogActions>
              <Button color="primary">Cancelar</Button>
              {clinicaDialogData.modo !== "ver" && (
                <Button color="primary">Guardar</Button>
              )}
            </DialogActions>
          </Dialog>
        </div>
      </Route>
      <Route path={`${path}/crear`} component={ClinicaCrear} />
    </Switch>
  );
}
