import React, { useEffect, useState } from "react";
import { fade, makeStyles } from "@material-ui/core";
import Grid from "@material-ui/core/Grid";
import InputBase from "@material-ui/core/InputBase";
import SearchIcon from "@material-ui/icons/Search";
import { useDispatch, useSelector } from "react-redux";
import InfiniteScroll from "react-infinite-scroll-component";
import { fetchNotes, noteListSelector, resetNoteList } from "../noteListSlice";
import { RouteComponentProps } from "react-router";
import { NoteListItem } from "./NoteListItem";
import { useAuth } from "../../auth/hooks/useAuth";

interface Props extends RouteComponentProps<{ userId?: string }> {
  isMyNotes?: boolean;
}

const useStyles = makeStyles((theme) => ({
  searchWrapper: {
    backgroundColor: theme.palette.primary.main,
    padding: theme.spacing(1),
    borderRadius: 5,
    marginBottom: theme.spacing(2),
  },
  search: {
    position: "relative",
    borderRadius: theme.shape.borderRadius,
    backgroundColor: fade(theme.palette.common.white, 0.15),
    "&:hover": {
      backgroundColor: fade(theme.palette.common.white, 0.25),
    },
    marginRight: theme.spacing(2),
    marginLeft: 0,
    width: "100%",
    [theme.breakpoints.up("sm")]: {
      marginLeft: theme.spacing(3),
      width: "auto",
    },
  },
  searchIcon: {
    padding: theme.spacing(0, 2),
    height: "100%",
    position: "absolute",
    pointerEvents: "none",
    display: "flex",
    alignItems: "center",
    justifyContent: "center",
  },
  inputRoot: {
    color: "inherit",
  },
  inputInput: {
    display: "flex",
    padding: theme.spacing(1, 1, 1, 0),
    // vertical padding + font size from searchIcon
    paddingLeft: `calc(1em + ${theme.spacing(4)}px)`,
    transition: theme.transitions.create("width"),
    width: "100%",
    [theme.breakpoints.up("md")]: {
      width: "20ch",
    },
  },
}));

export const NoteListPage = (props: Props) => {
  const classes = useStyles();
  const dispatch = useDispatch();

  const { currentPage, isLoading, notes, pageCount } =
    useSelector(noteListSelector);
  const { currentUser } = useAuth();

  const [symbols, setSymbols] = useState("");

  const userId = props.isMyNotes
    ? currentUser
      ? currentUser.id
      : undefined
    : props.match.params.userId
    ? props.match.params.userId
    : undefined;
  // const userId = "60a29bcb6277f43e7cf3e9ec";

  const params = {
    symbols,
    userId,
  };

  const fetchNotesHandler = () => {
    console.log(currentPage);

    dispatch(fetchNotes(params));
  };

  useEffect(() => {
    console.log("mount");

    fetchNotesHandler();
    return () => {
      dispatch(resetNoteList());
    };
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [symbols]);

  const hasNextPage = () => pageCount >= currentPage;

  let content: React.ReactNode;

  if (isLoading && !notes.length) {
    content = <h1>Загрузка...</h1>;
  } else if (!notes.length) {
    content = <h1>Пусто</h1>;
  } else {
    content = (
      <InfiniteScroll
        dataLength={notes.length} //This is important field to render the next data
        next={fetchNotesHandler}
        hasMore={hasNextPage()}
        loader={<h4>Загрузка...</h4>}
        scrollableTarget="main"
        style={{
          overflow: "hidden",
        }}
      >
        <Grid container spacing={2}>
          {notes.map((note) => (
            <Grid key={note.id} item xs={12} sm={6} md={4}>
              <NoteListItem
                isOwner={currentUser.id === note.user.id}
                note={note}
              />
            </Grid>
          ))}
        </Grid>
      </InfiniteScroll>
    );
  }

  return (
    <>
      <div className={classes.searchWrapper}>
        <div className={classes.search}>
          <div className={classes.searchIcon}>
            <SearchIcon />
          </div>
          <InputBase
            placeholder="Search…"
            value={symbols}
            onChange={(e) => setSymbols(e.target.value)}
            classes={{
              root: classes.inputRoot,
              input: classes.inputInput,
            }}
            inputProps={{ "aria-label": "search" }}
          />
        </div>
      </div>
      {content}
    </>
  );
};
