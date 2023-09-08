import { Column, Entity, ManyToOne, PrimaryGeneratedColumn } from "typeorm";
import { Post } from "./Post";

@Entity()
export class Image {
  @PrimaryGeneratedColumn("uuid")
  id: string;

  @ManyToOne(() => Post, (post) => post.img, { onDelete: "CASCADE" })
  post: Post;

  @Column()
  img: string;
}
