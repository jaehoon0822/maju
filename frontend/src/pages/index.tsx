import Image from "next/image";
import { Noto_Sans } from "next/font/google";
import { loginSchema } from "@/common/validation/login.yup";
import { Input } from "@/components/Atomic/Atom/Input";
import { Form } from "@/components/Atomic/Atom/Form/Index";
import FormButton from "@/components/Atomic/Atom/FormButton";
import TextButton from "@/components/Atomic/Atoms/TextButton";
import LoginTemplate from "@/components/Atomic/Templates/LoginTemplate";
import Head from "next/head";

export default function Index() {
  return (
    <main>
      <LoginTemplate />
      <TextButton href="/home" label="test" />
    </main>
  );
}
