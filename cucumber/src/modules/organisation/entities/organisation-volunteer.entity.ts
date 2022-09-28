import {Entity, PrimaryGeneratedColumn, BaseEntity, ManyToOne} from "typeorm";

import {Volunteer} from "@modules/volunteer";

import {Organisation} from "./organisation.entity";

@Entity()
export class OrganisationVolunteer extends BaseEntity {
  @PrimaryGeneratedColumn("uuid")
  id: string;

  @ManyToOne(() => Volunteer)
  volunteer: Volunteer;

  @ManyToOne(() => Organisation)
  organisation: Organisation;

  get public() {
    const {volunteer, organisation} = this;

    return {...volunteer.public, organisation: organisation.public};
  }
}
