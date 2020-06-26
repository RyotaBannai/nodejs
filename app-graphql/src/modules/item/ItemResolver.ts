import {
  Arg,
  Args,
  Int,
  Mutation,
  Query,
  Resolver,
  Ctx,
  FieldResolver,
  Root,
} from "type-graphql";
import { Item, addItemInput } from "../../entity/Item";
import { Context } from "vm";
import { List } from "../../entity/List";
import { ItemList } from "../../entity/ItemList";

@Resolver((of) => Item)
export class ItemResolver {
  @Mutation(() => Item)
  async createItem(
    @Arg("data") newItemData: addItemInput, // client should use data as key and value of object te same as addItemInput type
    @Ctx() ctx: Context
  ): Promise<Item> {
    console.log(ctx); // { _extensionStack: GraphQLExtensionStack { extensions: [] } }
    const new_item = Item.create(newItemData);
    return await new_item.save();
  }

  @Query((returns) => Item)
  async getOneItem(@Arg("id") id: number): Promise<Item | undefined> {
    const item = await Item.findOne(id, {
      relations: ["listConnector", "listConnector.list"],
    });
    console.log(item);
    return item;
  }

  @FieldResolver()
  async list(@Root() item: Item) {
    const this_item = await Item.findOneOrFail(item.id, {
      relations: ["listConnector", "listConnector.list"],
    });
    const list: List[] = [];
    for (const item_list of this_item.listConnector) {
      list.push(item_list.list);
    }
    return list;
  }
}
