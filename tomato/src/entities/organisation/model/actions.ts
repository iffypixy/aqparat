import {createAsyncThunk} from "@reduxjs/toolkit";

import {
  GetOrganisationData,
  GetOrganisationResponse,
  organisationsApi,
} from "@shared/api/organisations";

const prefix = "organisation";

export type FetchOrganisationOptions = GetOrganisationData;
export type FetchOrganisationPayload = GetOrganisationResponse;

export const fetchOrganisation = createAsyncThunk<
  FetchOrganisationPayload,
  FetchOrganisationOptions
>(`${prefix}/fetchOrganisation`, async (options) => {
  const {data} = await organisationsApi.getOrganisation(options);

  return data;
});
