"use client";

import Link from "next/link";

import { Loader2 } from "lucide-react";

import { Button } from "@/components/ui/button";
import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import {
  Form,
  FormControl,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from "@/components/ui/form";
import { Input } from "@/components/ui/input";

import useForgotPassword from "../_hooks/use-forgot-password";

export default function ForgotPasswordForm() {
  const { form, isPendingForgotPassword, onSubmitForgotPassword } =
    useForgotPassword();

  return (
    <Card className="border-primary w-full max-w-sm shadow-xl">
      <CardHeader>
        <CardTitle className="text-primary text-2xl">Lupa Password?</CardTitle>
        <CardDescription>
          Kami dapat membantu dengan mengirimkan tautan untuk mengatur ulang
          kata sandi
        </CardDescription>
      </CardHeader>
      <CardContent>
        <Form {...form}>
          <form
            onSubmit={form.handleSubmit(onSubmitForgotPassword)}
            className="space-y-5"
          >
            <FormField
              control={form.control}
              name="identifier"
              render={({ field }) => (
                <FormItem>
                  <FormLabel className="text-primary">
                    Username atau Email
                  </FormLabel>
                  <FormControl>
                    <Input autoFocus type="text" {...field} />
                  </FormControl>
                  <FormMessage />
                </FormItem>
              )}
            />
            <Button
              type="submit"
              variant={"default"}
              className="w-full cursor-pointer"
              disabled={isPendingForgotPassword}
            >
              {isPendingForgotPassword ? (
                <Loader2 className="animate-spin" />
              ) : (
                "Kirim Reset Password"
              )}
            </Button>
          </form>
        </Form>
      </CardContent>
      <Button variant={"link"} className="text-md p-0 text-center">
        <Link href={"/login"}>Kembali ke login</Link>
      </Button>
    </Card>
  );
}
