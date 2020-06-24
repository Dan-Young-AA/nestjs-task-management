import { Test } from "@nestjs/testing";
import { TaskRepository } from "./tasks.repsitory";
import { TasksService } from "./tasks.service";
import { User } from "../auth/user.entity";

const mockUser = { username: "Test user" } as User;

const mockTaskRepository = (): Partial<TaskRepository> => ({
  getTasks: jest.fn().mockResolvedValue([]),
});

describe("TasksService", () => {
  let tasksService: TasksService;
  let taskRepository: TaskRepository;

  beforeEach(async () => {
    const module = await Test.createTestingModule({
      providers: [
        TasksService,
        { provide: TaskRepository, useFactory: mockTaskRepository },
      ],
    }).compile();

    tasksService = await module.get(TasksService);
    taskRepository = await module.get(TaskRepository);
  });

  describe("getTasks", () => {
    it("gets all tasks from the repository", async () => {
      expect(taskRepository.getTasks).not.toHaveBeenCalled();

      const result = await tasksService.getTasks({}, mockUser);
      expect(result).toEqual([]);
      expect(taskRepository.getTasks).toHaveBeenCalled();
    });
  });
});
