import {
  BadRequestException,
  Body,
  Controller,
  Get,
  Post,
  Session,
} from "@nestjs/common";
import * as bcrypt from "bcryptjs";
import {Sess} from "express-session";

import {Organisation} from "@modules/organisation";
import {Volunteer} from "@modules/volunteer";

import * as dtos from "./dtos";

const avatar =
  "https://messenger-bucket.s3.eu-central-1.amazonaws.com/Screenshot_1.png";

@Controller("/auth")
export class AuthController {
  @Post("/organisations/register")
  async registerAsOrganisation(
    @Body() dto: dtos.RegisterAsOrgDto,
    @Session() session: Sess,
  ) {
    const existed = await Organisation.findOne({
      where: {
        email: dto.email,
      },
    });

    if (existed)
      throw new BadRequestException(
        "There is already a organisation with the same email",
      );

    const salt = await bcrypt.genSalt();
    const password = await bcrypt.hash(dto.password, salt);

    const org = Organisation.create({
      email: dto.email,
      name: dto.name,
      password,
      avatar,
      foundationDate: dto.date,
    });

    await org.save();

    session.type = "organisation";
    session.organisation = org;

    return {
      credentials: org.public,
    };
  }

  @Post("/volunteers/register")
  async registerAsVolunteer(
    @Body() dto: dtos.RegisterAsVolunteerDto,
    @Session() session: Sess,
  ) {
    const existed = await Volunteer.findOne({
      where: {
        email: dto.email,
      },
    });

    if (existed)
      throw new BadRequestException(
        "There is already a volunteer with the same email",
      );

    const salt = await bcrypt.genSalt();
    const password = await bcrypt.hash(dto.password, salt);

    const volunteer = Volunteer.create({
      email: dto.email,
      firstName: dto.firstName,
      lastName: dto.lastName,
      password,
      avatar,
      birthDate: dto.date,
    });

    await volunteer.save();

    session.type = "volunteer";
    session.volunteer = volunteer;

    return {
      credentials: volunteer.public,
    };
  }

  @Post("/login")
  async login(@Body() dto: dtos.LoginDto, @Session() session: Sess) {
    const exception = new BadRequestException("Invalid credentials");

    if (dto.type === "organisation") {
      const org = await Organisation.findOne({
        where: {
          email: dto.email,
        },
      });

      if (!org) throw exception;

      const doPasswordsMatch = await bcrypt.compare(dto.password, org.password);

      if (!doPasswordsMatch) throw exception;

      session.type = "organisation";
      session.organisation = org;
    } else if (dto.type === "volunteer") {
      const volunteer = await Volunteer.findOne({
        where: {
          email: dto.email,
        },
      });

      if (!volunteer) throw exception;

      const doPasswordsMatch = await bcrypt.compare(
        dto.password,
        volunteer.password,
      );

      if (!doPasswordsMatch) throw exception;

      session.type = "volunteer";
      session.volunteer = volunteer;
    }

    return {
      credentials: session[session.type].public,
    };
  }

  @Get("/credentials")
  async getCredentials(@Session() session: Sess) {
    return {
      type: session.type,
      credentials: session[session.type],
    };
  }

  @Post("/logout")
  logout(@Session() session: Sess): Promise<void> {
    return new Promise((resolve, reject) => {
      session.destroy((error) => {
        if (error) reject(error);

        resolve();
      });
    });
  }
}
