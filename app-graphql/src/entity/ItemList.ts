import {
  Entity,
  PrimaryColumn,
  ManyToOne,
  JoinColumn,
  UpdateDateColumn,
  CreateDateColumn,
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

  @UpdateDateColumn()
  updated_at: string;

  @CreateDateColumn()
  created_at: string;
}
