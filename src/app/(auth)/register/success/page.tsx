"use client";

import Image from "next/image";
import Link from "next/link";

import { ArrowRight } from "lucide-react";

import { Button } from "@/components/ui/button";
import { useRedirectCountdown } from "@/hooks/use-redirect-countdown";

export default function SuccessPage() {
  const countdown = useRedirectCountdown(5, "/login");

  return (
    <div className="flex min-h-screen w-full flex-col items-center justify-center space-y-5 text-center">
      <div className="flex w-full justify-center">
        <Image
          src="/illustration/success-verify.svg"
          alt="Success Verify Illustration"
          width={150}
          height={100}
        />
      </div>
      <h1 className="text-primary text-3xl font-semibold">Success</h1>
      <p className="w-full font-light text-balance">
        Congratulations! Your account have been{" "}
        <span>successfully verified.</span>
      </p>

      <p className="font-light text-balance">
        Redirecting you to sign in page in{" "}
        <span className="font-semibold">{countdown}</span> <br /> Click the
        button below to redirect manually
      </p>

      <Button variant={"link"} className="h-full p-0 text-inherit underline">
        <Link href={"/login"}>
          <span className="flex items-center gap-1 font-semibold">
            Go to sign in page <ArrowRight />
          </span>
        </Link>
      </Button>
    </div>
  );
}
