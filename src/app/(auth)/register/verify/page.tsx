"use client";

import Image from "next/image";
import { useSearchParams } from "next/navigation";

import { Button } from "@/components/ui/button";
import {
  Form,
  FormControl,
  FormField,
  FormItem,
  FormMessage,
} from "@/components/ui/form";
import {
  InputOTP,
  InputOTPGroup,
  InputOTPSlot,
} from "@/components/ui/input-otp";
import { maskEmail } from "@/lib/mask-email";

import useVerifyUser from "../../_hooks/use-verify-user";

export default function VerifyPage() {
  const searchParams = useSearchParams();
  const decodedEmail = atob(searchParams.get("e") || "");
  const { form, onSubmit, isPendingVerifyUser } = useVerifyUser(decodedEmail);

  return (
    <div className="flex min-h-screen w-full flex-col items-center justify-center space-y-5 text-center">
      <div className="flex w-full justify-center">
        <Image
          src="/illustration/verify-email.svg"
          alt="Verify Email Illustration"
          width={170}
          height={100}
        />
      </div>
      <h1 className="text-primary text-3xl font-semibold">Check your email</h1>
      <p className="font-light">
        Enter the verification code we sent to <br />{" "}
        <span className="font-semibold">{maskEmail(decodedEmail)}</span>
      </p>

      <Form {...form}>
        <form onSubmit={form.handleSubmit(onSubmit)} id="form-verify-user">
          <FormField
            control={form.control}
            name="otp"
            render={({ field }) => (
              <FormItem>
                <FormControl>
                  <InputOTP
                    maxLength={6}
                    value={field.value}
                    onChange={(val) => {
                      field.onChange(val);
                      if (val.length === 6) form.handleSubmit(onSubmit)();
                    }}
                  >
                    <InputOTPGroup className="gap-2">
                      {Array.from({ length: 6 }).map((_, i) => (
                        <InputOTPSlot
                          key={i}
                          index={i}
                          autoFocus={i === 0}
                          className="h-12 w-12 rounded-lg border text-center text-xl shadow-md"
                        />
                      ))}
                    </InputOTPGroup>
                  </InputOTP>
                </FormControl>
                <FormMessage />
              </FormItem>
            )}
          />
        </form>
      </Form>

      <p className="font-light">
        Didn&apos;t receive the code?{" "}
        <Button
          variant={"link"}
          className="h-full cursor-pointer p-0 text-inherit underline"
        >
          <span className="font-semibold">Resend</span>
        </Button>
      </p>
      <Button
        type="submit"
        form="form-verify-user"
        disabled={isPendingVerifyUser}
        className="cursor-pointer"
      >
        {isPendingVerifyUser ? "Verifying..." : "Verify email"}
      </Button>
    </div>
  );
}
