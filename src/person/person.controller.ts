import {
  Controller,
  Get,
  Param,
  ParseIntPipe,
  UseInterceptors,
  ClassSerializerInterceptor,
} from "@nestjs/common";

import { PersonService } from "./person.service";

@Controller("person")
@UseInterceptors(ClassSerializerInterceptor)
export class PersonController {
  constructor(private personService: PersonService) {}

  @Get()
  public getPersons() {
    return this.personService.getPersons();
  }

  @Get("/:id")
  public getPerson(@Param("id", ParseIntPipe) id: number) {
    return this.personService.getPerson(id);
  }
}
