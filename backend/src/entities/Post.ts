import {
  Column,
  Entity,
  JoinColumn,
  JoinTable,
  ManyToMany,
  ManyToOne,
  OneToMany,
  PrimaryGeneratedColumn,
} from "typeorm";
import { BaseDate } from "./BaseDate";
import { User } from "./User";
import { Hashtag } from "./Hashtag";
import { Likes } from "./Likes";
import { Image } from "./Image";

@Entity()
export class Post extends BaseDate {
  @PrimaryGeneratedColumn("uuid")
  id: string;

  @Column("text")
  content: string;

  @ManyToOne(() => User, (user) => user.id, { cascade: true })
  @JoinColumn({ name: "userId" })
  user: User;

  @ManyToMany(() => Hashtag, (hashtags) => hashtags.id)
  @JoinTable({
    name: "postHashtag",
    joinColumn: {
      name: "postId",
      referencedColumnName: "id",
    },
    inverseJoinColumn: {
      name: "hashtagId",
      referencedColumnName: "id",
    },
  })
  hashtag: Hashtag[];

  @OneToMany(() => Likes, (likes) => likes.post)
  likes: Likes[];

  @OneToMany(() => Image, (image) => image.post)
  img: Image[];
}
