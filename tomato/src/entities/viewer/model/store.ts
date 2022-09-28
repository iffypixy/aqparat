import {createReducer, PayloadAction} from "@reduxjs/toolkit";

import {UserType} from "@entities/user";

import {OrganisationCredentials, VolunteerCredentials} from "../lib/typings";
import * as actions from "./actions";

export interface ViewerStore {
  type: UserType | null;
  volunteer: VolunteerCredentials | null;
  organisation: OrganisationCredentials | null;
}

export const store = createReducer<ViewerStore>(
  {
    type: null,
    organisation: null,
    volunteer: null,
  },
  {
    [actions.setViewerType.type]: (
      state,
      {payload}: PayloadAction<actions.SetViewerTypePayload>,
    ) => {
      state.type = payload.type;
    },

    [actions.setCredentials.type]: (
      state,
      {payload}: PayloadAction<actions.SetCredentialsPayload>,
    ) => {
      //@ts-ignore
      state[payload.type] = payload.credentials;
    },
  },
);
