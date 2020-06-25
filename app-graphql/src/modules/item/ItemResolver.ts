import { Arg, Args, Int, Mutation, Query, Resolver } from "type-graphql";
import { Item, ItemArgs } from "../../entity/Item";

@Resolver()
export class ItemResolver {
  //   @Mutation(() => Item)
  //   async createItem(@Args() { data, type }: ItemArgs): Promise<Item | string> {
  //     const new_item = Item.create({ data: data, type: type });
  //     return await new_item.save().catch(() => "error on save");
  //   }

  @Query((returns) => Item)
  async getOneItem(@Arg("id") id: number): Promise<Item | undefined> {
    const item = await Item.findOne(id, {
      relations: ["listConnector", "listConnector.list"],
    });
    console.log(item);
    return item;
  }
}
