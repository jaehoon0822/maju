import {
  Column,
  Entity,
  JoinColumn,
  ManyToOne,
  PrimaryGeneratedColumn,
  Unique,
} from "typeorm";
import { BaseDate } from "./BaseDate";
import { Post } from "./Post";
import { User } from "./User";

@Entity()
@Unique(["post", "user"])
export class Likes extends BaseDate {
  @PrimaryGeneratedColumn("uuid")
  id: string;

  @Column()
  userId: string;

  @Column()
  postId: string;

  @ManyToOne(() => Post, (post) => post.id, { onDelete: "CASCADE" })
  @JoinColumn({ name: "postId" })
  post: Post;

  @ManyToOne(() => User, (user) => user.id, { onDelete: "CASCADE" })
  @JoinColumn({ name: "userId" })
  user: User;
}
