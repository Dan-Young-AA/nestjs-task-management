import { Resolver, Query, Args, Int } from "@nestjs/graphql";

import { Person } from "./person.entity";
import { PersonService } from "./person.service";

@Resolver(() => Person)
export class PersonResolver {
  constructor(private personService: PersonService) {}

  @Query(() => Person)
  async person(@Args({ name: "id", type: () => Int }) id: number) {
    return this.personService.getPerson(id);
  }
}
