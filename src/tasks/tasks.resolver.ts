import { UseGuards } from "@nestjs/common";
import { Args, Int, Mutation, Query, Resolver } from "@nestjs/graphql";
import { GetUser } from "../auth/get-user.decorator";
import { GqlAuthGuard } from "../auth/gql-auth.guard";
import { User } from "../auth/user.entity";
import { GetTasksFilterDto, CreateTaskDto } from "./dto";
import { Task } from "./task.entity";
import { TasksService } from "./tasks.service";
import { TaskStatus } from "./task-status.enum";

@Resolver(() => Task)
@UseGuards(GqlAuthGuard)
export class TasksResolver {
  constructor(private tasksService: TasksService) {}

  @Query(() => [Task])
  async tasks(
    @Args({ name: "filters", nullable: true, type: () => GetTasksFilterDto })
    filters: GetTasksFilterDto = {},
    @GetUser() user: User,
  ): Promise<Task[]> {
    return this.tasksService.getTasks(filters, user);
  }

  @Query(() => Task)
  async task(
    @Args({ name: "id", type: () => Int }) id: number,
    @GetUser() user: User,
  ): Promise<Task> {
    return this.tasksService.getTaskById(id, user);
  }

  @Mutation(() => Task)
  async createTask(
    @Args({ name: "task", type: () => CreateTaskDto })
    createTaskDto: CreateTaskDto,
    @GetUser() user: User,
  ): Promise<Task> {
    return this.tasksService.createTask(createTaskDto, user);
  }

  @Mutation(() => Task)
  async updateTaskStatus(
    @Args({ name: "id", type: () => Int }) id: number,
    @Args({ name: "status", type: () => TaskStatus }) status: TaskStatus,
    @GetUser() user: User,
  ): Promise<Task> {
    return this.tasksService.updateTaskStatus(id, status, user);
  }

  @Mutation(() => Task)
  async deleteTask(
    @Args({ name: "id", type: () => Int }) id: number,
    @GetUser() user: User,
  ): Promise<Task> {
    return this.tasksService.deleteTask(id, user);
  }
}
