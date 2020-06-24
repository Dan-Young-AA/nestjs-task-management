import { Module } from "@nestjs/common";
import { TypeOrmModule } from "@nestjs/typeorm";

import { typeOrmConfig } from "./config/typeorm.config";
import { TasksModule } from "./tasks/tasks.module";
import { AuthModule } from "./auth/auth.module";
import { GraphQLModule } from "@nestjs/graphql";

@Module({
  imports: [
    GraphQLModule.forRoot({
      autoSchemaFile: "schema.graphql",
      context: ({ req }) => ({ req }),
    }),
    TypeOrmModule.forRoot(typeOrmConfig),
    AuthModule,
    TasksModule,
  ],
})
export class AppModule {}
