import { Module } from "@nestjs/common";
import { GraphQLModule } from "@nestjs/graphql";
import { TypeOrmModule } from "@nestjs/typeorm";

import { typeOrmConfig } from "./config/typeorm.config";

import { AuthModule } from "./auth/auth.module";
import { PersonModule } from "./person/person.module";
import { TasksModule } from "./tasks/tasks.module";

@Module({
  imports: [
    GraphQLModule.forRoot({
      autoSchemaFile: "schema.graphql",
      context: ({ req }) => ({ req }),
    }),
    TypeOrmModule.forRoot(typeOrmConfig),
    AuthModule,
    TasksModule,
    PersonModule,
  ],
})
export class AppModule {}
