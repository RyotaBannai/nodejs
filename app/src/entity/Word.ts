import { Entity, Column, ManyToOne } from "typeorm";
import { Base } from "./Base";
import { UserWord } from "./UserWord";

@Entity()
export class Word extends Base {
  @Column()
  name: string;

  @ManyToOne((type) => UserWord, (user_word) => user_word.word)
  user_word: UserWord;
}
