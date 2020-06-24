import {
  Entity,
  Column,
  ManyToOne,
  JoinColumn,
  ManyToMany,
  JoinTable,
} from "typeorm";
import { Base } from "./Base";
import { UserMeta } from "./UserMeta";
import { List } from "./List";

type ItemType = "word" | "phrase" | "sentence" | "quiz";

@Entity()
export class Item extends Base {
  @Column("text")
  data: string;

  @Column()
  type: ItemType;

  @ManyToMany((type) => List, (list) => list.item)
  @JoinTable()
  list: List[];

  // @Column({ nullable: true })
  // set: List | null;

  @ManyToOne((type) => UserMeta, (user_meta) => user_meta.item)
  user_meta: UserMeta;
}
