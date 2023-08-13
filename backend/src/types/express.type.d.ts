import { User as UserEntity } from "@/entities/User";
import { Express } from "express";

declare global {
  namespace Express {
    interface User extends UserEntity {}
  }
}
