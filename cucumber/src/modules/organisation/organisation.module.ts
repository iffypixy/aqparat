import {Module} from "@nestjs/common";
import {TypeOrmModule} from "@nestjs/typeorm";

import {Organisation, OrganisationProfile} from "./entities";
import {OrganisationController} from "./organisation.controller";

@Module({
  imports: [TypeOrmModule.forFeature([Organisation, OrganisationProfile])],
  controllers: [OrganisationController],
})
export class OrganisationModule {}
