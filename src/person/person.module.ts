import { Module } from "@nestjs/common";
import { TypeOrmModule } from "@nestjs/typeorm";

import { PersonRepository } from "./person.repository";
import { PersonController } from "./person.controller";
import { PersonService } from "./person.service";
import { PersonResolver } from "./person.resolver";

@Module({
  imports: [TypeOrmModule.forFeature([PersonRepository])],
  controllers: [PersonController],
  providers: [PersonService, PersonResolver],
})
export class PersonModule {}
