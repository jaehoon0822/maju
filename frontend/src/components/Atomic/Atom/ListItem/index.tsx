import React from "react";
import classNames from "classnames";
import module from "./ListItem.module.css";
import { ListItemProps } from "./ListItem.type";
import Link from "next/link";
import MoreVert from "@mui/icons-material/MoreVert";

const ListItem = ({
  href,
  img,
  title,
  active = false,
  more = false,
}: ListItemProps) => {
  return (
    <Link href={href}>
      <div
        className={classNames(module.listItem_wrapper, active && module.active)}
      >
        {img ? <div>{img}</div> : null}
        <div className={classNames(module.listItem_title)}>
          <span>{title}</span>
        </div>
        {more ? (
          <div className={classNames(module.listItem_more)}>
            <MoreVert />
          </div>
        ) : null}
      </div>
    </Link>
  );
};

export { ListItem };
