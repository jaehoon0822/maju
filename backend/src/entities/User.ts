import {
  Column,
  Entity,
  JoinTable,
  ManyToMany,
  OneToMany,
  PrimaryGeneratedColumn,
} from "typeorm";
import { BaseDate } from "./BaseDate";
import { Post } from "./Post";
import { Follow } from "./Follow";

@Entity()
export class User extends BaseDate {
  @PrimaryGeneratedColumn("uuid")
  id: string;

  @Column("varchar", { length: 255 })
  email: string;

  @Column("varchar", { length: 255 })
  nick: string;

  @Column("varchar", { length: 255, nullable: true })
  password: string;

  @Column("varchar", { length: 255, nullable: true })
  provider: string;

  @Column("varchar", { length: 255, nullable: true })
  snsId: string;

  @OneToMany(() => Follow, (follow) => follow.follower)
  followings: Follow[];

  @OneToMany(() => Follow, (follow) => follow.following)
  followers: Follow[];

  @ManyToMany(() => Post, (post) => post.id, { onDelete: "CASCADE" })
  @JoinTable({
    name: "like",
    joinColumn: {
      name: "post_id",
      referencedColumnName: "id",
    },
    inverseJoinColumn: {
      name: "user_id",
      referencedColumnName: "id",
    },
  })
  posts: Post[];
}
