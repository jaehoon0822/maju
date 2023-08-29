import TextButton from "@/components/Atomic/Atoms/TextButton";
import LoginTemplate from "@/components/Atomic/Templates/LoginTemplate";

export default function Index() {
  return (
    <main>
      <LoginTemplate />
      <TextButton href="/home" label="test" />
    </main>
  );
}
