import React from "react";
import classNames from "classnames";
import Person from "@mui/icons-material/Person";
import module from "./Avatar.module.css";
import Link from "next/link";
import Image from "next/image";
import { AvatarProps } from "./Avatar.type";

const Avatar = ({ avatar, href }: AvatarProps) => {
  return (
    <div aria-label="avatar" className={classNames(module.avatar_wrapper)}>
      {avatar ? (
        href ? (
          <Link href={href} className="group">
            <div className="relative w-8 h-8">
              <Image
                src={avatar}
                alt="avatar"
                fill
                className="rounded-full transition-all group-hover:brightness-50 group-focus:brightness-50 object-cover object-center"
              />
            </div>
          </Link>
        ) : (
          <div className="group">
            <div className="relative w-8 h-8">
              <Image
                src={avatar}
                alt="avatar"
                fill
                className="rounded-full transition-all group-hover:brightness-50 group-focus:brightness-50 object-cover object-center"
              />
            </div>
          </div>
        )
      ) : href ? (
        <Link href={href} className="group">
          <Person
            className={classNames(
              module.avatar_person,
              "group-hover:bg-slate-800 group-hover:fill-white group-focus:bg-slate-800 group-focus:fill-white"
            )}
          />
        </Link>
      ) : (
        <div className="group">
          <Person
            className={classNames(
              module.avatar_person,
              "group-hover:bg-slate-800 group-hover:fill-white group-focus:bg-slate-800 group-focus:fill-white"
            )}
          />
        </div>
      )}
    </div>
  );
};

export { Avatar };
