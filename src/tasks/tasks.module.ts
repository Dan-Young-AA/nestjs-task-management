import { Module } from "@nestjs/common";
import { TypeOrmModule } from "@nestjs/typeorm";

import { AuthModule } from "../auth/auth.module";
import { TasksController } from "./tasks.controller";
import { TaskRepository } from "./tasks.repsitory";
import { TasksResolver } from "./tasks.resolver";
import { TasksService } from "./tasks.service";

@Module({
  imports: [TypeOrmModule.forFeature([TaskRepository]), AuthModule],
  controllers: [TasksController],
  providers: [TasksService, TasksResolver],
})
export class TasksModule {}
