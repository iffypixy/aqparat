import {EventVolunteer} from "@modules/event";
import {OrganisationVolunteer} from "@modules/organisation";
import {
  BadRequestException,
  Controller,
  Get,
  Param,
  Query,
} from "@nestjs/common";
import {ILike, In} from "typeorm";

import {Volunteer} from "./entities";

@Controller("/volunteers")
export class VolunteerController {
  @Get("/query")
  async getVolunteersByQuery(@Query("name") name: string) {
    const volunteers = await Volunteer.find({
      where: [{firstName: ILike(`%${name}%`)}, {lastName: ILike(`%${name}%`)}],
    });

    return {
      volunteers: volunteers.map((vol) => vol.public),
    };
  }

  @Get("/:id")
  async getVolunteer(@Param("id") id: string) {
    const volunteer = await Volunteer.findOne({where: {id}});

    if (!volunteer) throw new BadRequestException("No vol found");

    const events = await EventVolunteer.count({
      where: {volunteer: {id: volunteer.id}},
    });

    const orgs = await OrganisationVolunteer.count({
      where: {volunteer: {id: volunteer.id}},
    });

    return {volunteer: {...volunteer.public, events, orgs}};
  }

  @Get("/:id/organisations")
  async getVolunteersOrganisations(@Param("id") id: string) {
    const vols = await OrganisationVolunteer.find({where: {volunteer: {id}}});

    return {
      organisations: vols
        .map((vol) => vol.organisation)
        .map((org) => org.public),
    };
  }

  @Get("/:id/events")
  async getVolunteersEvents(@Param("id") id: string) {
    const orgvols = await OrganisationVolunteer.find({
      where: {
        volunteer: {
          id,
        },
      },
    });

    const vols = await EventVolunteer.find({
      where: {volunteer: {id: In(orgvols.map((vol) => vol.id))}},
    });

    return {
      events: vols.map((vol) => vol.event).map((event) => event.public),
    };
  }
}
