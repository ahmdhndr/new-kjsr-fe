import { Metadata } from "next";
import Image from "next/image";
import { redirect } from "next/navigation";

import { getServerSession } from "next-auth";

import { authOptions } from "@/lib/auth";

import { LoginForm } from "../_components/login-form";

export const metadata: Metadata = {
  title: "Login to KJSR",
};

export default async function LoginPage() {
  const session = await getServerSession(authOptions);

  if (session?.user) {
    redirect("/");
  }

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

      <LoginForm />
    </div>
  );
}
