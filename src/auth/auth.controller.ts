import { Body, Controller, Post, ValidationPipe } from "@nestjs/common";

import { AuthService } from "./auth.service";
import { AuthCredentialsDto } from "./dto";

@Controller("auth")
export class AuthController {
  constructor(private authService: AuthService) {}

  @Post("/signup")
  public async signUp(
    @Body(ValidationPipe) authCredentialsDto: AuthCredentialsDto,
  ) {
    return this.authService.signUp(authCredentialsDto);
  }

  @Post("/signin")
  public async signIn(
    @Body(ValidationPipe) authCredentialsDto: AuthCredentialsDto,
  ): Promise<{ accessToken: string }> {
    return this.authService.signIn(authCredentialsDto);
  }
}
