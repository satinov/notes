import { makeStyles, Tab } from "@material-ui/core";
import Grid from "@material-ui/core/Grid";
import { AppTabs, TabPanel } from "../../../components/AppTabs";
import { LoginForm } from "./LoginForm";
import { RegisterForm } from "./RegisterForm";

const useStyles = makeStyles((theme) => ({
  form: {
    display: "flex",
    flexDirection: "column",
    justifyContent: "center",
    // alignItems: "center",
    padding: theme.spacing(2),
    "& > .MuiAlert-root ": {
      marginBottom: theme.spacing(1),
    },
    "& .MuiTextField-root": {
      marginBottom: theme.spacing(1),
      width: "100%",
    },
    "& .MuiButtonBase-root": {
      // margin: theme.spacing(2),
    },
  },
}));

export const AuthPage = () => {
  const classes = useStyles();

  return (
    <Grid container justify="center">
      <Grid item xs={12} lg={3}>
        <AppTabs
          tabs={
            <>
              <Tab label="Войти" />
              <Tab label="Регистрация" />
            </>
          }
        >
          <TabPanel>
            <LoginForm className={classes.form} />
          </TabPanel>
          <TabPanel>
            <RegisterForm className={classes.form} />
          </TabPanel>
        </AppTabs>
      </Grid>
    </Grid>
  );
};
