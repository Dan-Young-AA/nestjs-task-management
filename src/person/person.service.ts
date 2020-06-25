import { Injectable, Inject } from "@nestjs/common";
import { PersonRepository } from "./person.repository";

@Injectable()
export class PersonService {
  constructor(
    @Inject(PersonRepository) private personRepository: PersonRepository,
  ) {}

  public getPerson(id: number) {
    return this.personRepository.getPerson(id);
  }

  public getPersons() {
    return this.personRepository.getAllPersons();
  }
}
