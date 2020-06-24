import {
  Entity,
  Column,
  OneToOne,
  OneToMany,
  PrimaryColumn,
  JoinColumn,
} from "typeorm";
import { User } from "./User";
import { Item } from "./Item";

@Entity()
export class UserMeta {
  @PrimaryColumn()
  userId: number;

  @OneToOne((type) => User, (user) => user.user_meta, { primary: true })
  @JoinColumn({ name: "userId" })
  user: User;

  @OneToMany((type) => Item, (item) => item.user_meta)
  item: Item[];

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
