import { Get, Post, JsonController, Param, Body } from "routing-controllers";
import { User } from "../entity/User";
import { Repository, getRepository } from "typeorm";
import { UserMeta } from "../entity/UserMeta";

@JsonController()
export class UserController {
  private repository: Repository<User>;
  private wordRepository: Repository<UserMeta>;
  constructor() {
    this.repository = getRepository(User);
    this.wordRepository = getRepository(UserMeta);
  }

  @Get("/users")
  getAll() {
    return this.repository.findAndCount();
  }

  @Get("/users/:id")
  get(@Param("id") id: number) {
    console.log("fetch");
    return this.repository.findOne(id, { relations: ["user_meta"] });
  }

  @Post("/users/save")
  post(@Body() user: User) {
    const user_meta = new UserMeta();
    user.user_meta = user_meta;
    console.log(user);
    const new_user = this.repository.create(user);
    return this.repository.save(new_user);
  }
}
