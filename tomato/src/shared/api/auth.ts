import {AxiosPromise} from "axios";

import {request} from "@shared/lib/request";
import {OrganisationCredentials, VolunteerCredentials} from "@entities/viewer";
import {UserType} from "@entities/user";

export interface RegisterAsOrgData {
  email: string;
  name: string;
  password: string;
}

export interface RegisterAsOrgResponse {
  credentials: OrganisationCredentials;
}

const registerAsOrg = (
  data: RegisterAsOrgData,
): AxiosPromise<RegisterAsOrgResponse> =>
  request({
    method: "POST",
    url: "/auth/organisations/register",
    data,
  });

export interface RegisterAsVolunteerData {
  email: string;
  firstName: string;
  lastName: string;
  password: string;
}

export interface RegisterAsVolunteerResponse {
  credentials: VolunteerCredentials;
}

const registerAsVolunteer = (
  data: RegisterAsVolunteerData,
): AxiosPromise<RegisterAsVolunteerResponse> =>
  request({
    method: "POST",
    url: "/auth/volunteers/register",
    data,
  });

export interface LoginData {
  email: string;
  password: string;
  type: UserType;
}

export interface LoginResponse {
  credentials: VolunteerCredentials | OrganisationCredentials;
  type: UserType;
}

const login = (data: LoginData): AxiosPromise<LoginResponse> =>
  request({
    method: "POST",
    url: "/auth/login",
    data,
  });

export interface GetCredentialsResponse {
  credentials: VolunteerCredentials | OrganisationCredentials;
  type: UserType;
}

const getCredentials = (): AxiosPromise<GetCredentialsResponse> =>
  request({
    method: "GET",
    url: "/auth/credentials",
  });

export const authApi = {
  registerAsOrg,
  registerAsVolunteer,
  login,
  getCredentials,
};
