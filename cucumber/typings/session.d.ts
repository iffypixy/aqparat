import "express-session";

import {UserType} from "@modules/user";
import {Volunteer} from "@modules/volunteer";
import {Organisation} from "@modules/organisation";

declare module "express-session" {
  export interface Sess extends Session {
    volunteer: Volunteer;
    organisation: Organisation;
    type: UserType;
  }
}
