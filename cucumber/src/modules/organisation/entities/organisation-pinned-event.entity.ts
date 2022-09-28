import {
  Entity,
  PrimaryGeneratedColumn,
  BaseEntity,
  ManyToOne,
  OneToOne,
} from "typeorm";

import {Event} from "@modules/event";

import {Organisation} from "./organisation.entity";

@Entity()
export class OrganisationPinnedEvent extends BaseEntity {
  @PrimaryGeneratedColumn("uuid")
  id: string;

  @ManyToOne(() => Organisation)
  organisation: Organisation;

  @OneToOne(() => Event)
  event: Event;
}
