import {Column, Entity, PrimaryGeneratedColumn, BaseEntity} from "typeorm";

@Entity()
export class File extends BaseEntity {
  @PrimaryGeneratedColumn("uuid")
  id: string;

  @Column({
    type: "varchar",
    length: 1024,
  })
  url: string;

  get public() {
    const {id, url} = this;

    return {id, url};
  }
}
