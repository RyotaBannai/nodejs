import { Entity, Column, OneToMany, JoinColumn, ManyToMany } from "typeorm";
import { Base } from "./Base";
import { ItemList } from "./ItemList";

@Entity()
export class List extends Base {
  @Column()
  name: string;

  @OneToMany((type) => ItemList, (item_list) => item_list.list)
  itemConnector: ItemList[];

  // @Column({ nullable: true })
  // setConnector: ItemSet[]];
}
