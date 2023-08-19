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

@Entity()
export class Post extends BaseDate {
  @PrimaryGeneratedColumn("uuid")
  id: string;

  @Column("varchar", { length: 255 })
  content: string;

  @Column("varchar", { length: 255, nullable: true })
  img: string;

  @ManyToOne(() => User, (user) => user.id, { cascade: true })
  @JoinColumn({ name: "user_id" })
  user: User;

  @ManyToMany(() => Hashtag, (hashtags) => hashtags.id)
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
  hashtag: Hashtag[];

  @OneToMany(() => Likes, (likes) => likes.post)
  likePosts: Likes[];
}
