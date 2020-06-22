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

@JsonController()
export class UserController {
  private repository: Repository<User>;
  constructor() {
    this.repository = getRepository(User);
  }

  @Get("/users")
  getAll() {
    return this.repository.findAndCount();
  }

  @Get("/users/:id")
  get(@Param("id") id: number) {
    return this.repository.findOneOrFail(id);
  }

  @Post("/users/save")
  post(@Body() user: User) {
    const new_user = this.repository.create(user);
    return this.repository.save(new_user);
  }
}
