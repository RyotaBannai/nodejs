import { Get, Render, JsonController, Controller } from "routing-controllers";
import { User } from "../entity/User";
import { EntityFromParam } from "typeorm-routing-controllers-extensions";

@JsonController()
export class UserController {
  @Get("/users/:id")
  get(@EntityFromParam("id") user: User) {
    //return { user: user };
    return user;
  }
}
