import * as React from "react";
import {Routes as Switch, Route} from "react-router-dom";

import {PublicOnlyRoute, routes} from "@shared/lib/routing";

import {LoginPage, RegisterAsOrgPage, RegisterAsVolunteerPage} from "./auth";
import {Home} from "./home/index";
import {VolunteerPage} from "./volunteer";
import {OrganisationPage} from "./organisation";
import {MyOrganisations} from "./my-organisations";
import {MyVolunteers} from "./my-volunteers";

export const Routes: React.FC = () => (
  <Switch>
    <Route path={routes.home} element={<Home />} />

    <Route
      path="/register-as-org"
      element={
        <PublicOnlyRoute>
          <RegisterAsOrgPage />
        </PublicOnlyRoute>
      }
    />

    <Route
      path="/register-as-volunteer"
      element={
        <PublicOnlyRoute>
          <RegisterAsVolunteerPage />
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

    <Route path="/volunteers/:id" element={<VolunteerPage />} />
    <Route path="/organisations/:id" element={<OrganisationPage />} />
    <Route path="/my-organisations" element={<MyOrganisations />} />
    <Route path="/my-volunteers" element={<MyVolunteers />} />
  </Switch>
);
