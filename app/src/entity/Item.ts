import {
  Entity,
  Column,
  ManyToOne,
  JoinColumn,
  OneToMany,
  JoinTable,
} from "typeorm";
import { Base } from "./Base";
import { UserMeta } from "./UserMeta";
import { ItemList } from "./ItemList";
type ItemType = "word" | "phrase" | "sentence" | "quiz";

@Entity()
export class Item extends Base {
  @Column("text")
  data: string;

  @Column()
  type: ItemType;

  @OneToMany((type) => ItemList, (item_list) => item_list.item)
  @JoinTable()
  listConnector: ItemList[];

  // @Column({ nullable: true })
  // setConnector: ItemSet[]];

  @ManyToOne((type) => UserMeta, (user_meta) => user_meta.item)
  user_meta: UserMeta;
}
