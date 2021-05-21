import { makeStyles, Theme, createStyles } from "@material-ui/core/styles";
import Card from "@material-ui/core/Card";
import CardHeader from "@material-ui/core/CardHeader";
import CardContent from "@material-ui/core/CardContent";
import Typography from "@material-ui/core/Typography";
import { Note } from "../types";
import { Link, useHistory } from "react-router-dom";
import { Chip } from "@material-ui/core";
import PersonIcon from "@material-ui/icons/Person";
import { useAuth } from "../../auth/hooks/useAuth";
import { truncate } from "../../../utils/truncate";

interface Props {
  note: Note;
  isOwner: boolean;
}

const useStyles = makeStyles((theme: Theme) =>
  createStyles({
    root: {
      width: "100%",
      cursor: "pointer",
      height: "100%",
    },
    content: {
      paddingTop: 0,
    },
    author: {},
  })
);

export const NoteListItem = ({ note, isOwner }: Props) => {
  const classes = useStyles();
  const history = useHistory();

  return (
    <Card
      className={classes.root}
      onClick={() => history.push(`/notes/${note.id}`)}
    >
      <CardHeader
        title={note.title}
        subheader={new Date(note.createdAt).toLocaleDateString("ru")}
      />

      <CardContent className={classes.content}>
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
          style={{ marginBottom: 16 }}
        />
        <Typography variant="body2" color="textSecondary" component="p">
          {truncate(
            note.text.replace(/(<([^>]+)>)/gi, " ").replace(/&nbsp;/gi, " "),
            100
          )}
        </Typography>
      </CardContent>
    </Card>
  );
};
