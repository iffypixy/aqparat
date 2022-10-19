import {Entity, PrimaryGeneratedColumn, BaseEntity, ManyToOne} from "typeorm";

import {Volunteer} from "@modules/volunteer";
import {Organisation} from "./organisation.entity";

@Entity()
export class OrganisationInvitation extends BaseEntity {
  @PrimaryGeneratedColumn("uuid")
  id: string;

  @ManyToOne(() => Organisation, {eager: true})
  organisation: Organisation;

  @ManyToOne(() => Volunteer, {eager: true})
  volunteer: Volunteer;

  get public() {
    const {organisation, volunteer, id} = this;

    return {id, organisation: organisation.public, volunteer: volunteer.public};
  }
}
