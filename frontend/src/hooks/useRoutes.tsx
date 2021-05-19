import { Redirect, Route, Switch } from "react-router";

import { AuthPage } from "../features/auth/components/AuthPage";
import { Main } from "../pages/Main";

export const useRoutes = (isAuth: boolean) => {
  if (isAuth) {
    return (
      <Switch>
        <Route exact path="/">
          <Main />
        </Route>
        <Redirect to="/" />
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
