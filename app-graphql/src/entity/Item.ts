import { Entity, Column, ManyToOne, OneToMany, JoinColumn } from "typeorm";
import { Ctx, Field, ID, ObjectType, ArgsType, InputType } from "type-graphql";
import { Base } from "./Base";
import { UserMeta } from "./UserMeta";
import { ItemList } from "./ItemList";
type ItemType = "word" | "phrase" | "sentence" | "quiz";

@ObjectType()
@Entity()
export class Item extends Base {
  @Field()
  @Column("text")
  data: string;

  @Field()
  @Column()
  type: ItemType;

  @Field((type) => [ItemList])
  @OneToMany((type) => ItemList, (item_list) => item_list.item)
  @JoinColumn()
  listConnector: ItemList[];

  // @Column({ nullable: true })
  // setConnector: ItemSet[]];

  @ManyToOne((type) => UserMeta, (user_meta) => user_meta.item)
  user_meta: UserMeta;

  // helpers - index calculations
  // get startIndex(): number {
  //   return this.skip;
  // }
  // get endIndex(): number {
  //   return this.skip + this.take;
  // }
}

@InputType()
export class ItemArgs implements Partial<Item> {
  @Field((type) => String, { nullable: false })
  data: string;

  @Field((type) => String, { nullable: false })
  type: ItemType;
}
