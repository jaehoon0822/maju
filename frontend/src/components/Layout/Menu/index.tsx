import { ListItem } from "@/components/Atomic/Atoms/ListItem";
import SideMenu from "@/components/Atomic/Organisms/SideMenu";
import Home from "@mui/icons-material/Home";
import Create from "@mui/icons-material/Create";
import ManageSearchOutlined from "@mui/icons-material/ManageSearchOutlined";
import React from "react";

const MenuTemplate = () => {
  return (
    <div className="h-screen">
      <SideMenu>
        <ListItem title="홈" icon={<Home />} href="/home" />
        <ListItem
          title="태그 검색"
          icon={<ManageSearchOutlined />}
          href="/tag-search"
        />
        <ListItem title="게시글 쓰기" icon={<Create />} href="/create" />
      </SideMenu>
    </div>
  );
};

export default MenuTemplate;
