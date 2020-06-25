import { Entity, Column, OneToOne, JoinColumn } from "typeorm";
import { Base } from "./Base";
import { UserMeta } from "./UserMeta";
@Entity()
export class User extends Base {
  @Column()
  firstName: string;

  @Column()
  lastName: string;

  @Column()
  age: number;

  @OneToOne((type) => UserMeta, (user_meta) => user_meta.user, {
    cascade: true,
  })
  user_meta: UserMeta;
}
