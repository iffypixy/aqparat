import {Routes as Switch, Route} from "react-router-dom";

import {PublicOnlyRoute, routes} from "@shared/lib/routing";

import {LoginPage, RegisterPage} from "./auth";
import {Home} from "./home/index";

export const Routes: React.FC = () => (
  <Switch>
    <Route path={routes.home} element={<Home />} />

    <Route
      path={routes.auth.register}
      element={
        <PublicOnlyRoute>
          <RegisterPage />
        </PublicOnlyRoute>
      }
    />

    <Route
      path={routes.auth.login}
      element={
        <PublicOnlyRoute>
          <LoginPage />
        </PublicOnlyRoute>
      }
    />
  </Switch>
);
