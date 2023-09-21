import {
  Entity,
  JoinColumn,
  ManyToOne,
  PrimaryGeneratedColumn,
  Unique,
} from "typeorm";
import { BaseDate } from "./BaseDate";
import { User } from "./User";

@Entity()
@Unique(["follower", "following"])
export class Follow extends BaseDate {
  @PrimaryGeneratedColumn("uuid")
  id: string;

  @ManyToOne(() => User, { onDelete: "CASCADE" })
  @JoinColumn({ name: "followingId" })
  following: User;

  @ManyToOne(() => User, { onDelete: "CASCADE" })
  @JoinColumn({ name: "followerId" })
  follower: User;
}
