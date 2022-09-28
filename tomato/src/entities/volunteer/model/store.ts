import {createReducer, PayloadAction} from "@reduxjs/toolkit";

import * as actions from "./actions";
import {Volunteer} from "../lib/typings";

export interface VolunteerStore {
  volunteer: Volunteer | null;
}

export const store = createReducer<VolunteerStore>(
  {
    volunteer: null,
  },
  {
    [actions.fetchVolunteer.fulfilled.type]: (
      state,
      {payload}: PayloadAction<actions.FetchVolunteerPayload>,
    ) => {
      state.volunteer = payload.volunteer;
    },
  },
);
