import {
  Arg,
  Args,
  Int,
  Mutation,
  Query,
  Resolver,
  Ctx,
  Authorized,
  ObjectType,
  Field,
  FieldResolver,
  Root,
  createParamDecorator,
} from "type-graphql";
import { Context } from "vm";
import {
  User,
  createUserInput,
  createToken,
  Token,
  TokenEntity,
} from "../../entity/User";
import * as bcrypt from "bcrypt";
import { userInfo } from "os";

@Resolver((of) => User)
export class UserResolver {
  private saltRounds = 10;

  @Mutation(() => TokenEntity)
  async createUser(@Arg("data") newUserData: createUserInput): Promise<Token> {
    const new_user = User.create(newUserData);
    new_user.passwordHash = await this.getHash(newUserData.password);
    await new_user.save();
    return await createToken(new_user.id);
  }

  async getHash(password: string): Promise<string> {
    return bcrypt.hash(password, this.saltRounds);
  }

  async compareHash(password: string, hash: string): Promise<boolean> {
    return bcrypt.compare(password, hash);
  }

  @Authorized(["ADMIN"])
  @Query((returns) => User)
  async getOneUser(@Arg("id") id: number): Promise<User | undefined> {
    return await User.findOneOrFail(id);
  }
}
