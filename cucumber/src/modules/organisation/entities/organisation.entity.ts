import {Event} from "@modules/event";
import {
  Column,
  Entity,
  PrimaryGeneratedColumn,
  BaseEntity,
  OneToMany,
} from "typeorm";

@Entity()
export class Organisation extends BaseEntity {
  @PrimaryGeneratedColumn("uuid")
  id: string;

  @Column({
    type: "varchar",
    length: 256,
    unique: true,
  })
  email: string;

  @Column({
    type: "varchar",
    length: 48,
  })
  name: string;

  @Column({
    type: "varchar",
    length: 256,
  })
  password: string;

  @Column({
    type: "varchar",
    length: 512,
  })
  avatar: string;

  @OneToMany(() => Event, (event) => event.organisation)
  pinnedEvents: Event;

  @Column({
    type: "date",
  })
  foundationDate: Date;

  get public() {
    const {id, avatar, name, foundationDate} = this;

    return {id, avatar, name, foundationDate};
  }
}
