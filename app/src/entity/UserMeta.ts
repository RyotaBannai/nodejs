import {
  Entity,
  Column,
  OneToOne,
  OneToMany,
  PrimaryColumn,
  JoinColumn,
} from "typeorm";
import { User } from "./User";
import { Word } from "./Word";

@Entity()
export class UserMeta {
  @PrimaryColumn()
  userId: number;

  @OneToOne((type) => User, (user) => user.user_meta, { primary: true })
  @JoinColumn({ name: "userId" })
  user: User;

  @OneToMany((type) => Word, (word) => word.user_meta)
  word: Word[];

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
