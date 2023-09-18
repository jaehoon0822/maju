import classNames from "classnames";
import module from "./ListItem.module.css";
import { ListItemProps } from "./ListItem.type";
import Link from "next/link";
import MoreVert from "@mui/icons-material/MoreVert";
import Avatar from "../Avator";
import { memo } from "react";

const ListItem = ({
  href,
  icon,
  user,
  title,
  onClick,
  active = false,
  more = false,
}: ListItemProps) => {
  return (
    <>
      {href === undefined ? (
        <div aria-label="list-item" className="flex justify-center">
          <div
            className={classNames(
              module.listItem_wrapper,
              active && module.active
            )}
          >
            {icon ? <div>{icon}</div> : null}
            {user ? <Avatar user={user} disableLink={true} /> : null}
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
        <Link
          href={href}
          onClick={onClick}
          aria-label="list-item"
          className="flex justify-ccenter"
        >
          <div
            className={classNames(
              module.listItem_wrapper,
              active && module.active
            )}
          >
            {icon || user ? (
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
                  <Avatar />
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

export default memo(ListItem);
