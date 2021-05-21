import { Chip, Grid, Typography } from "@material-ui/core";
import DeleteIcon from "@material-ui/icons/Delete";
import React, { useEffect } from "react";
import { useDispatch } from "react-redux";
import {
  RouteComponentProps,
  Route,
  Switch,
  useHistory,
  useLocation,
} from "react-router";
import { useNoteDetails } from "../hooks/useNoteDetails";
import { copy, getById, remove } from "../noteDetailsSlice";
import { Note } from "../types";
import PersonIcon from "@material-ui/icons/Person";
import { useAuth } from "../../auth/hooks/useAuth";
import Button from "@material-ui/core/Button";
import EditIcon from "@material-ui/icons/Edit";
import FileCopyIcon from "@material-ui/icons/FileCopy";
import ReactQuill from "react-quill"; // ES6
import { makeStyles, createStyles, Theme } from "@material-ui/core/styles";
import { NoteEditForm } from "./NoteEditForm";
interface Props extends RouteComponentProps<{ id: string }> {}

const NoteDetails = ({
  note,
  isLoading,
  error,
  isOwner,
  isDeleteLoading,
  deleteHandler,
  isCopyLoading,
  copyHandler,
}: {
  note?: Note;
  isLoading: boolean;
  error: string | null;
  isOwner: boolean;
  deleteHandler: () => void;
  isDeleteLoading: boolean;
  isCopyLoading: boolean;
  copyHandler: () => void;
}) => {
  const classes = useStyles();
  const history = useHistory();
  const location = useLocation();
  let content: React.ReactNode;

  if (isLoading) content = <h1>Loading...</h1>;

  if (error) content = <h1>{error}</h1>;

  if (note) {
    content = (
      <>
        <div className={classes.actions}>
          {isOwner ? (
            <>
              <Button
                variant="contained"
                color="primary"
                className={classes.button}
                onClick={() => history.push(`${location.pathname}/edit`)}
              >
                <EditIcon />
              </Button>
              <Button
                variant="contained"
                color="secondary"
                className={classes.button}
                onClick={deleteHandler}
                disabled={isDeleteLoading}
              >
                <DeleteIcon />
              </Button>
            </>
          ) : (
            <Button
              variant="contained"
              color="primary"
              className={classes.button}
              onClick={copyHandler}
              disabled={isCopyLoading}
            >
              <FileCopyIcon />
            </Button>
          )}
        </div>
        <Grid xs={12}>
          <Typography align="center" variant="h5" gutterBottom>
            {note.title}
          </Typography>
        </Grid>
        <Grid xs={12}>
          <Typography align="right" variant="subtitle1" gutterBottom>
            {new Date(note.createdAt).toLocaleDateString("ru")}
          </Typography>
        </Grid>
        <Grid xs={12}>
          <Chip
            icon={<PersonIcon />}
            label={isOwner ? "Вы" : note.user.name}
            clickable={!isOwner}
            color="primary"
            onClick={(e) => {
              e.stopPropagation();
              if (isOwner) return;
              history.push(`/users/${note.user.id}/notes`);
            }}
            style={{ marginBottom: 16, float: "right" }}
          />
        </Grid>

        <Grid xs={12}>
          <Typography align="justify" variant="body1" gutterBottom>
            <ReactQuill value={note.text} readOnly={true} theme={"bubble"} />
          </Typography>
        </Grid>
      </>
    );
  }

  return <>{content}</>;
};

const EditNoteDetails = ({
  note,
  isLoading,
  error,
  isOwner,
}: {
  note?: Note;
  isLoading: boolean;
  error: string | null;
  isOwner: boolean;
}) => {
  console.log("edit");

  const classes = useStyles();
  const history = useHistory();

  let content: React.ReactNode;

  if (isLoading) content = <h1>Loading...</h1>;

  if (error) content = <h1>{error}</h1>;

  if (note) {
    content = (
      <Grid container justify="center">
        <Grid item xs={12} lg={8}>
          <NoteEditForm note={note} className={classes.form} />
        </Grid>
      </Grid>
    );
  }

  return <>{content}</>;
};

const useStyles = makeStyles((theme: Theme) =>
  createStyles({
    actions: {
      width: "100%",
      display: "flex",
    },
    button: {
      marginBottom: theme.spacing(1),
      flexGrow: 1,
      textAlign: "center",
    },
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
  })
);

export const NoteDetailsPage = (props: Props) => {
  const classes = useStyles();
  const dispatch = useDispatch();
  const history = useHistory();
  const {
    isReadLoading,
    readError,
    details,
    isUpdateLoading,
    updateError,
    isDeleteLoading,
    deleteError,
    isCopyLoading,
    copyError,
  } = useNoteDetails();
  const { currentUser } = useAuth();
  const id = props.match.params.id;

  useEffect(() => {
    dispatch(getById(id));
  }, []);

  const deleteHandler = async () => {
    if (details) {
      try {
        await dispatch(remove(details.id));
        history.push("/my-notes");
      } catch (error) {}
    }
  };

  const copyHandler = async () => {
    if (details) {
      try {
        await dispatch(copy(details.id));
        history.push("/my-notes");
      } catch (error) {}
    }
  };

  return (
    <>
      <Grid container>
        <Switch>
          <Route exact path={`${props.match.url}/edit`}>
            <EditNoteDetails
              isLoading={isUpdateLoading}
              error={updateError}
              note={details}
              isOwner={currentUser.id === details?.user.id}
            />
          </Route>
          <Route exact path={props.match.url}>
            <NoteDetails
              isCopyLoading={isCopyLoading}
              copyHandler={() => copyHandler()}
              deleteHandler={() => deleteHandler()}
              isDeleteLoading={isDeleteLoading}
              isLoading={isReadLoading}
              error={readError}
              note={details}
              isOwner={currentUser.id === details?.user.id}
            />
          </Route>
        </Switch>
      </Grid>
    </>
  );
};
