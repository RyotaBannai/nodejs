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
  private itemsCollection: Item | Item[] = [];
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
    this.itemsCollection = await Item.findOneOrFail(id, {
      relations: ["listConnector", "listConnector.list"],
    });
    console.log(this.itemsCollection);
    return this.itemsCollection;
  }

  @FieldResolver()
  async list(@Root() item: Item) {
    this.itemsCollection = await Item.findOneOrFail(item.id, {
      relations: ["listConnector", "listConnector.list"],
    });
    const this_list: List[] = [];
    for (const { list } of this.itemsCollection.listConnector) {
      this_list.push(list);
    }
    return this_list;
  }
}
