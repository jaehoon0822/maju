import {
  Column,
  Entity,
  JoinColumn,
  JoinTable,
  ManyToMany,
  PrimaryGeneratedColumn,
} from "typeorm";
import { BaseDate } from "./BaseDate";
import { Post } from "./Post";

@Entity()
export class Hashtag extends BaseDate {
  @PrimaryGeneratedColumn("uuid")
  id: string;

  @Column("varchar", { unique: true, length: 255 })
  title: string;

  @ManyToMany(() => Post, (post) => post.id)
  @JoinTable({
    name: "post_hashtag",
    joinColumn: {
      name: "post_id",
      referencedColumnName: "id",
    },
    inverseJoinColumn: {
      name: "hashtag_id",
      referencedColumnName: "id",
    },
  })
  post: Post[];
}
