import { Logger, InternalServerErrorException } from "@nestjs/common";
import { EntityRepository, Repository } from "typeorm";

import { User } from "../auth/user.entity";
import { CreateTaskDto, GetTasksFilterDto } from "./dto";
import { TaskStatus } from "./task-status.enum";
import { Task } from "./task.entity";

@EntityRepository(Task)
export class TaskRepository extends Repository<Task> {
  private logger = new Logger("TaskRepository");

  public async getTasks(
    filters: GetTasksFilterDto,
    user: User,
  ): Promise<Array<Task>> {
    const { search, status } = filters;
    const query = this.createQueryBuilder("task");

    query.where("task.userId= :userId", { userId: user.id });

    if (status) {
      query.andWhere("task.status = :status", { status });
    }

    if (search) {
      query.andWhere(
        "(task.title LIKE :search OR task.description LIKE :search)",
        { search: `%${search}%` },
      );
    }

    try {
      const tasks = await query.getMany();

      return tasks;
    } catch (err) {
      this.logger.error(
        `Failed to get tasks for user "${user.username}". DTO: ${JSON.stringify(
          filters,
        )}`,
        err.stack,
      );

      throw new InternalServerErrorException();
    }
  }

  public async createTask(
    createTaskDto: CreateTaskDto,
    user: User,
  ): Promise<Task> {
    const { description, title } = createTaskDto;
    const task = new Task();
    task.title = title;
    task.description = description;
    task.status = TaskStatus.OPEN;
    task.user = user;
    try {
      await task.save();
    } catch (err) {
      this.logger.error(
        `Failed to create task for user "${
          user.username
        }. DTO: ${JSON.stringify(createTaskDto)}"`,
        err.stack,
      );

      throw new InternalServerErrorException();
    }

    delete task.user;

    return task;
  }
}
