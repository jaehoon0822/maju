import {
  Column,
  Entity,
  JoinColumn,
  JoinTable,
  ManyToMany,
  ManyToOne,
  PrimaryGeneratedColumn,
} from "typeorm";
import { BaseDate } from "./BaseDate";
import { User } from "./User";
import { Hashtag } from "./Hashtag";

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
      name: "hashtag_id",
      referencedColumnName: "id",
    },
    inverseJoinColumn: {
      name: "post_id",
      referencedColumnName: "id",
    },
  })
  hashtag: Hashtag[];

  @ManyToMany(() => User, (user) => user.id, { onDelete: "CASCADE" })
  @JoinTable({
    name: "like",
    joinColumn: {
      name: "user_id",
      referencedColumnName: "id",
    },
    inverseJoinColumn: {
      name: "post_id",
      referencedColumnName: "id",
    },
  })
  users: User[];
}
