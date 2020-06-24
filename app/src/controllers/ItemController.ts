import { Get, Post, JsonController, Param, Body } from "routing-controllers";
import { Item } from "../entity/Item";
import { Repository, getRepository, createQueryBuilder } from "typeorm";
import { List } from "../entity/List";
import { UserMeta } from "../entity/UserMeta";

type DataType = "set" | "list";
interface AddType {
  id: number;
  data_id: number;
  type: DataType;
}

@JsonController()
export class ItemController {
  private repository: Repository<Item>;
  constructor() {
    this.repository = getRepository(Item);
  }

  @Get("/items")
  getAll() {
    return this.repository.findAndCount();
  }

  @Post("/items/add/")
  async addToList(@Body() data: AddType) {
    const this_item: Item = await this.repository.findOneOrFail(data.id, {
      relations: ["list"],
    });
    console.log(this_item);

    let new_relation: List | undefined; // Set | List // should wrap with Promise because of the inside conditional and can be next statement run earlier than this bock
    if (data.type === "list") {
      new_relation = await getRepository(List).findOne({
        where: {
          id: data.data_id,
        },
      });
    }
    if (new_relation instanceof List) {
      console.log(new_relation);
      if (this_item.list.length > 0) {
        this_item.list = [...this_item.list, new_relation];
      } else {
        this_item.list = [new_relation]; // quick fixed by declare something somewhere
      }
    }

    return this.repository.save(this_item);

    // } else if (data.type === "set") {
    //   new_relation = getRepository(Set).findOne({
    //     where: {
    //       id: data.data_id,
    //     },
    //   });
    //   new_relation.then((value) => {
    //     if (value instanceof List) this_item.list = [...this_item.list, value]; // quick fixed by declare something somewhere
    //   });
  }

  @Get("/items_id/:id")
  getById(@Param("id") id: number) {
    return this.repository.findByIds([id], {
      relations: ["list"],
    });
  }

  @Get("/items/:id")
  get(@Param("id") id: number) {
    return this.repository.find({
      relations: ["user_meta", "user_meta.user, list"],
      where: {
        user_meta: {
          userId: id,
        },
      },
    });
  }

  @Post("/items/save")
  async post(@Body() word: Item) {
    const user_item: UserMeta | unknown = await getRepository(UserMeta).findOne(
      {
        where: { userId: 2 },
      }
    );
    const new_item: Item = this.repository.create(word);
    if (user_item instanceof UserMeta) new_item.user_meta = user_item;
    return this.repository.save(new_item);
  }
}
