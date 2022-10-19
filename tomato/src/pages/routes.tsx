import * as React from "react";
import {Routes as Switch, Route} from "react-router-dom";

import {PublicOnlyRoute, routes} from "@shared/lib/routing";

import {LoginPage, RegisterAsOrgPage, RegisterAsVolunteerPage} from "./auth";
import {Home} from "./home/index";
import {VolunteerPage} from "./volunteer";
import {OrganisationPage} from "./organisation";
import {MyOrganisationsPage} from "./my-organisations";
import {MyVolunteersPage} from "./my-volunteers";
import {MyEventsPage} from "./my-events";
import {NewsPage} from "./news";
import {EventPage} from "./event";

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

    <Route path="/vol/:id" element={<VolunteerPage />} />
    <Route path="/org/:id" element={<OrganisationPage />} />
    <Route path="/event/:id" element={<EventPage />} />
    <Route path="/my-orgs" element={<MyOrganisationsPage />} />
    <Route path="/my-vols" element={<MyVolunteersPage />} />
    <Route path="/my-events" element={<MyEventsPage />} />
    <Route path="/news" element={<NewsPage />} />
  </Switch>
);
