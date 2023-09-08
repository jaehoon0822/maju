import classNames from "classnames";
import PersonIcon from "@mui/icons-material/Person";
import { Avatar } from "../../Atoms/Avator";
import { Post } from "@/common/types/index.types";

const PostAvator = ({ post }: { post: Post }) => {
  return (
    <div
      className={classNames(
        "w-[10%] relative transition-opacity sm:opacity-0 pt-1 sm:w-0 h-full br-4"
      )}
    >
      {post.user.img ? (
        <Avatar avatar={`http://localhost:8080/${post.user.img}`} />
      ) : (
        <div className={classNames("p-2 w-fit rounded-full bg-[#d2d2d2] mr-4")}>
          <PersonIcon />
        </div>
      )}
    </div>
  );
};

export default PostAvator;
