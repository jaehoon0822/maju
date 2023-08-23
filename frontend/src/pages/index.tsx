import Image from "next/image";
import { Noto_Sans } from "next/font/google";
import { loginSchema } from "@/common/validation/login.yup";
import { Input } from "@/components/Atomic/Atom/Input";
import { Form } from "@/components/Atomic/Atom/Form/Index";
import { ListItem } from "@/components/Atomic/Atom/ListItem";
import HomeSvg from "@mui/icons-material/Home";
import AbcSvg from "@mui/icons-material/Abc";
import AcUnitSvg from "@mui/icons-material/AcUnitOutlined";
import { TooltipListItem } from "@/components/Atomic/Atom/TooltipListItem";
import Star from "@mui/icons-material/Star";
import Abc from "@mui/icons-material/Abc";

export default function Home() {
  return (
    <main className="flex justify-center items-center items-centerh flex-col h-screen">
      {/* <h1>hi</h1>
      <CloseButton /> */}
      <ListItem icon={<HomeSvg />} title="home" href="/" active={true} />

      <TooltipListItem title="ac" icon={<HomeSvg />} direction="left">
        {/* item 클릭시 보여줄 component */}
        <div>
          <ListItem icon={<AcUnitSvg />} title="ac" href="/" />
          <ListItem icon={<AcUnitSvg />} title="ac" href="/" />
          <ListItem icon={<AcUnitSvg />} title="ac" href="/" />
        </div>
      </TooltipListItem>

      <ListItem icon={<AbcSvg />} title="abc" href="/" />

      <TooltipListItem direction="left" icon={<Star />} title="test">
        <ListItem title="test1" icon={<Abc />} />
      </TooltipListItem>
    </main>
  );
}
