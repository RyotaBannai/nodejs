import { Entity, Column, ManyToOne, OneToMany, JoinColumn } from "typeorm";
import { Ctx, Field, ID, ObjectType, ArgsType, InputType } from "type-graphql";
import { Base } from "./Base";
import { UserMeta } from "./UserMeta";
import { ItemList } from "./ItemList";
import { List } from "./List";
type ItemType = "word" | "phrase" | "sentence" | "quiz";

@ObjectType()
@Entity()
export class Item extends Base {
  @Field()
  @Column("text")
  data: string;

  @Field()
  @Column()
  type: ItemType; // should use graphql enum type

  @Field((type) => [ItemList])
  @OneToMany((type) => ItemList, (item_list) => item_list.item)
  @JoinColumn()
  listConnector: ItemList[];

  // @Column({ nullable: true })
  // setConnector: ItemSet[]];

  @ManyToOne((type) => UserMeta, (user_meta) => user_meta.item)
  user_meta: UserMeta;

  @Field((type) => [List])
  list: List[];

  // helpers - index calculations
  // get startIndex(): number {
  //   return this.skip;
  // }
  // get endIndex(): number {
  //   return this.skip + this.take;
  // }
}

@InputType({ description: "New item data" })
export class addItemInput implements Partial<Item> {
  @Field((type) => String, { nullable: false })
  data: string;

  @Field((type) => String, { nullable: false })
  type: ItemType;
}
