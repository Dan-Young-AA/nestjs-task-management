import { NotFoundException } from "@nestjs/common";
import { EntityRepository, Repository } from "typeorm";

import { Person } from "./person.entity";

@EntityRepository(Person)
export class PersonRepository extends Repository<Person> {
  public async getPerson(id: number): Promise<Person> {
    const person = await this.findOne(id);

    if (!person) {
      throw new NotFoundException(`No person found with id ${id}`);
    }

    return person;
  }
}
