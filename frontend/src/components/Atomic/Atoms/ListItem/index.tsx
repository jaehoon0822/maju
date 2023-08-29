import React from "react";
import classNames from "classnames";
import module from "./ListItem.module.css";
import { ListItemProps } from "./ListItem.type";
import Link from "next/link";
import MoreVert from "@mui/icons-material/MoreVert";
import { Avatar } from "../Avator";

const ListItem = ({
  href,
  icon,
  img,
  title,
  active = false,
  more = false,
}: ListItemProps) => {
  return (
    <>
      {href === undefined ? (
        <div aria-label="list-item" className="flex justify-c">
          <div
            className={classNames(
              module.listItem_wrapper,
              active && module.active
            )}
          >
            {icon ? <div>{icon}</div> : null}
            {img ? <Avatar avatar={img} /> : null}
            <div className={classNames(module.listItem_title)}>
              <span>{title}</span>
            </div>
            {more ? (
              <div className={classNames(module.listItem_more)}>
                <MoreVert />
              </div>
            ) : null}
          </div>
        </div>
      ) : (
        <Link href={href} aria-label="list-item" className="flex justify-c">
          <div
            className={classNames(
              module.listItem_wrapper,
              active && module.active
            )}
          >
            {icon || img ? (
              icon ? (
                <>
                  <div>{icon}</div>
                  <div
                    className={classNames(
                      module.listItem_title,
                      "md:pl-0 md:hidden"
                    )}
                  >
                    <span>{title}</span>
                  </div>
                </>
              ) : (
                <>
                  <Avatar avatar={img} href="/" />
                  <div
                    className={classNames(
                      module.listItem_title,
                      "md:pl-0 md:hidden"
                    )}
                  >
                    <span>{title}</span>
                  </div>
                </>
              )
            ) : (
              <div className={classNames(module.listItem_title)}>
                <span>{title}</span>
              </div>
            )}
            {more ? (
              <div className={classNames(module.listItem_more)}>
                <MoreVert />
              </div>
            ) : null}
          </div>
        </Link>
      )}
    </>
  );
};

export { ListItem };
