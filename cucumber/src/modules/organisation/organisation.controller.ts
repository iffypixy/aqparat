import {
  BadRequestException,
  Body,
  Controller,
  Delete,
  Get,
  Param,
  Post,
  Put,
  Session,
  UseGuards,
} from "@nestjs/common";
import {Sess} from "express-session";

import {Event, EventVolunteer} from "@modules/event";

import {IsOrganisation} from "./guards";
import * as dtos from "./dtos";
import {Volunteer} from "@modules/volunteer";
import {
  Organisation,
  OrganisationPinnedEvent,
  OrganisationVolunteer,
} from "./entities";

@Controller("/organisations")
export class OrganisationController {
  @UseGuards(IsOrganisation)
  @Post("/events/create")
  async createEvent(
    @Body() dto: dtos.CreateEventDto,
    @Session() session: Sess,
  ) {
    const event = Event.create({
      name: dto.name,
      places: dto.places,
      startDate: dto.startDate,
      endingDate: dto.endingDate,
      organisation: {
        id: session.organisation.id,
      },
    });

    await event.save();

    return {
      event: event.public,
    };
  }

  @UseGuards(IsOrganisation)
  @Delete("/events/:id/delete")
  async deleteEvent(@Param("id") id: string) {
    await Event.delete({id});
  }

  @UseGuards(IsOrganisation)
  @Put("/events/:id/update")
  async updateEvent(@Param("id") id: string, @Body() dto: dtos.UpdateEventDto) {
    const event = await Event.findOne({where: {id}});

    if (!event) throw new BadRequestException("Event not found");

    const updated = await Event.save({
      id: event.id,
      name: dto.name,
      startDate: dto.startDate,
      endingDate: dto.endingDate,
    });

    return {
      event: updated.public,
    };
  }

  @UseGuards(IsOrganisation)
  @Post("/volunteers/add")
  async addVolunteer(
    @Body() dto: dtos.AddVolunteerDto,
    @Session() session: Sess,
  ) {
    const volunteer = await Volunteer.findOne({
      where: {
        id: dto.volunteerId,
      },
    });

    if (!volunteer) throw new BadRequestException("Volunteer not found");

    const orgvolunteer = OrganisationVolunteer.create({
      volunteer,
      organisation: {
        id: session.organisation.id,
      },
    });

    await orgvolunteer.save();

    return {volunteer: volunteer.public};
  }

  @UseGuards(IsOrganisation)
  @Delete("/volunteers/:id/delete")
  async deleteVolunteer(@Param("id") id: string) {
    await OrganisationVolunteer.delete({id});
  }

  @UseGuards(IsOrganisation)
  @Post("/events/:id/volunteers/add")
  async addVolunteerToEvent(
    @Session() session: Sess,
    @Body() dto: dtos.AddVolunteerToEventDto,
    @Param("id") id: string,
  ) {
    const event = await Event.findOne({
      where: {
        id,
        organisation: {
          id: session.organisation.id,
        },
      },
    });

    if (!event) throw new BadRequestException("Event not found");

    const orgvolunteer = await OrganisationVolunteer.findOne({
      where: {
        id: dto.volunteerId,
        organisation: {
          id: session.organisation.id,
        },
      },
    });

    if (!orgvolunteer) throw new BadRequestException("Volunteer not found");

    const volunteer = EventVolunteer.create({
      event,
      volunteer: orgvolunteer,
    });

    await volunteer.save();

    return {
      volunteer: volunteer.public,
    };
  }

  @UseGuards(IsOrganisation)
  @Delete("/events/:eventId/volunteers/:volunteerId/delete")
  async deleteVolunteerOfEvent(
    @Param("eventId") eventId: string,
    @Param("volunteerId") volunteerId: string,
  ) {
    await EventVolunteer.delete({
      event: {
        id: eventId,
      },
      volunteer: {
        id: volunteerId,
      },
    });
  }

  @UseGuards(IsOrganisation)
  @Post("/events/pin")
  async pinEvent(@Body() dto: dtos.PinEventDto, @Session() session: Sess) {
    const event = await Event.findOne({
      where: {
        id: dto.eventId,
      },
    });

    if (!event) throw new BadRequestException("Event not found");

    const organisation = await Organisation.findOne({
      where: {
        id: session.organisation.id,
      },
    });

    const pinned = OrganisationPinnedEvent.create({
      organisation,
      event,
    });

    await pinned.save();
  }

  @UseGuards(IsOrganisation)
  @Delete("/events/unpin")
  async unpinEvent(@Body() dto: dtos.UnpinEventDto, @Session() session: Sess) {
    await OrganisationPinnedEvent.delete({
      organisation: {
        id: session.organisation.id,
      },
      event: {
        id: dto.eventId,
      },
    });
  }

  // @UseGuards(IsOrganisation)
  // @Post("/profile/images/add")
  // async addImage(@Body() dto: dtos.AddImageDto, @Session() session: Sess) {
  //   const profile = await OrganisationProfile.findOne({
  //     where: {
  //       id: session.organisation.id,
  //     },
  //   });
  // }

  // @UseGuards(IsOrganisation)
  // @Delete("/profile/images/:id/delete")
  // deleteImage() {}

  @Get("/:id/profile")
  async getOrganisationProfile(@Session() session: Sess) {
    const organisation = await Organisation.findOne({
      where: {
        id: session.organisation.id,
      },
    });

    return {
      organisation: organisation.public,
    };
  }
}
