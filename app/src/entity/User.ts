import { Entity, Column, OneToOne } from "typeorm";
import { Base } from "./Base";
import { UserWord } from "./UserWord";
@Entity()
export class User extends Base {
  @Column()
  firstName: string;

  @Column()
  lastName: string;

  @Column()
  age: number;

  @OneToOne((type) => UserWord, (user_word) => user_word.user)
  user_word: UserWord;
}
