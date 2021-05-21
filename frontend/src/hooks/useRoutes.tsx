import { Redirect, Route, Switch } from "react-router";

import { AuthPage } from "../features/auth/components/AuthPage";
import { NoteAddPage } from "../features/notes/components/NoteAddPage";
import { NoteDetailsPage } from "../features/notes/components/NoteDetailsPage";
import { NoteListPage } from "../features/notes/components/NoteListPage";

export const useRoutes = (isAuth: boolean) => {
  if (isAuth) {
    return (
      <Switch>
        <Route key="note-add" exact path="/notes/add" component={NoteAddPage} />

        <Route key="all-notes" exact path="/notes" component={NoteListPage} />

        <Route
          key="user-notes"
          exact
          path="/users/:userId/notes"
          component={NoteListPage}
        />

        <Route
          exact
          path="/my-notes"
          render={(props) => <NoteListPage {...props} isMyNotes={true} />}
        />
        <Route path="/notes/:id" component={NoteDetailsPage} />
        <Redirect to="/my-notes" />
      </Switch>
    );
  }

  return (
    <Switch>
      <Route path="/auth">
        <AuthPage />
      </Route>
      <Redirect to="/auth" />
    </Switch>
  );
};
