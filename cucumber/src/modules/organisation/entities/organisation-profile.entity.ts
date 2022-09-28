import {
  Entity,
  PrimaryGeneratedColumn,
  BaseEntity,
  ManyToOne,
  ManyToMany,
} from "typeorm";

import {File} from "@modules/file";

import {Organisation} from "./organisation.entity";

@Entity()
export class OrganisationProfile extends BaseEntity {
  @PrimaryGeneratedColumn("uuid")
  id: string;

  @ManyToOne(() => Organisation)
  organisation: Organisation;

  @ManyToMany(() => File)
  images: File[];

  get public() {
    const {images, organisation} = this;

    return {
      images: images.map((image) => image.public),
      organisation: organisation.public,
    };
  }
}
