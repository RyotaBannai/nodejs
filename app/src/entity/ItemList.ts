import {
  Entity,
  Column,
  PrimaryColumn,
  ManyToOne,
  JoinColumn,
  ManyToMany,
} from "typeorm";
import { Base } from "./Base";
import { Item } from "./Item";
import { List } from "./List";

@Entity()
export class ItemList {
  @PrimaryColumn()
  itemId: number;

  @PrimaryColumn()
  listId: number;

  @ManyToOne((type) => Item, (item) => item.listConnector)
  @JoinColumn({ name: "itemId" })
  item: Item;

  @ManyToOne((type) => List, (list) => list.itemConnector)
  @JoinColumn({ name: "listId" })
  list: List;

  @Column({
    type: "datetime",
    default: Date.now(),
  })
  updated_at: string;

  @Column({
    type: "datetime",
    default: Date.now(),
  })
  created_at: string;
}
