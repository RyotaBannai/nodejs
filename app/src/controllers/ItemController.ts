import { Get, Post, JsonController, Param, Body } from "routing-controllers";
import { Item } from "../entity/Item";
import { List } from "../entity/List";
import { Repository, getRepository, createQueryBuilder } from "typeorm";
import { ItemList } from "../entity/ItemList";
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
    const this_item: Item = await this.repository.findOneOrFail(data.id);
    console.log(this_item);

    let item_list: ItemList;
    if (data.type === "list") {
      const list: List = await getRepository(List).findOneOrFail(data.data_id);
      item_list = await getRepository(ItemList).create();
      item_list.item = this_item;
      item_list.list = list;
      getRepository(ItemList).save(item_list);
      return item_list;
    }

    // } else if (data.type === "set") {
    //return this.repository.save(this_item);
  }

  @Get("/items_id/:id")
  getById(@Param("id") id: number) {
    return this.repository.findByIds([id], {
      relations: ["listConnector", "listConnector.list"],
    });
  }

  @Get("/items/:id")
  get(@Param("id") id: number) {
    return this.repository.find({
      relations: ["user_meta", "user_meta.user", "list"],
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
