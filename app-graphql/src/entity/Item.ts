import { Entity, Column, ManyToOne, OneToMany, JoinTable } from "typeorm";
import { Ctx, Field, ID, ObjectType, ArgsType } from "type-graphql";
import { Base } from "./Base";
import { UserMeta } from "./UserMeta";
import { ItemList } from "./ItemList";
type ItemType = "word" | "phrase" | "sentence" | "quiz";

@ArgsType()
@ObjectType()
@Entity()
export class Item extends Base {
  @Field()
  @Column("text")
  data: string;

  @Field()
  @Column()
  type: ItemType;

  @OneToMany((type) => ItemList, (item_list) => item_list.item)
  @JoinTable()
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
