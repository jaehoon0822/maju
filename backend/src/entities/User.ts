import {
  Column,
  Entity,
  OneToMany,
  PrimaryGeneratedColumn,
  Unique,
} from "typeorm";
import { BaseDate } from "./BaseDate";
import { Follow } from "./Follow";
import { Likes } from "./Likes";

@Entity()
@Unique(["email", "nick"])
export class User extends BaseDate {
  @PrimaryGeneratedColumn("uuid")
  id: string;

  @Column("varchar", { length: 255 })
  email: string;

  @Column("varchar", { length: 255 })
  nick: string;

  @Column("varchar", { length: 255, nullable: true })
  img: string;

  @Column("varchar", { length: 255, nullable: true })
  password: string;

  @Column("varchar", { length: 255, nullable: true })
  provider: string;

  @Column("varchar", { length: 255, nullable: true })
  snsId: string;

  @OneToMany(() => Follow, (follow) => follow.following)
  followings: Follow[];

  @OneToMany(() => Follow, (follow) => follow.follower)
  followers: Follow[];

  @OneToMany(() => Likes, (likes) => likes.user)
  likeUsers: Likes[];
}
