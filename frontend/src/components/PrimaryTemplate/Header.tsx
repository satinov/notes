import React, { FC } from "react";
import {
  fade,
  makeStyles,
  Theme,
  createStyles,
} from "@material-ui/core/styles";
import AppBar from "@material-ui/core/AppBar";
import Toolbar from "@material-ui/core/Toolbar";
import IconButton from "@material-ui/core/IconButton";
import Typography from "@material-ui/core/Typography";
import Badge from "@material-ui/core/Badge";
import MenuItem from "@material-ui/core/MenuItem";
import Menu from "@material-ui/core/Menu";
import MenuIcon from "@material-ui/icons/Menu";
import AccountCircle from "@material-ui/icons/AccountCircle";
import MailIcon from "@material-ui/icons/Mail";
import NotificationsIcon from "@material-ui/icons/Notifications";
import MoreIcon from "@material-ui/icons/MoreVert";
import { matchPath, useLocation } from "react-router";
import { Avatar } from "@material-ui/core";

type ClassesKeys =
  | "appBar"
  | "appBarShift"
  | "menuButton"
  | "hide"
  | "drawer"
  | "drawerPaper"
  | "drawerHeader";

interface Props {
  classes: Record<ClassesKeys, string>;
  open: boolean;
  handleDrawerOpen: () => void;
  handleDrawerClose: () => void;
}

const useStyles = makeStyles((theme: Theme) =>
  createStyles({
    grow: {
      flexGrow: 1,
      overflowY: "hidden",
    },
    menuButton: {
      marginRight: theme.spacing(2),
    },
    toolbar: { justifyContent: "center", position: "relative" },
    logo: {
      position: "absolute",
      left: 24,
    },
  })
);

const routeNamesMap = {
  "/my-notes": "Мои конспеты",
  "/notes": "Сеть конспектов",
  "/notes/:id": "Конспект",
  "/notes/:id/edit": "Редактирование Конспекта",
  "/users/:uresId/notes": "Конспекты",
  "/notes/add": "Добавить Конспект",
  "/auth": "Авторизация",
};

export const Header: FC<Props> = ({
  // classes,
  open,
  handleDrawerOpen,
  handleDrawerClose,
}) => {
  const classes = useStyles();
  const [anchorEl, setAnchorEl] = React.useState<null | HTMLElement>(null);
  const [mobileMoreAnchorEl, setMobileMoreAnchorEl] =
    React.useState<null | HTMLElement>(null);

  const isMenuOpen = Boolean(anchorEl);
  const isMobileMenuOpen = Boolean(mobileMoreAnchorEl);

  const { pathname } = useLocation();
  let key: keyof typeof routeNamesMap;
  let title: string = "JS-КОНСПЕКТ";
  (Object.keys(routeNamesMap) as Array<keyof typeof routeNamesMap>).forEach(
    (k) => {
      const element = routeNamesMap[k];
      const match = matchPath(k, pathname);
      console.log(match);

      if (match && match.isExact) title = element.toLocaleUpperCase();
    }
  );

  console.log(title);

  const handleProfileMenuOpen = (event: React.MouseEvent<HTMLElement>) => {
    setAnchorEl(event.currentTarget);
  };

  const handleMobileMenuClose = () => {
    setMobileMoreAnchorEl(null);
  };

  const handleMenuClose = () => {
    setAnchorEl(null);
    handleMobileMenuClose();
  };

  const handleMobileMenuOpen = (event: React.MouseEvent<HTMLElement>) => {
    setMobileMoreAnchorEl(event.currentTarget);
  };

  return (
    <div className={classes.grow}>
      <AppBar position="static">
        <Toolbar className={classes.toolbar}>
          <Avatar
            className={classes.logo}
            src="/240px-JavaScript-logo.png"
          ></Avatar>
          <Typography align="center" variant="h6" noWrap>
            {title}
          </Typography>
        </Toolbar>
      </AppBar>
    </div>
  );
};
