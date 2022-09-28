import {createAsyncThunk} from "@reduxjs/toolkit";

import {
  authApi,
  GetCredentialsResponse,
  LoginData,
  LoginResponse,
  RegisterAsOrgData,
  RegisterAsOrgResponse,
  RegisterAsVolunteerData,
  RegisterAsVolunteerResponse,
} from "@shared/api/auth";

const prefix = "auth";

export type RegisterAsOrgPayload = RegisterAsOrgResponse;
export type RegisterAsOrgOptions = RegisterAsOrgData;

export const registerAsOrg = createAsyncThunk<
  RegisterAsOrgPayload,
  RegisterAsOrgOptions
>(`${prefix}/registerAsOrg`, async (options) => {
  const {data} = await authApi.registerAsOrg(options);

  return data;
});

export type RegisterAsVolunteerPayload = RegisterAsVolunteerResponse;
export type RegisterAsVolunteerOptions = RegisterAsVolunteerData;

export const registerAsVolunteer = createAsyncThunk<
  RegisterAsVolunteerPayload,
  RegisterAsVolunteerOptions
>(`${prefix}/registerAsVolunteer`, async (options) => {
  const {data} = await authApi.registerAsVolunteer(options);

  return data;
});

export type LoginPayload = LoginResponse;
export type LoginOptions = LoginData;

export const login = createAsyncThunk<LoginPayload, LoginOptions>(
  `${prefix}/login`,
  async (options) => {
    const {data} = await authApi.login(options);

    return data;
  },
);

export type FetchCredentialsPayload = GetCredentialsResponse;

export const fetchCredentials = createAsyncThunk<FetchCredentialsPayload, void>(
  `${prefix}/fetchCredentials`,
  async () => {
    const {data} = await authApi.getCredentials();

    return data;
  },
);
