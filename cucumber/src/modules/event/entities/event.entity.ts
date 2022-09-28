import {
  Column,
  Entity,
  PrimaryGeneratedColumn,
  BaseEntity,
  ManyToOne,
} from "typeorm";

import {Organisation} from "@modules/organisation";

@Entity()
export class Event extends BaseEntity {
  @PrimaryGeneratedColumn("uuid")
  id: string;

  @Column({
    type: "varchar",
    length: 48,
  })
  name: string;

  @Column({
    type: "varchar",
    array: true,
  })
  places: string[];

  @Column({
    type: "date",
  })
  startDate: Date;

  @Column({
    type: "date",
  })
  endingDate: Date;

  @ManyToOne(() => Organisation)
  organisation: Organisation;

  get public() {
    const {id, name, places, startDate, endingDate, organisation} = this;

    return {
      id,
      name,
      places,
      startDate,
      endingDate,
      organisation: organisation.public,
    };
  }
}
