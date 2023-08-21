import Image from "next/image";
import { Noto_Sans } from "next/font/google";
import { loginSchema } from "@/common/validation/login.yup";
import { Input } from "@/components/Atomic/Atom/Input";
import { Form } from "@/components/Atomic/Atom/Form/Index";
import { Button } from "@/components/Atomic/Atom/Button";
import FormButton from "@/components/Atomic/Atom/FormButton";
import TextButton from "@/components/Atomic/Atom/TextButton";

export default function Home() {
  return (
    <main>
      <h1>hi</h1>
      <Form
        onSubmit={(data) => {
          console.log(data);
        }}
        schema={loginSchema}
      >
        <Input label="email" name="email" id="email" placeholder="Email" />
        <Input
          label="password"
          name="password"
          id="password"
          placeholder="Password"
          type="password"
        />
        <FormButton variant="kakao" label="로그인" />
        <TextButton lable="testtest" href={"/login"} />
      </Form>
    </main>
  );
}
