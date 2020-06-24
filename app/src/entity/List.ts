import { Entity, Column, ManyToOne, JoinColumn, ManyToMany } from "typeorm";
import { Base } from "./Base";
import { Item } from "./Item";

@Entity()
export class List extends Base {
  @Column()
  name: string;

  @ManyToMany((type) => Item, (item) => item.list)
  item: Item[];

  //   @ManyToMany((type) => Set, (set) => set.list)
  //   set: Set[];
}
