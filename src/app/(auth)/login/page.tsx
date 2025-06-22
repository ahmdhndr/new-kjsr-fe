import { Metadata } from "next";
import Image from "next/image";
import Link from "next/link";
import { redirect } from "next/navigation";

import { getServerSession } from "next-auth";

import { Button } from "@/components/ui/button";
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

      <p className="text-muted-foreground mt-4 text-left">
        Belum memiliki akun?&nbsp;
        <Button variant={"link"} className="p-0">
          <Link
            href={"/register"}
            className="text-primary flex justify-center gap-1"
          >
            Daftar
          </Link>
        </Button>
      </p>
    </div>
  );
}
