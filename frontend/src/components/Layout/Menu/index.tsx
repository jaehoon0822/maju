import ListItem from "@/components/Atomic/Atoms/ListItem";
import SideMenu from "@/components/Atomic/Organisms/SideMenu";
import Home from "@mui/icons-material/Home";
import Create from "@mui/icons-material/Create";
import { useDispatch } from "@/common/store";
import ManageSearchOutlined from "@mui/icons-material/ManageSearchOutlined";
import { setPos } from "@/common/store/slices/posSlice";
import useGetPathname from "@/hooks/custom/useGetPathname";
import { memo, useCallback } from "react";

const MenuTemplate = () => {
  const dispatch = useDispatch();
  const { pathname } = useGetPathname({ queryString: "modal=createPost" });
  const onClickDefaultPos = useCallback(() => {
    dispatch(setPos(0));
  }, [dispatch]);
  const onClickCreatePost = useCallback(() => {
    dispatch(setPos(window.scrollY));
  }, [dispatch]);

  return (
    <div className="h-screen">
      <SideMenu>
        <ListItem
          title="홈"
          icon={<Home />}
          href="/home"
          onClick={onClickDefaultPos}
        />
        <ListItem
          title="태그 검색"
          icon={<ManageSearchOutlined />}
          href="/search"
          onClick={onClickDefaultPos}
        />
        <ListItem
          title="게시글 쓰기"
          icon={<Create />}
          href={pathname}
          onClick={onClickCreatePost}
        />
      </SideMenu>
    </div>
  );
};

export default memo(MenuTemplate);
