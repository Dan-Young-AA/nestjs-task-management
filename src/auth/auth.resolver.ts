import { Resolver, Mutation, Args } from "@nestjs/graphql";
import { AuthService } from "./auth.service";
import { SignInResponseEntity } from "./sign-in-response.entity";

@Resolver("Auth")
export class AuthResolver {
  constructor(private authService: AuthService) {}

  @Mutation(() => Boolean)
  public async signUp(
    @Args("username") username: string,
    @Args("password") password: string,
  ): Promise<boolean> {
    await this.authService.signUp({ username, password });
    return true;
  }

  @Mutation(() => SignInResponseEntity)
  public async signIn(
    @Args("username") username: string,
    @Args("password") password: string,
  ): Promise<SignInResponseEntity> {
    return this.authService.signIn({ username, password });
  }
}
