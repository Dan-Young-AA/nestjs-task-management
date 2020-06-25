import { ObjectType, Field, Int } from "@nestjs/graphql";
import {
  Entity,
  BaseEntity,
  PrimaryGeneratedColumn,
  Column,
  OneToOne,
  JoinColumn,
  AfterLoad,
} from "typeorm";
import { Exclude } from "class-transformer";

import { Reference } from "./reference.entity";

@ObjectType()
@Entity({ name: "Person.Person" })
export class Person extends BaseEntity {
  @Field(() => Int)
  @PrimaryGeneratedColumn({ name: "PersonId" })
  id!: number;

  @Field()
  @Column({ name: "FirstName" })
  firstName!: string;

  @Field()
  @Column({ name: "Surname" })
  lastName!: string;

  @Field()
  /**
   * This is computed from the relation to the System.Reference table
   */
  salutation!: string;

  /* Everything below here should not be exposed to a client */

  @Column()
  @Exclude()
  TitleId!: string;

  @OneToOne(() => Reference, { eager: true })
  @JoinColumn({ name: "TitleId", referencedColumnName: "ReferenceId" })
  @Exclude()
  reference!: Reference;

  @AfterLoad()
  setLookupFields() {
    if (this.reference) {
      this.salutation = this.reference.ItemDescription;
    }
  }
}
