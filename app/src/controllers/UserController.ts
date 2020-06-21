import { Get, Render, JsonController, Controller } from "routing-controllers";
import { User } from "../entity/User";
import { EntityFromParam } from "typeorm-routing-controllers-extensions";

//@JsonController()
@Controller()
export class UserController {
  @Get("/users/:id")
  @Render("index")
  get(@EntityFromParam("id") user: User) {
    return { title: "Hey", message: "Hello there!" };
  }
}
