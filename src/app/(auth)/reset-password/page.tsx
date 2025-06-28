import { Metadata } from "next";
import Image from "next/image";

import ResetPasswordForm from "../_components/reset-password-form";

export const metadata: Metadata = {
  title: "Setel Ulang Kata Sandi",
};

type Params = Promise<{ token: string }>;

export default async function ResetPasswordPage({
  searchParams,
}: {
  searchParams: Params;
}) {
  const { token } = await searchParams;

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

      <ResetPasswordForm token={token} />
    </div>
  );
}
