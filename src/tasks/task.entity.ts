import { Field, Int, ObjectType } from "@nestjs/graphql";
import {
  BaseEntity,
  Column,
  Entity,
  ManyToOne,
  PrimaryGeneratedColumn,
} from "typeorm";

import { User } from "../auth/user.entity";
import { TaskStatus } from "./task-status.enum";

@ObjectType()
@Entity()
export class Task extends BaseEntity {
  @Field(() => Int)
  @PrimaryGeneratedColumn()
  public id!: number;

  @Field()
  @Column()
  public title!: string;

  @Field()
  @Column()
  public description!: string;

  @Field()
  @Column()
  public status!: TaskStatus;

  @ManyToOne(
    () => User,
    user => user.tasks,
    { eager: false },
  )
  public user!: User;

  @Field(() => Int)
  @Column()
  public userId!: number;
}
