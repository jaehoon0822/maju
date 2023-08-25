import Image from "next/image";
import { Noto_Sans } from "next/font/google";
import Head from "next/head";
import { useForm } from "react-hook-form";
import { ListItem } from "@/components/Atomic/Atom/ListItem";
import HomeSvg from "@mui/icons-material/Home";
import MangeSearuchSvg from "@mui/icons-material/ManageSearchOutlined";
import SideManu from "@/components/Atomic/Orgamisms/SideMenu";

export default function Home() {
  const method = useForm();
  const onSubmit = async (data: { search: string }) => {
    console.log(data.search);
  };
  return (
    <main className="flex justify-center items-center items-centerh flex-col h-screen">
      <SideManu>
        <ListItem icon={<HomeSvg />} title="홈" href="/" active />
        <ListItem icon={<MangeSearuchSvg />} title="로그인" href="/Login" />
      </SideManu>
    </main>
  );
}
