import { Metadata } from "next";
import Image from "next/image";

import { RegisterForm } from "../_components/register-form";

export const metadata: Metadata = {
  title: "Sign up to KJSR",
};

export default function RegisterPage() {
  return (
    <div className="h-full w-full overflow-hidden">
      <div className="flex w-full flex-col lg:flex-row">
        <section className="bg-primary relative h-full w-full flex-1 p-10 lg:min-h-screen">
          <div className="relative z-10 flex flex-col items-center">
            <div className="text-white-kjsr text-wrap">
              <h1 className="mb-4 text-xl font-semibold lg:text-5xl">
                Buat akun gratis
              </h1>
              <p className="font-light tracking-wide">
                Jadilah bagian dari Gerakan Remaja Sehat!
              </p>
            </div>
          </div>
          <div className="pointer-events-none absolute inset-0 z-0 hidden lg:block">
            <Image
              fill
              sizes="(max-width: 768px) 100vw"
              priority
              src={"/sky-kjsr-illustration.jpg"}
              alt="KJSR Illustration"
              className="object-cover object-bottom"
            />
          </div>
        </section>
        <section className="flex-1 p-10">
          <RegisterForm />
        </section>
      </div>
    </div>
  );
}
