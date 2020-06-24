import { Field, InputType } from "@nestjs/graphql";
import { IsIn, IsNotEmpty, IsOptional } from "class-validator";
import { TaskStatus } from "../task-status.enum";

@InputType()
export class GetTasksFilterDto {
  @Field(() => TaskStatus, { nullable: true })
  @IsOptional()
  @IsIn(Object.values(TaskStatus))
  status?: TaskStatus;

  @Field({ nullable: true })
  @IsOptional()
  @IsNotEmpty()
  search?: string;
}
