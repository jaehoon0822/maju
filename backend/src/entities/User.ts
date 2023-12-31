import {
  Column,
  Entity,
  JoinColumn,
  OneToMany,
  OneToOne,
  PrimaryGeneratedColumn,
  Unique,
} from "typeorm";
import { BaseDate } from "./BaseDate";
import { Follow } from "./Follow";
import { Likes } from "./Likes";
import { Profile } from "./Profile";

@Entity()
@Unique(["email", "nick"])
export class User extends BaseDate {
  @PrimaryGeneratedColumn("uuid")
  id: string;

  @Column("varchar", { length: 255 })
  email: string;

  @Column("varchar", { length: 255 })
  nick: string;

  @Column("varchar", { length: 255, nullable: true, select: false })
  password: string;

  @Column("varchar", { length: 255, nullable: true })
  provider: string;

  @Column("varchar", { length: 255, nullable: true })
  snsId: string;

  @OneToOne(() => Profile)
  @JoinColumn()
  profile: Profile;

  @OneToMany(() => Follow, (follow) => follow.following)
  followings: Follow[];

  @OneToMany(() => Follow, (follow) => follow.follower)
  followers: Follow[];

  @OneToMany(() => Likes, (likes) => likes.user)
  likes: Likes[];
}
