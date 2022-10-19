import {Column, Entity, PrimaryGeneratedColumn, BaseEntity} from "typeorm";

@Entity()
export class Volunteer extends BaseEntity {
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
  firstName: string;

  @Column({
    type: "varchar",
    length: 48,
  })
  lastName: string;

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

  @Column({
    type: "date",
  })
  birthDate: Date;

  get public() {
    const {id, avatar, firstName, lastName, birthDate} = this;

    return {id, avatar, firstName, lastName, birthDate};
  }
}
