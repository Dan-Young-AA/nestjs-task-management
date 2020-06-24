import { Inject, Injectable, NotFoundException } from "@nestjs/common";

import { User } from "../auth/user.entity";
import { CreateTaskDto, GetTasksFilterDto } from "./dto";
import { TaskStatus } from "./task-status.enum";
import { Task } from "./task.entity";
import { TaskRepository } from "./tasks.repsitory";

@Injectable()
export class TasksService {
  constructor(@Inject(TaskRepository) private taskRepository: TaskRepository) {}

  public getTasks(
    filterDto: GetTasksFilterDto,
    user: User,
  ): Promise<Array<Task>> {
    return this.taskRepository.getTasks(filterDto, user);
  }

  public async getTaskById(id: number, user: User): Promise<Task> {
    const found = await this.taskRepository.findOne({
      where: { id, userId: user.id },
    });

    if (!found) {
      throw new NotFoundException(`Task with ID "${id}" not found`);
    }

    return found;
  }

  public async createTask(
    createTaskDto: CreateTaskDto,
    user: User,
  ): Promise<Task> {
    return this.taskRepository.createTask(createTaskDto, user);
  }

  public async updateTaskStatus(
    id: number,
    status: TaskStatus,
    user: User,
  ): Promise<Task> {
    const task = await this.getTaskById(id, user);
    task.status = status;
    return task.save();
  }

  public async deleteTask(id: number, user: User): Promise<Task> {
    const found = await this.getTaskById(id, user);
    const { affected } = await this.taskRepository.delete({ id });

    if (affected === 0) {
      throw new NotFoundException();
    }

    return found;
  }
}
