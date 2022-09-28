import {createAction} from "@reduxjs/toolkit";

import {UserType} from "@entities/user";

import {OrganisationCredentials, VolunteerCredentials} from "../lib/typings";

const prefix = "viewer";

export interface SetViewerTypePayload {
  type: UserType;
}

export const setViewerType = createAction<SetViewerTypePayload>(
  `${prefix}/setViewerType`,
);

export interface SetCredentialsPayload {
  type: UserType;
  credentials: VolunteerCredentials | OrganisationCredentials;
}

export const setCredentials = createAction<SetCredentialsPayload>(
  `${prefix}/setCredentials`,
);
