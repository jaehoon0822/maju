import {
  Column,
  Entity,
  JoinTable,
  ManyToMany,
  PrimaryGeneratedColumn,
} from "typeorm";
import { BaseDate } from "./BaseDate";
import { Post } from "./Post";

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

  @ManyToMany(() => User, (user) => user.followers, {
    onDelete: "CASCADE",
  })
  @JoinTable({
    name: "follows",
    joinColumn: { name: "following_id", referencedColumnName: "id" },
    inverseJoinColumn: { name: "follower_id", referencedColumnName: "id" },
  })
  followers: User[];

  @ManyToMany(() => User, (user) => user.followings, { onDelete: "CASCADE" })
  @JoinTable({
    name: "follows",
    joinColumn: { name: "follower_id", referencedColumnName: "id" },
    inverseJoinColumn: { name: "following_id", referencedColumnName: "id" },
  })
  followings: User[];

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
