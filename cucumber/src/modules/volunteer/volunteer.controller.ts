import {Controller, Get, Param} from "@nestjs/common";

import {Volunteer} from "./entities";

@Controller("/volunteers")
export class VolunteerController {
  @Get("/:id")
  async getVolunteer(@Param("id") id: string) {
    const volunteer = await Volunteer.findOne({where: {id}});

    return {volunteer: volunteer.public};
  }
}
