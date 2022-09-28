import {AxiosPromise} from "axios";

import {Organisation} from "@entities/organisation";
import {request} from "@shared/lib/request";

export interface GetOrganisationData {
  id: string;
}

export interface GetOrganisationResponse {
  organisation: Organisation;
}

const getOrganisation = (
  data: GetOrganisationData,
): AxiosPromise<GetOrganisationResponse> =>
  request({
    url: `/api/organisations/${data.id}`,
    method: "GET",
  });

export const organisationsApi = {getOrganisation};
