import { Field, InputType } from "@nestjs/graphql";
import { IsNotEmpty } from "class-validator";

@InputType()
export class CreateTaskDto {
  @Field()
  @IsNotEmpty()
  public title!: string;

  @Field()
  @IsNotEmpty()
  public description!: string;
}
