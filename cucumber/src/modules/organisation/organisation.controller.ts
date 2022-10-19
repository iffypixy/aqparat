import {
  BadRequestException,
  Body,
  Controller,
  Delete,
  Get,
  Param,
  Post,
  Put,
  Query,
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
  OrganisationInvitation,
  OrganisationPinnedEvent,
  OrganisationVolunteer,
} from "./entities";

@Controller("/organisations")
export class OrganisationController {
  @Get("/:id/volunteers/query")
  async getOrganisationsVolunteersByQuery(
    @Query("name") name: string,
    @Session() session: Sess,
  ) {
    const volunteers = await OrganisationVolunteer.find({
      where: {
        organisation: {
          id: session.organisation.id,
        },
      },
    });

    return {
      volunteers: volunteers
        .filter(
          (vol) =>
            vol.volunteer.firstName
              .toLowerCase()
              .startsWith(name.toLowerCase()) ||
            vol.volunteer.lastName.toLowerCase().startsWith(name.toLowerCase()),
        )
        .map((vol) => vol.public),
    };
  }

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
      description: dto.description,
      organisation: {
        id: session.organisation.id,
      },
    });

    await event.save();

    return {
      event: event.public,
    };
  }

  @Get("/events/:id")
  async getEvent(@Param("id") id: string) {
    const event = await Event.findOne({where: {id}});

    const vols = await EventVolunteer.find({
      where: {
        event: {
          id: event.id,
        },
      },
    });

    return {
      event: {
        ...event.public,
        volunteers: vols.map((vol) => vol.public),
      },
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

  @Get("/:id/volunteers")
  async getOrganisationsVolunteers(@Param("id") id: string) {
    const org = await Organisation.findOne({where: {id}});

    if (!org) throw new BadRequestException("Organisation not found");

    const vols = await OrganisationVolunteer.find({
      where: {
        organisation: {
          id: org.id,
        },
      },
    });

    return {
      volunteers: vols.map((vol) => ({...vol.public, id: vol.volunteer.id})),
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

    const invitation = OrganisationInvitation.create({
      volunteer,
      organisation: {
        id: session.organisation.id,
      },
    });

    await invitation.save();

    return {};
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

  @Get("/:id/events")
  async getOrganisationsEvents(@Param("id") id: string) {
    const events = await Event.find({
      where: {
        organisation: {
          id,
        },
      },
    });

    return {
      events: events.map((event) => event.public),
    };
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
  async getOrganisationProfile(@Param("id") id: string) {
    const organisation = await Organisation.findOne({
      where: {
        id,
      },
    });

    return {
      organisation: organisation.public,
    };
  }

  @Post("/invitations/accept")
  async acceptInvitation(
    @Body() dto: dtos.AcceptInvitationDto,
    @Session() session: Sess,
  ) {
    const invitation = await OrganisationInvitation.findOne({
      where: {id: dto.id},
    });

    if (!invitation) throw new BadRequestException("No invitation found");

    if (invitation.volunteer.id === session.volunteer.id) {
      await OrganisationInvitation.delete({id: invitation.id});

      const orgvol = OrganisationVolunteer.create({
        volunteer: {
          id: invitation.volunteer.id,
        },
        organisation: {
          id: invitation.organisation.id,
        },
      });

      await orgvol.save();

      return {organisation: invitation.organisation.public};
    }
  }

  @Get("/invitations")
  async getInvitations(@Session() session: Sess) {
    const invitations = await OrganisationInvitation.find({
      where: {
        volunteer: {
          id: session.volunteer.id,
        },
      },
    });

    return {
      invitations: invitations.map((invite) => invite.public),
    };
  }

  @Post("/events/:id/finish")
  async finishEvent(@Param("id") id: string) {
    const event = await Event.findOne({where: {id}});

    if (!event) throw new BadRequestException("Event not found");

    event.isFinished = true;

    await event.save();

    return {
      event: event.public,
    };
  }
}
