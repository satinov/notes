import React, { useEffect } from "react";
import { makeStyles, Theme, createStyles } from "@material-ui/core/styles";
import CssBaseline from "@material-ui/core/CssBaseline";

import { Header } from "./Header";
import { Main } from "./Main";
import { useAuth } from "../../features/auth/hooks/useAuth";
import { useRoutes } from "../../hooks/useRoutes";
import { getToken } from "../../features/auth/utils";
import { useDispatch } from "react-redux";
import { loginByToken } from "../../features/auth/authSlice";
import Navbar from "./NavBar";

const drawerWidth = 240;

const useStyles = makeStyles((theme: Theme) =>
  createStyles({
    root: {
      display: "flex",
      flexDirection: "column",
    },
    appBar: {
      overflowY: "hidden",
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
    menuButton: {
      marginRight: theme.spacing(2),
    },
    hide: {
      display: "none",
    },
    drawer: {
      width: drawerWidth,
      flexShrink: 0,
      position: "fixed",
      zIndex: 12,
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
    content: {
      flexGrow: 1,
      height: "calc(100vh - 56px - 56px)",
      padding: theme.spacing(3),
      paddingRight: theme.spacing(1) / 2,
      transition: theme.transitions.create("margin", {
        easing: theme.transitions.easing.sharp,
        duration: theme.transitions.duration.leavingScreen,
      }),
      overflowY: "scroll",
    },
    contentShift: {
      transition: theme.transitions.create("margin", {
        easing: theme.transitions.easing.easeOut,
        duration: theme.transitions.duration.enteringScreen,
      }),
      marginLeft: 0,
    },
  })
);

export default function PrimaryTemplate() {
  const classes = useStyles();

  const dispatch = useDispatch();

  const { isAuth, isInitLoginLoading, currentUser } = useAuth();

  useEffect(() => {
    const token = getToken();
    if (!isAuth && token) {
      const tryLoginByToken = async () => {
        dispatch(loginByToken());
      };
      tryLoginByToken();
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [dispatch]);

  const routes = useRoutes(isAuth);

  const [open, setOpen] = React.useState(true);

  const handleDrawerOpen = () => {
    setOpen(true);
  };

  const handleDrawerClose = () => {
    setOpen(false);
  };

  return (
    <div className={classes.root}>
      <CssBaseline />
      <Header
        classes={classes}
        open={open}
        handleDrawerClose={handleDrawerClose}
        handleDrawerOpen={handleDrawerOpen}
      />

      <Main classes={classes}>
        {!isInitLoginLoading ? routes : <h1>Загрузка...</h1>}
      </Main>
      <Navbar />
    </div>
  );
}
