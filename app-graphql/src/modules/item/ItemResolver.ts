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
  createParamDecorator,
} from "type-graphql";
import { Item, addItemInput } from "../../entity/Item";
import { Context } from "vm";
import { List } from "../../entity/List";
import { ItemList } from "../../entity/ItemList";

@Resolver((of) => Item)
export class ItemResolver {
  private itemCollection: Item | Item[] = [];

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
  async getOneItem(
    @Arg("id") id: number,
    @routinizedFindById() item: Item
  ): Promise<Item | undefined> {
    return item;
  }

  @FieldResolver()
  async list(@Root() item: Item) {
    this.itemCollection = await Item.findOneOrFail(item.id, {
      relations: ["listConnector", "listConnector.list"],
    });
    const this_list: List[] = [];
    for (const { list } of this.itemCollection.listConnector) {
      this_list.push(list);
    }
    return this_list;
  }
}

function routinizedFindById() {
  return createParamDecorator((params) => {
    return Item.findOneOrFail(params.args.id, {
      relations: ["listConnector", "listConnector.list"],
    });
  });
}
