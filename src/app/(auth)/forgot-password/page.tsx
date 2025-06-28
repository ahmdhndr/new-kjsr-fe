import { Metadata } from "next";
import Image from "next/image";

import ForgotPasswordForm from "../_components/forgot-password-form";

export const metadata: Metadata = {
  title: "Setel Ulang Kata Sandi",
};

export default function ForgotPasswordPage() {
  return (
    <div className="flex flex-col items-center p-4">
      <div className="py-8">
        <Image
          src={"/logo-bg-transparan.png"}
          alt="Logo KJSR"
          width={100}
          height={100}
        />
      </div>

      <ForgotPasswordForm />
    </div>
  );
}
