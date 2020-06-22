import { Entity, Column } from "typeorm";
import { Base } from "./Base";

@Entity()
export class User extends Base {
  @Column()
  firstName: string;

  @Column()
  lastName: string;

  @Column()
  age: number;
}
