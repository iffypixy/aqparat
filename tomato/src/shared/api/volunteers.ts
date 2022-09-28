import {AxiosPromise} from "axios";

import {Volunteer} from "@entities/volunteer";
import {request} from "@shared/lib/request";

export interface GetVolunteerData {
  id: string;
}

export interface GetVolunteerResponse {
  volunteer: Volunteer;
}

const getVolunteer = (
  data: GetVolunteerData,
): AxiosPromise<GetVolunteerResponse> =>
  request({
    url: `/volunteers/${data.id}`,
    method: "GET",
  });

export const volunteersApi = {getVolunteer};
