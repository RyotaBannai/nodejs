import { Entity, Column } from "typeorm";
import { Base } from "./Base";

@Entity()
export class Word extends Base {
  @Column()
  name: string;

  @Column({
    default: 1,
  })
  created_by: number;
}
