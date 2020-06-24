import { Entity, Column, ManyToOne, JoinColumn } from "typeorm";
import { Base } from "./Base";
import { UserMeta } from "./UserMeta";

@Entity()
export class Word extends Base {
  @Column()
  name: string;

  @ManyToOne((type) => UserMeta, (user_meta) => user_meta.word)
  user_meta: UserMeta;
}
