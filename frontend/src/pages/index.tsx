import Image from "next/image";
import { Noto_Sans } from "next/font/google";
import { loginSchema } from "@/common/validation/login.yup";
import CloseButton from "@/components/Atomic/Atom/CloseButton";
import { Input } from "@/components/Atomic/Atom/Input";
import { Form } from "@/components/Atomic/Atom/Form/Index";

export default function Home() {
  return (
    <main className="flex justify-center items-center h-screen">
      <h1>hi</h1>
      <CloseButton />
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
