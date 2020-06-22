import { Entity, PrimaryGeneratedColumn, Column } from "typeorm";

export abstract class Base {
  @PrimaryGeneratedColumn()
  id: number;

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
