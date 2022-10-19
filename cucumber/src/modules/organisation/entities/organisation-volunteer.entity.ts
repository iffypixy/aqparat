import {Entity, PrimaryGeneratedColumn, BaseEntity, ManyToOne} from "typeorm";

import {Volunteer} from "@modules/volunteer";

import {Organisation} from "./organisation.entity";

@Entity()
export class OrganisationVolunteer extends BaseEntity {
  @PrimaryGeneratedColumn("uuid")
  id: string;

  @ManyToOne(() => Volunteer, {eager: true})
  volunteer: Volunteer;

  @ManyToOne(() => Organisation, {eager: true})
  organisation: Organisation;

  get public() {
    const {volunteer, organisation} = this;

    return {
      ...volunteer.public,
      organisation: organisation.public,
      id: this.id,
    };
  }
}
