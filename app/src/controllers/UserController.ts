import {
  Get,
  Post,
  Render,
  JsonController,
  Controller,
  Param,
  Body,
} from "routing-controllers";
import { User } from "../entity/User";
import { Repository, getRepository } from "typeorm";
import { UserWord } from "../entity/UserWord";

@JsonController()
export class UserController {
  private repository: Repository<User>;
  private wordRepository: Repository<UserWord>;
  constructor() {
    this.repository = getRepository(User);
    this.wordRepository = getRepository(UserWord);
  }

  @Get("/users")
  getAll() {
    return this.repository.findAndCount();
  }

  @Get("/users/:id")
  get(@Param("id") id: number) {
    return this.repository.findOne(id, { relations: ["user_word"] });
  }

  @Post("/users/save")
  post(@Body() user: User) {
    const user_word = new UserWord();
    user.user_word = user_word;
    console.log(user);
    const new_user = this.repository.create(user);
    return this.repository.save(new_user);
  }
}
