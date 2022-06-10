import React, { useEffect } from "react";
import { makeStyles } from "@material-ui/core/styles";
import BottomNavigation from "@material-ui/core/BottomNavigation";
import BottomNavigationAction from "@material-ui/core/BottomNavigationAction";
import Grid from "@material-ui/core/Grid";
import List from "@material-ui/icons/List";
import ExitToAppIcon from "@material-ui/icons/ExitToApp";
import { Link, useLocation } from "react-router-dom";
import PublicIcon from "@material-ui/icons/Public";
import AddBoxIcon from "@material-ui/icons/AddBox";
import { useDispatch } from "react-redux";
import { logOut } from "../../features/auth/authSlice";

const useStyles = makeStyles({
  root: {},
});

const Navbar = () => {
  const classes = useStyles();
  const location = useLocation();
  const dispatch = useDispatch();

  const [value, setValue] = React.useState(location.pathname);
  useEffect(() => {
    if (value !== location.pathname) setValue(location.pathname);
  }, [location.pathname, value]);

  const logoutHandler = () => {
    dispatch(logOut());
  };

  return (
    <Grid
      container
      style={{ position: "fixed", bottom: "env(safe-area-inset-bottom, 0px)" }}
    >
      <Grid xs={12}>
        <BottomNavigation
          value={value}
          onChange={(event, newValue) => {
            setValue(newValue);
          }}
          showLabels
          className={classes.root}
        >
          <BottomNavigationAction
            component={Link}
            to="/my-notes"
            value="/my-notes"
            icon={<List />}
          />
          <BottomNavigationAction
            component={Link}
            to="/notes"
            value="/notes"
            icon={<PublicIcon />}
          />
          <BottomNavigationAction
            component={Link}
            to="/notes/add"
            value="/notes/add"
            icon={<AddBoxIcon />}
          />
          <BottomNavigationAction
            onClick={() => logoutHandler()}
            value="/signout"
            icon={<ExitToAppIcon />}
          />
        </BottomNavigation>
      </Grid>
    </Grid>
  );
};

export default Navbar;
