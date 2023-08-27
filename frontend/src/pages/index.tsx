import TextButton from "@/components/Atomic/Atoms/TextButton";
import VerifyEmailModal from "@/components/Atomic/Organisms/Modal/VerfiyEmailModal";
import { VerifyCodeModal } from "@/components/Atomic/Organisms/Modal/VerifyCodeModal";
import { useRouter } from "next/router";
import { axiosClient } from "@/common/utils/axiosClient";
import ChangePasswordModal from "@/components/Atomic/Organisms/Modal/ChangePasswordModal";

export default function Home() {
  return (
    <main className="flex justify-center items-center">
      <TextButton label="모달 클릭" href="/?modal=verifyEmail" />
      <VerifyEmailModal />
      <VerifyCodeModal />
      <ChangePasswordModal />
    </main>
  );
}
