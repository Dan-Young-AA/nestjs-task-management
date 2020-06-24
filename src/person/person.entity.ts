import { ObjectType, Field, Int } from "@nestjs/graphql";
import { Entity, BaseEntity, PrimaryGeneratedColumn, Column } from "typeorm";

@ObjectType()
@Entity({ name: "Person.Person" })
export class Person extends BaseEntity {
  @Field()
  @Column()
  PersonKey!: string;

  @Field(() => Int)
  @PrimaryGeneratedColumn()
  PersonId!: number;

  @Field()
  @Column()
  FirstName!: string;

  @Field()
  @Column()
  Surname!: string;
}
