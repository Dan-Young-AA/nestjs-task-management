import { Resolver, Query, Args, Int } from "@nestjs/graphql";

import { PersonService } from "./person.service";
import { Person } from "./entities/person.entity";

@Resolver(() => Person)
export class PersonResolver {
  constructor(private personService: PersonService) {}

  @Query(() => [Person])
  async persons() {
    return this.personService.getPersons();
  }

  @Query(() => Person)
  async person(@Args({ name: "id", type: () => Int }) id: number) {
    return this.personService.getPerson(id);
  }
}
