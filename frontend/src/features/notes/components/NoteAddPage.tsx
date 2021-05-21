import { makeStyles } from "@material-ui/core";
import Grid from "@material-ui/core/Grid";
import { useNoteDetails } from "../hooks/useNoteDetails";
import { NoteAddForm } from "./NoteAddForm";

const useStyles = makeStyles((theme) => ({
  form: {
    display: "flex",
    flexDirection: "column",
    justifyContent: "center",
    // alignItems: "center",
    "& > .MuiAlert-root ": {
      marginBottom: theme.spacing(1),
    },
    "& .MuiTextField-root": {
      marginBottom: theme.spacing(1),
      width: "100%",
    },
    "& .MuiButtonBase-root": {
      // margin: theme.spacing(2),
      width: "auto",
    },
  },
}));

interface Props {}

export const NoteAddPage = (props: Props) => {
  const classes = useStyles();
  const { isCreateLoading } = useNoteDetails();
  return (
    <Grid container justify="center">
      <Grid item xs={12} lg={8}>
        <NoteAddForm className={classes.form} isLoading={isCreateLoading} />
      </Grid>
    </Grid>
  );
};
