import {Module} from "@nestjs/common";
import {TypeOrmModule} from "@nestjs/typeorm";

import {
  Organisation,
  OrganisationInvitation,
  OrganisationProfile,
  OrganisationVolunteer,
} from "./entities";
import {OrganisationController} from "./organisation.controller";

@Module({
  imports: [
    TypeOrmModule.forFeature([
      Organisation,
      OrganisationProfile,
      OrganisationInvitation,
      OrganisationVolunteer,
    ]),
  ],
  controllers: [OrganisationController],
})
export class OrganisationModule {}
