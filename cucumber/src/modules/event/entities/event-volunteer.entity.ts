import {Entity, PrimaryGeneratedColumn, BaseEntity, ManyToOne} from "typeorm";

import {OrganisationVolunteer} from "@modules/organisation";

import {Event} from "./event.entity";

@Entity()
export class EventVolunteer extends BaseEntity {
  @PrimaryGeneratedColumn("uuid")
  id: string;

  @ManyToOne(() => OrganisationVolunteer)
  volunteer: OrganisationVolunteer;

  @ManyToOne(() => Event)
  event: Event;

  get public() {
    const {volunteer, event} = this;

    return {...volunteer.public, event: event.public};
  }
}
