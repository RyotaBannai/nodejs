import { Get, Post, JsonController, Param, Body } from "routing-controllers";
import { Repository, getRepository, createQueryBuilder } from "typeorm";
import { List } from "../entity/List";

@JsonController()
export class ListController {
  private repository: Repository<List>;
  constructor() {
    this.repository = getRepository(List);
  }

  @Get("/lists")
  getAll() {
    return this.repository.findAndCount();
  }

  @Get("/lists/:id")
  get(@Param("id") id: number) {
    return this.repository.find({
      where: { id: id },
    });
  }

  @Post("/lists/save")
  async post(@Body() list: List) {
    // let folder: List | unknown = await this.repository.findOne({
    //   where: { id: list. },
    // });
    console.log(list);
    const new_list: List = this.repository.create(list);
    console.log(new_list);
    //if (parent instanceof List) new_list.folder = folder;
    return this.repository.save(new_list);
  }
}
