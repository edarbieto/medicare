import React from "react";
import clsx from "clsx";
import {
  AppBar,
  Toolbar,
  IconButton,
  Typography,
  makeStyles,
  Drawer,
  List,
  ListItem,
  ListItemText,
  ListItemIcon,
  Divider,
  Button,
  CssBaseline,
} from "@material-ui/core";
import MenuIcon from "@material-ui/icons/Menu";
import LocalHospitalIcon from "@material-ui/icons/LocalHospital";
import AssignmentIndIcon from "@material-ui/icons/AssignmentInd";
import PeopleIcon from "@material-ui/icons/People";
import NotificationsIcon from "@material-ui/icons/Notifications";
import ContactlessIcon from "@material-ui/icons/Contactless";
import HelpIcon from "@material-ui/icons/Help";
import Clinicas from "./Clinicas";
import Contactenos from "./Contactenos";
import Ayuda from "./Ayuda";
import {
  Route,
  Switch,
  useHistory,
  useRouteMatch,
  Redirect,
} from "react-router-dom";
import UserPhoto from "../img/user.jpg";
import Pacientes from "./Pacientes";
import Notificaciones from "./Notificaciones";
import Administradores from "./Administradores";
import AuthService from "../services/AuthService";

const drawerWidth = 300;

const useStyles = makeStyles((theme) => ({
  root: {
    display: "flex",
  },
  menuButton: {
    marginRight: theme.spacing(2),
  },
  appBar: {
    transition: theme.transitions.create(["margin", "width"], {
      easing: theme.transitions.easing.sharp,
      duration: theme.transitions.duration.leavingScreen,
    }),
  },
  appBarShift: {
    width: `calc(100% - ${drawerWidth}px)`,
    marginLeft: drawerWidth,
    transition: theme.transitions.create(["margin", "width"], {
      easing: theme.transitions.easing.easeOut,
      duration: theme.transitions.duration.enteringScreen,
    }),
  },
  content: {
    flexGrow: 1,
    padding: theme.spacing(3),
    transition: theme.transitions.create("margin", {
      easing: theme.transitions.easing.sharp,
      duration: theme.transitions.duration.leavingScreen,
    }),
    marginLeft: -drawerWidth,
  },
  contentShift: {
    transition: theme.transitions.create("margin", {
      easing: theme.transitions.easing.easeOut,
      duration: theme.transitions.duration.enteringScreen,
    }),
    marginLeft: 0,
  },
  drawer: {
    width: drawerWidth,
    flexShrink: 0,
  },
  drawerPaper: {
    width: drawerWidth,
  },
  drawerHeader: {
    display: "flex",
    alignItems: "center",
    padding: theme.spacing(0, 1),
    // necessary for content to be below app bar
    ...theme.mixins.toolbar,
    justifyContent: "flex-end",
  },
  userInfo: {
    margin: theme.spacing(3),
    display: "flex",
    flexDirection: "column",
  },
}));

export default function Dashboard() {
  const classes = useStyles();
  const history = useHistory();
  const { path, url } = useRouteMatch();
  const [drawerOpen, setDrawerOpen] = React.useState(true);
  const user = AuthService.getUser().user;
  return (
    <div className={classes.root}>
      <CssBaseline />
      <AppBar
        className={clsx(classes.appBar, { [classes.appBarShift]: drawerOpen })}
        position="fixed"
      >
        <Toolbar>
          <IconButton
            className={classes.menuButton}
            edge="start"
            color="inherit"
            onClick={() => setDrawerOpen(!drawerOpen)}
          >
            <MenuIcon />
          </IconButton>
          <Typography variant="h6">Medicare</Typography>
        </Toolbar>
      </AppBar>
      <Drawer
        open={drawerOpen}
        className={classes.drawer}
        classes={{ paper: classes.drawerPaper }}
        variant="persistent"
        anchor="left"
      >
        <div className={classes.userInfo}>
          <img
            src={UserPhoto}
            alt="user"
            style={{
              width: drawerWidth * 0.5,
              borderRadius: 100,
              alignSelf: "center",
              margin: "0px 0px 10px 0px",
            }}
          />
          <Typography variant="subtitle2">Bienvenido(a),</Typography>
          <Typography variant="h6">{`${user.firstName} ${user.lastName}`}</Typography>
          <Button
            style={{ margin: "10px 0px 0px 0px" }}
            color="primary"
            variant="contained"
            onClick={() => {
              AuthService.logout();
              history.push("/login");
            }}
            fullWidth
          >
            Cerrar sesión
          </Button>
        </div>
        <Divider />
        <List>
          <ListItem
            key="clinicas"
            onClick={() => history.push(`${url}/clinicas`)}
            button
          >
            <ListItemIcon>
              <LocalHospitalIcon />
            </ListItemIcon>
            <ListItemText primary="Clínicas" />
          </ListItem>
          <ListItem
            key="administradores"
            onClick={() => history.push(`${url}/administradores`)}
            button
          >
            <ListItemIcon>
              <AssignmentIndIcon />
            </ListItemIcon>
            <ListItemText primary="Administradores" />
          </ListItem>
          <ListItem
            key="pacientes"
            onClick={() => history.push(`${url}/pacientes`)}
            button
          >
            <ListItemIcon>
              <PeopleIcon />
            </ListItemIcon>
            <ListItemText primary="Pacientes" />
          </ListItem>
          <ListItem
            key="notificaciones"
            onClick={() => history.push(`${url}/notificaciones`)}
            button
          >
            <ListItemIcon>
              <NotificationsIcon />
            </ListItemIcon>
            <ListItemText primary="Notificaciones" />
          </ListItem>
          <ListItem
            key="contactenos"
            onClick={() => history.push(`${url}/contactenos`)}
            button
          >
            <ListItemIcon>
              <ContactlessIcon />
            </ListItemIcon>
            <ListItemText primary="Contáctenos" />
          </ListItem>
          <ListItem
            key="ayuda"
            onClick={() => history.push(`${url}/ayuda`)}
            button
          >
            <ListItemIcon>
              <HelpIcon />
            </ListItemIcon>
            <ListItemText primary="Ayuda" />
          </ListItem>
        </List>
      </Drawer>
      <main
        className={clsx(classes.content, {
          [classes.contentShift]: drawerOpen,
        })}
      >
        <div className={classes.drawerHeader} />
        <Switch>
          <Route exact path={`${path}`}>
            <Redirect to={`${path}/clinicas`} />
          </Route>
          <Route path={`${path}/clinicas`} component={Clinicas} />
          <Route path={`${path}/administradores`} component={Administradores} />
          <Route path={`${path}/pacientes`} component={Pacientes} />
          <Route path={`${path}/notificaciones`} component={Notificaciones} />
          <Route path={`${path}/contactenos`} component={Contactenos} />
          <Route path={`${path}/ayuda`} component={Ayuda} />
        </Switch>
      </main>
    </div>
  );
}
