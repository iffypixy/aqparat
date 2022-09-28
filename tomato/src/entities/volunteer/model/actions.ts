import {createAsyncThunk} from "@reduxjs/toolkit";
import {
  GetVolunteerData,
  GetVolunteerResponse,
  volunteersApi,
} from "@shared/api/volunteers";

const prefix = "volunteer";

export type FetchVolunteerOptions = GetVolunteerData;
export type FetchVolunteerPayload = GetVolunteerResponse;

export const fetchVolunteer = createAsyncThunk<
  FetchVolunteerPayload,
  FetchVolunteerOptions
>(`${prefix}/fetchVolunteer`, async (options) => {
  const {data} = await volunteersApi.getVolunteer(options);

  return data;
});
