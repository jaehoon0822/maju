import Image from "next/image";
import { Noto_Sans } from "next/font/google";
import { loginSchema } from "@/common/validation/login.yup";
import { Input } from "@/components/Atomic/Atom/Input";
import { Form } from "@/components/Atomic/Atom/Form/Index";
import { ListItem } from "@/components/Atomic/Atom/ListItem";
import { CloseButton } from "@/components/Atomic/Atom/CloseButton";
import HomeSvg from "@mui/icons-material/Home";
import AbcSvg from "@mui/icons-material/Abc";
import AcUnitSvg from "@mui/icons-material/AcUnitOutlined";

export default function Home() {
  return (
    <main className="flex justify-center items-center h-screen">
      {/* <h1>hi</h1>
      <CloseButton /> */}
      <div>
        <ListItem img={<HomeSvg />} title="home" href="/" active={true} />
        <ListItem img={<AbcSvg />} title="abc" href="/" />
        <ListItem img={<AcUnitSvg />} title="ac" href="/" more />
      </div>
      {/* <Form
        onSubmit={(data: { [x: string]: string }) => {
          console.log(data);
        }}
        schema={loginSchema}
      >
        <Input label="email" id="email" name="email" placeholder="email" />
      </Form> */}
    </main>
  );
}
