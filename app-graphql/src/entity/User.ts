import { Entity, Column, OneToOne, JoinColumn } from "typeorm";
import {
  Field,
  InputType,
  ObjectType,
  ArgsType,
  AuthChecker,
} from "type-graphql";
import { Context } from "vm";
import * as jwt from "jsonwebtoken";
import { Base } from "./Base";
import { UserMeta } from "./UserMeta";

@ObjectType()
@Entity()
export class User extends Base {
  @Field()
  @Column({ nullable: true })
  name: string;

  @Field()
  @Column({ unique: true })
  email: string;

  password: string;

  @Field()
  @Column({ nullable: true })
  passwordHash?: string; //  @Column({ select: false })

  //@Field()
  @OneToOne((type) => UserMeta, (user_meta) => user_meta.user, {
    cascade: true,
  })
  user_meta: UserMeta;
}

@InputType({ description: "Create New User Data" })
export class createUserInput implements Partial<User> {
  @Field((type) => String, { nullable: true })
  name: string;

  @Field((type) => String, { nullable: true })
  email: string;

  @Field((type) => String, { nullable: true })
  password: string;
}

export async function createToken(id: number): Promise<Token> {
  const expiresIn = 60 * 60;
  const secretOrKey = "secret";
  const user = { id };
  const token = jwt.sign(user, secretOrKey, { expiresIn });
  return { expires_in: expiresIn, token };
}

export interface Token {
  expires_in: number;
  token: string;
}

@ObjectType()
export class TokenEntity implements Token {
  @Field()
  expires_in: number;
  @Field()
  token: string;
}

export const customAuthChecker: AuthChecker<Context> = (
  { root, args, context, info },
  roles
) => {
  console.log(args);
  console.log(roles);
  console.log(context);

  // here you can read user from context
  // and check his permission in db against `roles` argument
  // that comes from `@Authorized`, eg. ["ADMIN", "MODERATOR"]

  return true; // or false if access denied
};
