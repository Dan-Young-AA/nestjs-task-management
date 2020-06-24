import { createParamDecorator, ExecutionContext } from "@nestjs/common";

import { User } from "./user.entity";
import { GqlExecutionContext } from "@nestjs/graphql";

export const GetUser = createParamDecorator(
  (data: unknown, context: ExecutionContext): User => {
    const ctx = GqlExecutionContext.create(context);
    return ctx.getContext().req.user;
  },
);
