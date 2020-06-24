import { IsString, MinLength, MaxLength, Matches } from "class-validator";

export class AuthCredentialsDto {
  @IsString()
  @MinLength(4)
  @MaxLength(20)
  public username!: string;

  @IsString()
  @MinLength(8)
  @MaxLength(256)
  @Matches(/((?=.*\d)|(?=.*\W+))(?![.\n])(?=.*[A-Z])(?=.*[a-z]).*$/, {
    message:
      "Password must contain: 1 upper case letter, 1 lower case length and 1 number or special character",
  })
  public password!: string;
}
