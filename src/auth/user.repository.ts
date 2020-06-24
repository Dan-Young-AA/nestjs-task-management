import * as bcrypt from "bcrypt";
import { Repository, EntityRepository } from "typeorm";

import { AuthCredentialsDto } from "./dto";
import { User } from "./user.entity";
import { ConflictException } from "@nestjs/common";

@EntityRepository(User)
export class UserRepository extends Repository<User> {
  public async signUp({
    username,
    password,
  }: AuthCredentialsDto): Promise<void> {
    const user = new User();
    user.username = username;
    user.salt = await bcrypt.genSalt();
    user.password = await this.hashPassword(password, user.salt);
    console.log({ user });
    try {
      await user.save();
    } catch (err) {
      // Duplicate entry
      if (err.code === "23505") {
        throw new ConflictException("Username already exists");
      } else {
        throw err;
      }
    }
  }

  public async validateUserPassword({
    username,
    password,
  }: AuthCredentialsDto): Promise<string | null> {
    const user = await this.findOne({ username });
    if (user && (await user.validatePassword(password))) {
      return user.username;
    }

    return null;
  }

  private async hashPassword(password: string, salt: string) {
    return bcrypt.hash(password, salt);
  }
}
