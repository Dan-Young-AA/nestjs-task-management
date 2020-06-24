import { Controller, Get, Param, ParseIntPipe } from "@nestjs/common";

import { PersonService } from "./person.service";

@Controller("person")
export class PersonController {
  constructor(private personService: PersonService) {}

  @Get("/:id")
  public getPerson(@Param("id", ParseIntPipe) id: number) {
    return this.personService.getPerson(id);
  }
}
