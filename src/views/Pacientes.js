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
  // Dialog,
  // DialogTitle,
  // DialogContent,
  // DialogActions,
} from "@material-ui/core";
import SearchIcon from "@material-ui/icons/Search";
import AddIcon from "@material-ui/icons/Add";
// import EditIcon from "@material-ui/icons/Edit";
// import VisibilityIcon from "@material-ui/icons/Visibility";
// import DeleteIcon from "@material-ui/icons/Delete";
// import DataService from "../services/DataService";
import { useHistory, useRouteMatch, Route, Switch } from "react-router-dom";
import PacienteCrear from "./PacienteCrear";

export default function Pacientes() {
  const history = useHistory();
  const { path, url } = useRouteMatch();
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
              <TableBody></TableBody>
            </Table>
          </TableContainer>
        </div>
      </Route>
      <Route path={`${path}/crear`} component={PacienteCrear} />
    </Switch>
  );
}
