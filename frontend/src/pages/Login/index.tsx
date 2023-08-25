import React from "react";
import SideMenu from "@/components/Atomic/Organisms/SideMenu";
import { ListItem } from "@/components/Atomic/Atoms/ListItem";
import AbcSvg from "@mui/icons-material/Abc";

const Login = () => {
  return (
    <div className="flex justify-center items-center items-centerh flex-col h-screen">
      <SideMenu>
        <ListItem icon={<AbcSvg />} title="홈" href="/" />
        <ListItem icon={<AbcSvg />} title="로그인" href="/Login" active />
      </SideMenu>
    </div>
  );
};

export default Login;
