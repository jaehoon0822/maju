import {
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
  @PrimaryGeneratedColumn()
  id: string;

  @ManyToOne(() => Post, (post) => post.id, { onDelete: "CASCADE" })
  @JoinColumn({ name: "post_id" })
  post: Post;

  @ManyToOne(() => User, (user) => user.id, { onDelete: "CASCADE" })
  @JoinColumn({ name: "user_id" })
  user: User;
}
