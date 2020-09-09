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
import PeopleIcon from "@material-ui/icons/People";
import NotificationsIcon from "@material-ui/icons/Notifications";
import ContactlessIcon from "@material-ui/icons/Contactless";
import HelpIcon from "@material-ui/icons/Help";
// import Clinicas from "./Clinicas";
// import Contactenos from "./Contactenos";
import Ayuda from "./Ayuda";
import { BrowserRouter, Route, Switch } from "react-router-dom";
import user from "./img/user.jpg";

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

export default function Main() {
  const classes = useStyles();
  const [drawerOpen, setDrawerOpen] = React.useState(true);
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
      <BrowserRouter>
        <Drawer
          open={drawerOpen}
          className={classes.drawer}
          classes={{ paper: classes.drawerPaper }}
          variant="persistent"
          anchor="left"
        >
          <div className={classes.userInfo}>
            <img
              src={user}
              alt="user"
              style={{
                width: drawerWidth * 0.5,
                borderRadius: 100,
                alignSelf: "center",
                margin: "0px 0px 10px 0px",
              }}
            />
            <Typography variant="subtitle2">Bienvenido(a),</Typography>
            <Typography variant="h6">Edgar Mendoza Cerna</Typography>
            <Button
              style={{ margin: "10px 0px 0px 0px" }}
              color="primary"
              variant="contained"
              fullWidth
            >
              Cerrar sesión
            </Button>
          </div>
          <Divider />
          <List>
            <ListItem key="clinicas" button>
              <ListItemIcon>
                <LocalHospitalIcon />
              </ListItemIcon>
              <ListItemText primary="Clínicas" />
            </ListItem>
            <ListItem key="pacientes" button>
              <ListItemIcon>
                <PeopleIcon />
              </ListItemIcon>
              <ListItemText primary="Pacientes" />
            </ListItem>
            <ListItem key="notificaciones" button>
              <ListItemIcon>
                <NotificationsIcon />
              </ListItemIcon>
              <ListItemText primary="Notificaciones" />
            </ListItem>
            <ListItem key="contactenos" button>
              <ListItemIcon>
                <ContactlessIcon />
              </ListItemIcon>
              <ListItemText primary="Contáctenos" />
            </ListItem>
            <ListItem key="ayuda" button>
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
            <Route path="/">
              <Ayuda />
            </Route>
          </Switch>
        </main>
      </BrowserRouter>
    </div>
  );
}
