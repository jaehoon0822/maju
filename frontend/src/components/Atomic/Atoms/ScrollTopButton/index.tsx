import classNames from "classnames";
import ArrowUpwardIcon from "@mui/icons-material/ArrowUpward";
import { useDispatch, useSelector } from "@/common/store";
import { setPos } from "@/common/store/slices/posSlice";
import { memo, useCallback } from "react";
import { useRouter } from "next/router";
import { setCommentModalPos } from "@/common/store/slices/commentModalPosSlice";

const ScrollTopButton = () => {
  const dispatch = useDispatch();
  const { query } = useRouter();
  const { commentModalRef } = useSelector((state) => state.commentModalpos);

  const onClick = useCallback(() => {
    if (query.modal === "comments") {
      commentModalRef?.scrollTo({ top: 0 });
      dispatch(setCommentModalPos(0));
    } else {
      dispatch(setPos(0));
      window.scrollTo({ top: 0, behavior: "smooth" });
    }
  }, [query.modal]);

  return (
    // <div
    //   className={classNames(
    //     "fixed  justify-center items-center flex right-1/2 translate-x-1/2 bottom-8 w-[1024px] md:w-full md:right-0 md:-translate-x-10 sm:w-full sm:bottom-24 z-0"
    //   )}
    // >
    <div
      className={classNames(
        "fixed justify-center self-end flex bottom-10 sm:bottom-28 place-items-end z-50"
      )}
    >
      <button
        className={classNames(
          "flex justify-center items-center rounded-full w-10 h-10 p-2 bg-black/30 transition-all duration-500 ml-auto hover:bg-black"
        )}
        onClick={onClick}
      >
        <ArrowUpwardIcon className={classNames("text-white")} />
      </button>
    </div>
  );
};

export default memo(ScrollTopButton);
